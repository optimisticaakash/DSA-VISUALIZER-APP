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
    compare: "#ef4444",
    pivot: "#f59e0b",
    active: "#8b5cf6",
    sorted: "#22c55e"
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
        sortBtn.textContent = "Start Quick Sort";
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

    setStatus("New array generated. Ready to start Quick Sort.");
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


async function partition(arr, low, high) {
    let bars = document.getElementsByClassName("bar");
    let pivot = arr[high]; 
    bars[high].style.backgroundColor = COLORS.pivot; 
    setStatus(`Pivot selected: ${pivot}.`);
    window.visualizerAudio?.playPlacedTone(pivot);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = COLORS.compare; 
        setStatus(`Comparing ${arr[j]} with pivot ${pivot}.`);
        window.visualizerAudio?.playCompareTone(arr[j]);
        await sleepWithPause(getDelay());
        
        if (arr[j] < pivot) {
            i++;
            
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            
            
            let tempHeight = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = tempHeight;
            
            let tempText = bars[i].innerText;
            bars[i].innerText = bars[j].innerText;
            bars[j].innerText = tempText;
            
            bars[i].style.backgroundColor = COLORS.active; 
            window.visualizerAudio?.playPairTone(arr[i]);
            if(i !== j) {
                bars[j].style.backgroundColor = COLORS.default; 
            }
        } else {
            bars[j].style.backgroundColor = COLORS.default; 
        }
    }
    
    
    i++;
    let temp = arr[i];
    arr[i] = arr[high];
    arr[high] = temp;
    
    let tempHeight = bars[i].style.height;
    bars[i].style.height = bars[high].style.height;
    bars[high].style.height = tempHeight;
    
    let tempText = bars[i].innerText;
    bars[i].innerText = bars[high].innerText;
    bars[high].innerText = tempText;
    
    
    bars[high].style.backgroundColor = COLORS.default; 
    bars[i].style.backgroundColor = COLORS.sorted; 
    window.visualizerAudio?.playPlacedTone(arr[i]);
    
    
    for(let k = low; k < i; k++){
        bars[k].style.backgroundColor = COLORS.default;
    }
    
    await sleepWithPause(getDelay());
    return i;
}


async function quickSortHelper(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        
        
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
    } else if (low >= 0 && high >= 0 && low === high) {
        let bars = document.getElementsByClassName("bar");
        bars[low].style.backgroundColor = COLORS.sorted;
    }
}


async function startQuickSort() {
    setControlsDisabled(true);
    setStatus("Quick Sort started.");
    
    await quickSortHelper(array, 0, array.length - 1);
    
    setStatus("Quick Sort complete.");
    window.visualizerAudio?.playCompleteTone();
    setControlsDisabled(false);
}


generateArray();

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", () => {
    if (!isSorting) {
        sortBtn.textContent = "Pause";
        startQuickSort();
        return;
    }

    isPaused = !isPaused;
    sortBtn.textContent = isPaused ? "Resume" : "Pause";
    setStatus(isPaused ? "Sorting paused." : "Sorting resumed.");
});
