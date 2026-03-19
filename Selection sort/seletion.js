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
    scan: "#f59e0b",
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
        sortBtn.textContent = "Start Selection Sort";
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

    setStatus("New array generated. Ready to start Selection Sort.");
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


async function selectionSort() {
    let bars = document.getElementsByClassName("bar");
    let n = array.length;

    
    setControlsDisabled(true);
    setStatus("Selection Sort started.");

    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        bars[min_idx].style.backgroundColor = COLORS.compare; 
        setStatus(`Scanning for minimum from index ${i}.`);

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = COLORS.scan; 
            setStatus(`Comparing current min ${array[min_idx]} with ${array[j]}.`);
            window.visualizerAudio?.playCompareTone(array[j]);
            await sleepWithPause(getDelay()); 

            if (array[j] < array[min_idx]) {
                
                if (min_idx !== i) {
                    bars[min_idx].style.backgroundColor = COLORS.default; 
                }
                min_idx = j;
                bars[min_idx].style.backgroundColor = COLORS.compare; 
                setStatus(`New minimum found: ${array[min_idx]}.`);
                window.visualizerAudio?.playPairTone(array[min_idx]);
            } else {
                
                bars[j].style.backgroundColor = COLORS.default;
            }
        }

        
        let temp = array[i];
        array[i] = array[min_idx];
        array[min_idx] = temp;

        
        let tempHeight = bars[i].style.height;
        bars[i].style.height = bars[min_idx].style.height;
        bars[min_idx].style.height = tempHeight;

        let tempText = bars[i].innerText;
        bars[i].innerText = bars[min_idx].innerText;
        bars[min_idx].innerText = tempText;

        
        if (min_idx !== i) {
            bars[min_idx].style.backgroundColor = COLORS.default;
        }
        bars[i].style.backgroundColor = COLORS.sorted; 
        setStatus(`Placed ${array[i]} at sorted position ${i + 1}.`);
        window.visualizerAudio?.playPlacedTone(array[i]);
        await sleepWithPause(getDelay());
    }
    
    bars[n - 1].style.backgroundColor = COLORS.sorted;
    setStatus("Selection Sort complete.");
    window.visualizerAudio?.playCompleteTone();

    
    setControlsDisabled(false);
}


generateArray();


generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", () => {
    if (!isSorting) {
        sortBtn.textContent = "Pause";
        selectionSort();
        return;
    }

    isPaused = !isPaused;
    sortBtn.textContent = isPaused ? "Resume" : "Pause";
    setStatus(isPaused ? "Sorting paused." : "Sorting resumed.");
});
