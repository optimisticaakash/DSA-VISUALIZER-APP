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
    target: "#f59e0b",
    active: "#8b5cf6",
    sorted: "#22c55e"
};

function getDelay() {
    return Math.max(25, 430 - Number(speedSlider.value) * 4);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

function setControlsDisabled(disabled) {
    isSorting = disabled;
    generateBtn.disabled = disabled;
    sizeSlider.disabled = disabled;
    speedSlider.disabled = disabled;

    if (!disabled) {
        isPaused = false;
        sortBtn.textContent = "Start Cyclic Sort";
    }
}

function barHeight(value) {
    return `${Math.round((value / array.length) * 280) + 40}px`;
}

function labelFor(value) {
    return array.length <= 25 ? value : "";
}

function renderBars() {
    container.innerHTML = "";
    const dynamicWidth = Math.max(10, Math.floor(600 / array.length));

    for (const value of array) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = barHeight(value);
        bar.style.width = `${dynamicWidth}px`;
        bar.style.backgroundColor = COLORS.default;
        bar.innerText = labelFor(value);
        container.appendChild(bar);
    }
}

function shuffle(values) {
    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }
}

function generateArray() {
    const currentSize = Number(sizeSlider.value);
    array = Array.from({ length: currentSize }, (_, index) => index + 1);
    shuffle(array);
    renderBars();
    setStatus("New shuffled array generated. Ready to start Cyclic Sort.");
}

function colorBar(index, color) {
    const bars = document.getElementsByClassName("bar");
    if (bars[index]) {
        bars[index].style.backgroundColor = color;
    }
}

function updateBar(index) {
    const bars = document.getElementsByClassName("bar");
    if (!bars[index]) {
        return;
    }

    bars[index].style.height = barHeight(array[index]);
    bars[index].innerText = labelFor(array[index]);
}

async function swapBars(firstIndex, secondIndex) {
    [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
    updateBar(firstIndex);
    updateBar(secondIndex);
    window.visualizerAudio?.playPairTone(array[firstIndex]);
    await sleepWithPause(getDelay());
}

async function startCyclicSort() {
    setControlsDisabled(true);
    setStatus("Cyclic Sort started.");

    let i = 0;

    while (i < array.length) {
        await waitWhilePaused();

        const correctIndex = array[i] - 1;

        colorBar(i, COLORS.compare);
        colorBar(correctIndex, COLORS.target);
        setStatus(`Checking whether ${array[i]} belongs at index ${correctIndex}.`);
        window.visualizerAudio?.playCompareTone(array[i]);
        await sleepWithPause(getDelay());

        if (array[i] !== array[correctIndex]) {
            setStatus(`Swapping ${array[i]} into its correct position.`);
            colorBar(i, COLORS.active);
            colorBar(correctIndex, COLORS.active);
            await swapBars(i, correctIndex);
        } else {
            colorBar(i, COLORS.sorted);
            if (correctIndex !== i) {
                colorBar(correctIndex, COLORS.default);
            }
            i++;
        }

        for (let index = 0; index < array.length; index++) {
            if (array[index] === index + 1) {
                colorBar(index, COLORS.sorted);
            } else {
                colorBar(index, COLORS.default);
            }
        }
    }

    setStatus("Cyclic Sort complete.");
    window.visualizerAudio?.playCompleteTone();
    setControlsDisabled(false);
}

sizeSlider.addEventListener("input", () => {
    sizeValue.innerText = sizeSlider.value;
    generateArray();
});

speedSlider.addEventListener("input", () => {
    speedValue.innerText = speedSlider.value;
    setStatus(`Speed updated to ${speedSlider.value}.`);
});

generateArray();

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", () => {
    if (!isSorting) {
        sortBtn.textContent = "Pause";
        startCyclicSort();
        return;
    }

    isPaused = !isPaused;
    sortBtn.textContent = isPaused ? "Resume" : "Pause";
    setStatus(isPaused ? "Sorting paused." : "Sorting resumed.");
});
