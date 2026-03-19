const stackContainer = document.getElementById("stack-container");
const pushBtn = document.getElementById("push-btn");
const popBtn = document.getElementById("pop-btn");
const stackInput = document.getElementById("stack-input");
const capacityFill = document.getElementById("capacity-fill");
const capacityText = document.getElementById("capacity-text");

let stackArray = [];
const MAX_SIZE = 8; 

function updateCapacity() {
    const usedPercent = (stackArray.length / MAX_SIZE) * 100;
    capacityFill.style.width = `${usedPercent}%`;
    capacityText.textContent = `${stackArray.length} / ${MAX_SIZE}`;
}

function playStackTone(value, type = "sine") {
    const numericValue = Number(value) || 10;
    window.visualizerAudio?.playTone({
        frequency: 220 + numericValue * 12,
        duration: 0.08,
        type,
        volume: 0.028
    });
}

function pushElement() {
    const value = stackInput.value;

    if (value === "") {
        alert("Bhai, pehle koi number toh daalo!");
        return;
    }

    if (stackArray.length >= MAX_SIZE) {
        alert("Stack Overflow! Dibba bhar chuka hai.");
        return;
    }

    
    stackArray.push(value);
    stackInput.value = ""; 

    
    const item = document.createElement("div");
    item.classList.add("stack-item");
    item.innerText = value;
    
    
    stackContainer.appendChild(item);
    playStackTone(value, "triangle");
    updateCapacity();
}


function popElement() {
    if (stackArray.length === 0) {
        alert("Stack Underflow! Dibba pehle se hi khali hai.");
        return;
    }

    
    stackArray.pop();

    
    const topItem = stackContainer.lastElementChild;

    topItem.classList.add("is-popping");
    playStackTone(topItem.innerText, "square");

    
    setTimeout(() => {
        stackContainer.removeChild(topItem);
        updateCapacity();
    }, 300);
}


pushBtn.addEventListener("click", pushElement);
popBtn.addEventListener("click", popElement);


stackInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        pushElement();
    }
});

updateCapacity();
