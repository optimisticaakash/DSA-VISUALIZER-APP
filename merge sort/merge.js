const container = document.getElementById("array-container");
const sortBtn = document.getElementById("sort-btn");
const generateBtn = document.getElementById("generate-btn");

const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
const statusText = document.getElementById("status-text");

let array = [];
let isSorting = false;
let isPaused = false;
const COLORS = {
    default: "#2563eb",
    left: "#f59e0b",
    right: "#ef4444",
    merged: "#22c55e"
};

function getDelay() {
    return Math.max(25, 430 - Number(speedSlider.value) * 4);
}

async function waitWhilePaused() {
    while (isPaused) {
        await sleep(80);
    }
}

async function sleepWithPause(ms) {
    const step = 25;
    let elapsed = 0;
    while (elapsed < ms) {
        await waitWhilePaused();
        await sleep(step);
        elapsed += step;
    }
}

function setStatus(message) {
    statusText.textContent = message;
}

function playNote(value, type = "sine", duration = 0.05, volume = 0.02) {
    window.visualizerAudio?.playTone({
        frequency: 180 + value * 4,
        duration,
        type,
        volume
    });
}

function setControlsDisabled(disabled) {
    isSorting = disabled;
    generateBtn.disabled = disabled;
    sizeSlider.disabled = disabled;
    speedSlider.disabled = disabled;
    if (!disabled) {
        isPaused = false;
        sortBtn.textContent = "Start Merge Sort";
    }
}

function generateArray() {
    container.innerHTML = "";
    array = [];

    let currentSize = parseInt(sizeSlider.value);
    let dynamicWidth = Math.floor(600/currentSize);

    for (let i = 0; i < currentSize; i++) {
        const value = Math.floor(Math.random() * 80) + 20;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; 
        bar.style.width = `${dynamicWidth}px`;
        bar.style.backgroundColor = COLORS.default;
        bar.innerText = currentSize<=25 ? value : "";
        container.appendChild(bar);
    }

    setStatus("New array generated. Ready to start Merge Sort.");
}

sizeSlider.addEventListener("input",function()
{
    sizeValue.innerText = sizeSlider.value;
    generateArray();
})

speedSlider.addEventListener("input", () => {
    speedValue.innerText = speedSlider.value;
    setStatus(`Speed updated to ${speedSlider.value}.`);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function merge(arr, l, m, r) {
    let bars = document.getElementsByClassName("bar");
    let n1 = m - l + 1;
    let n2 = r - m;

    let left = new Array(n1);
    let right = new Array(n2);

    
    for (let i = 0; i < n1; i++) {
        left[i] = arr[l + i];
        bars[l + i].style.backgroundColor = COLORS.left; 
    }
    for (let j = 0; j < n2; j++) {
        right[j] = arr[m + 1 + j];
        bars[m + 1 + j].style.backgroundColor = COLORS.right; 
    }
    setStatus(`Merging ranges ${l}-${m} and ${m + 1}-${r}.`);
    await sleepWithPause(getDelay());

    let i = 0, j = 0, k = l;

    
    while (i < n1 && j < n2) {
        await sleepWithPause(getDelay());

        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        
        
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].innerText = arr[k];
        bars[k].style.backgroundColor = COLORS.merged; 
        window.visualizerAudio?.playPairTone(arr[k]);
        k++;
    }

    
    while (i < n1) {
        await sleepWithPause(getDelay());
        arr[k] = left[i];
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].innerText = arr[k];
        bars[k].style.backgroundColor = COLORS.merged;
        window.visualizerAudio?.playPairTone(arr[k]);
        i++;
        k++;
    }

    
    while (j < n2) {
        await sleepWithPause(getDelay());
        arr[k] = right[j];
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].innerText = arr[k];
        bars[k].style.backgroundColor = COLORS.merged;
        window.visualizerAudio?.playPairTone(arr[k]);
        j++;
        k++;
    }
}


async function mergeSortHelper(arr, l, r) {
    if (l >= r) {
        return;
    }
    let m = l + Math.floor((r - l) / 2);
    
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function startMergeSort() {
    setControlsDisabled(true);
    setStatus("Merge Sort started.");
    
    await mergeSortHelper(array, 0, array.length - 1);
    
    setStatus("Merge Sort complete.");
    window.visualizerAudio?.playCompleteTone();
    setControlsDisabled(false);
}


generateArray();

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", () => {
    if (!isSorting) {
        sortBtn.textContent = "Pause";
        startMergeSort();
        return;
    }

    isPaused = !isPaused;
    sortBtn.textContent = isPaused ? "Resume" : "Pause";
    setStatus(isPaused ? "Sorting paused." : "Sorting resumed.");
});
