# 🚀 DSA Visualizer App

An interactive web application to **visualize Data Structures and Algorithms** using animations, color transitions, and audio feedback.

Built using **pure HTML, CSS, and JavaScript**, this project runs directly in the browser without any frameworks or build tools.

---

## 🌟 Features

* 📊 Visualize sorting algorithms with animated bars
* 🎚️ Control array size and animation speed
* ⏯️ Pause & Resume functionality
* 🌙 Dark / Light mode with persistence
* 🔊 Audio feedback for better interaction
* 🧠 Beginner-friendly UI with real-time status updates

---

## 🧭 Overview

This is a **multi-page DSA visualizer platform** where users can explore algorithms and data structures interactively.

The homepage acts as a **dashboard**, allowing users to navigate to different visualizers.

---

## 🏠 Home Page

* Sticky navigation bar
* Theme toggle button
* Cards for algorithms and data structures
* About section explaining project purpose

---

## 📊 Implemented Visualizers

### 🔁 Sorting Algorithms

#### 🟡 Bubble Sort

* Adjustable size (5–50) & speed (1–100)
* Real-time comparisons & swaps
* Pause/Resume support
* Complexity: `O(n²)` time, `O(1)` space

---

#### 🔵 Selection Sort

* Highlights minimum element
* Step-by-step placement
* Live status updates
* Complexity: `O(n²)` time, `O(1)` space

---

#### 🟢 Insertion Sort

* Key element highlighting
* Shifting animation
* Progressive sorted portion
* Complexity: `O(n²)` time, `O(1)` space

---

#### 🟣 Merge Sort

* Divide & conquer visualization
* Left/right/merge color states
* Recursive animation
* Complexity: `O(n log n)` time, `O(n)` space

---

#### 🔴 Quick Sort

* Pivot-based partitioning
* Dynamic highlighting (pivot, swaps)
* Real-time updates
* Complexity: `O(n log n)` average

---

### 🧱 Data Structures

#### 📚 Stack (LIFO)

* Push / Pop operations
* Capacity limit (8 elements)
* Animated removal
* Overflow & Underflow handling

---

#### 🚶 Queue (FIFO)

* Enqueue / Dequeue operations
* Entry & exit animations
* Capacity limit (8 elements)
* Input validation

---

## 🔁 Shared Features

### 🌗 Theme Toggle

* Dark & Light mode
* Stored in `localStorage`
* Synced across all pages

---

### 🔊 Audio Feedback

Using **AudioContext API**:

* Compare sound
* Swap sound
* Placement tone
* Completion sound

---

### 📢 Status & Learning Support

* Real-time execution status
* Complexity display cards
* Color-coded states
* Interactive controls

---

## 🛠️ Tech Stack

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* AudioContext API
* localStorage

---

## 📂 Project Structure

```bash
DSA-Visualizer-App/
├── index.html
├── style.css
├── global-theme.css
├── theme.js
├── audio.js
├── assets/
├── Bubble sort/
├── Selection sort/
├── insertion sort/
├── merge sort/
├── Quick sort/
├── Stack/
├── Queue/
└── README.md
```

---

## 🚀 How to Run

### 🔹 Option 1: Direct Run

Simply open `index.html` in your browser.

---

### 🔹 Option 2: Live Server (Recommended)

1. Open project in VS Code
2. Open `index.html`
3. Start Live Server

---

## 🎯 User Flow

1. Open homepage
2. Select any visualizer
3. Adjust controls (size/speed)
4. Start visualization
5. Pause/Resume anytime
6. Switch theme anytime

---

## 🎓 Educational Value

✔ Perfect for beginners
✔ Helps in interview preparation
✔ Makes algorithms visually understandable
✔ Great for teaching & demos

---

## 🚧 Future Improvements

* Add Heap Sort, BFS, DFS
* Add step-by-step manual mode
* Add code snippets alongside visualization
* Add custom input arrays
* Improve mobile responsiveness

---

## 👨‍💻 Author

**Aakash Morya**

🔗 GitHub: https://github.com/optimisticaakash

---

⭐ If you like this project, don’t forget to star the repo!
