const queueContainer = document.getElementById("queue-container");
const enqueueBtn = document.getElementById("enqueue-btn");
const dequeueBtn = document.getElementById("dequeue-btn");
const queueInput = document.getElementById("queue-input");

let queueArray = [];
const MAX_SIZE = 8; 

function playQueueTone(value, type = "sine") {
    const numericValue = Number(value) || 10;
    window.visualizerAudio?.playTone({
        frequency: 220 + numericValue * 10,
        duration: 0.08,
        type,
        volume: 0.028
    });
}

function enqueueElement() {
    const value = queueInput.value;

    if (value === "") {
        alert("Bhai, pehle koi number toh daalo!");
        return;
    }

    if (queueArray.length >= MAX_SIZE) {
        alert("Queue Overflow! Line poori tarah bhar chuki hai.");
        return;
    }

    
    queueArray.push(value);
    queueInput.value = ""; 

    
    const item = document.createElement("div");
    item.classList.add("queue-item");
    item.innerText = value;
    
    
    queueContainer.appendChild(item);
    playQueueTone(value, "triangle");

    
    setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
    }, 50);
}


function dequeueElement() {
    if (queueArray.length === 0) {
        alert("Queue Underflow! Line pehle se hi khali hai.");
        return;
    }

   
    queueArray.shift();

    
    const firstItem = queueContainer.firstElementChild;

    
    firstItem.style.opacity = "0";
    firstItem.style.transform = "translateX(-50px)"; 
    playQueueTone(firstItem.innerText, "square");

    
    setTimeout(() => {
        queueContainer.removeChild(firstItem);
    }, 300);
}


enqueueBtn.addEventListener("click", enqueueElement);
dequeueBtn.addEventListener("click", dequeueElement);


queueInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        enqueueElement();
    }
});
