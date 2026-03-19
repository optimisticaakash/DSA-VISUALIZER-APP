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
        sortBtn.textContent = "Start Bubble Sort";
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

    setStatus("New array generated. Ready to start Bubble Sort.");
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

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    let n = array.length;

    setControlsDisabled(true);
    setStatus("Bubble Sort started.");

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            setStatus(`Comparing ${array[j]} and ${array[j + 1]}.`);
            bars[j].style.backgroundColor = COLORS.compare;
            bars[j + 1].style.backgroundColor = COLORS.compare;
            window.visualizerAudio?.playCompareTone(array[j]);
            
            await sleepWithPause(getDelay()); 

            if (array[j] > array[j + 1]) {
                setStatus(`Swapping ${array[j]} and ${array[j + 1]}.`);
                window.visualizerAudio?.playPairTone(Math.max(array[j], array[j + 1]));
                
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                
                let tempHeight = bars[j].style.height;
                bars[j].style.height = bars[j + 1].style.height;
                bars[j + 1].style.height = tempHeight;

                let tempText = bars[j].innerText;
                bars[j].innerText = bars[j + 1].innerText;
                bars[j + 1].innerText = tempText;
            }

            
            bars[j].style.backgroundColor = COLORS.default;
            bars[j + 1].style.backgroundColor = COLORS.default;
        }
        
        await waitWhilePaused();
        bars[n - 1 - i].style.backgroundColor = COLORS.sorted;
        setStatus(`Position ${n - i} is sorted.`);
        window.visualizerAudio?.playPlacedTone(array[n - 1 - i]);
    }
    
    bars[0].style.backgroundColor = COLORS.sorted;
    setStatus("Bubble Sort complete.");
    window.visualizerAudio?.playCompleteTone();

    
    setControlsDisabled(false);
}


generateArray();

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", () => {
    if (!isSorting) {
        sortBtn.textContent = "Pause";
        bubbleSort();
        return;
    }

    isPaused = !isPaused;
    sortBtn.textContent = isPaused ? "Resume" : "Pause";
    setStatus(isPaused ? "Sorting paused." : "Sorting resumed.");
});
