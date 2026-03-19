# DSA Visualizer App

Interactive frontend project for learning Data Structures and Algorithms through animations, color-based state changes, and sound feedback. The website is built with plain `HTML`, `CSS`, and `JavaScript`, so it runs directly in the browser without any framework or build setup.

## Overview

This project is a multi-page DSA visualizer website where users can:

- Explore sorting algorithms visually with animated bars
- Adjust array size and animation speed
- Pause and resume sorting animations
- Learn basic data structure operations through direct interaction
- Switch between dark mode and light mode
- Get audio cues during comparisons, swaps, insertions, and completion

The homepage works like a dashboard and routes users to separate visualizers for each algorithm and data structure.

## Website Sections

### 1. Home Page

The landing page (`index.html`) includes:

- A sticky navbar
- Project branding
- A theme toggle button
- Cards for all available sorting algorithms
- Cards for data structure visualizers
- An About section explaining the purpose of the project

Each card opens a dedicated visualizer page.

## Implemented Visualizers

### Sorting Algorithms

#### Bubble Sort

Features:

- Generates a random array using vertical bars
- Lets the user control array size from `5` to `50`
- Lets the user control animation speed from `1` to `100`
- Starts Bubble Sort animation on button click
- Supports pause and resume during sorting
- Highlights compared bars in red
- Marks sorted bars in green
- Updates a live status message for every major step
- Shows time complexity `O(n²)` and space complexity `O(1)`
- Plays audio feedback during comparisons, swaps, and completion

#### Selection Sort

Features:

- Random array generation with adjustable size
- Adjustable animation speed
- Pause and resume support
- Highlights the current minimum and scanning bars using different colors
- Swaps the minimum value into its correct position after each pass
- Shows live status updates like scanning, comparing, and placing minimum
- Displays complexity details:
  - Time: `O(n²)`
  - Space: `O(1)`
- Uses sound feedback for comparisons, minimum updates, placements, and completion

#### Insertion Sort

Features:

- Random bar-based array generation
- Adjustable array size and speed
- Pause and resume functionality
- Highlights the selected key element
- Animates shifting of larger elements to the right
- Marks the sorted portion progressively
- Live status updates for key selection, shifting, and insertion
- Displays complexity details:
  - Time: `O(n²)`
  - Space: `O(1)`
- Includes sound feedback during comparison, shifting, insertion, and completion

#### Merge Sort

Features:

- Generates a random array visualized as bars
- Adjustable array size and speed
- Pause and resume support
- Uses recursive divide-and-conquer logic
- Highlights left half, right half, and merged bars using different colors
- Animates the merge process step by step
- Displays live merging status using index ranges
- Shows complexity details:
  - Time: `O(n log n)`
  - Space: `O(n)`
- Includes audio feedback during merge placement and completion

#### Quick Sort

Features:

- Random bar generation
- Adjustable array size and speed
- Pause and resume support
- Uses the last element as pivot during partitioning
- Highlights pivot, current comparisons, active partition area, and sorted bars
- Animates swaps and pivot placement
- Shows live status messages for pivot selection and comparisons
- Displays complexity details:
  - Time: `O(n log n)` average
  - Space: `O(log n)`
- Includes sound feedback for pivot selection, comparisons, swaps, placements, and completion

### Data Structures

#### Stack Visualizer

This page demonstrates the `LIFO` (Last In First Out) behavior of a stack.

Features:

- Input box for entering numeric values
- `Push` operation to insert a new item on top
- `Pop` operation to remove the top item
- Capacity limit of `8` elements
- Capacity progress bar showing current usage
- Animated pop effect before removal
- Audio feedback on push and pop
- Input validation for empty values
- Overflow and underflow alerts

#### Queue Visualizer

This page demonstrates the `FIFO` (First In First Out) behavior of a queue.

Features:

- Input box for entering numeric values
- `Enqueue` operation to add an item at the rear
- `Dequeue` operation to remove an item from the front
- Capacity limit of `8` elements
- Entry animation when an item is added
- Exit animation when an item is removed
- Audio feedback on enqueue and dequeue
- Input validation for empty values
- Overflow and underflow alerts

## Shared Project Features

These features are reused across multiple pages:

### Theme Toggle

- Dark mode and light mode are supported
- Selected theme is saved using `localStorage`
- Theme stays synced across pages
- If a page does not already contain a navbar toggle, the shared script can inject it automatically

### Audio Feedback

The project includes a reusable audio system using the browser `AudioContext` API.

It provides:

- Compare tone
- Pair/swap tone
- Placement tone
- Completion tone
- Custom tone generation for stack and queue operations

This makes the visualizers more interactive and engaging.

### Status and Learning Support

The sorting pages include:

- Real-time status text
- Complexity cards
- Responsive controls
- Clear color-based visualization states

## Tech Stack

- `HTML5`
- `CSS3`
- `JavaScript (Vanilla JS)`
- Browser `AudioContext` API
- `localStorage` for theme persistence

## Project Structure

```text
DSA visualizer app/
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

## How To Run

Since this is a static frontend project, you can run it very easily:

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use Live Server

If you are using VS Code, you can run the project with the Live Server extension for a smoother experience.

Recommended steps:

1. Open the project folder in VS Code
2. Open `index.html`
3. Start Live Server
4. Browse the homepage and open any visualizer card

## User Flow

1. Open the homepage
2. Choose any sorting algorithm or data structure card
3. For sorting pages:
   - Generate a random array
   - Adjust size and speed
   - Start visualization
   - Pause or resume if needed
4. For stack or queue pages:
   - Enter a number
   - Perform push/pop or enqueue/dequeue operations
5. Switch theme anytime using the top-right toggle

## Educational Value

This project is useful for:

- DSA beginners
- Students preparing for interviews
- Teachers explaining algorithm behavior visually
- Anyone who learns better through animation and interaction

It turns abstract logic into something users can actually watch, control, and understand.

## Possible Future Improvements

- Add more algorithms like Heap Sort, BFS, DFS, Binary Search, and Linked List
- Add step-by-step manual mode
- Add complexity comparison charts
- Add code snippet panels beside each visualizer
- Add user-defined custom arrays
- Add mobile interaction refinements
- Replace placeholder GitHub links with the actual repository URL

## Notes

- The current navbar `GitHub` links are placeholders and point to `https://github.com/`
- No package manager or build command is required
- The project is fully frontend-based

## Author

Created as a learning-focused DSA visualization project using vanilla web technologies.
