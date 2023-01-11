/*Use JavaScript to handle the drag-and-drop events of the image and then use CSS to create a position: absolute property for the image, and set the display property of the surrounding text to relative.
This way, once you drop the image on top of the text, the text will automatically adjust its flow to accommodate the image, and it will remain in the same relative position even if the text is edited.

Here is an example of how you might achieve this:*/

// const draggableImage = document.getElementById("draggable-image");
// let initialPosition = { x: 0, y: 0 };
// draggableImage.addEventListener("dragstart", event => {
//     initialPosition = { x: event.clientX, y: event.clientY }
// });

// draggableImage.addEventListener("dragend", event => {
//     draggableImage.style.left = (event.clientX - initialPosition.x) + 'px';
//     draggableImage.style.top = (event.clientY - initialPosition.y) + 'px';
// });

const image = document.getElementById("draggable-resizable-image");
const dropdown = document.getElementById("dropdown");
const resizeButton = document.getElementById("resize-button");
const moveButton = document.getElementById("move-button");

//Resizing
let resizing = false;
let aspectRatio;
let initialX;
let initialY;
let initialWidth;
let initialHeight;

//Dragging
let draggable = false;
let offsetX;
let offsetY;
let isSnappedLeft = false;
let isSnappedRight = false;

image.addEventListener("mousedown", event => {
    // Show dropdown menu
    dropdown.classList.remove("hidden");
    dropdown.style.top = event.clientY + "px";
    dropdown.style.left = event.clientX + "px";

    // Add event listeners to the buttons
    resizeButton.addEventListener("click", handleResize);
    moveButton.addEventListener("click", handleMove);
});

function handleResize() {
    // Set up resizing variables
    resizing = true;
    aspectRatio = image.clientWidth / image.clientHeight;
    initialX = event.clientX;
    initialY = event.clientY;
    initialWidth = image.clientWidth;
    initialHeight = image.clientHeight;
    dropdown.classList.add("hidden");
}


function handleMove() {
    // Set up draggable variables
    draggable = true;
    offsetX = event.clientX - image.offsetLeft;
    offsetY = event.clientY - image.offsetTop;
    dropdown.classList.add("hidden");
}

let leftThreshold = 50; 
let rightThreshold = 50;

image.addEventListener("mousemove", event => {
    if (resizing) {
        let newWidth = aspectRatio * (event.clientY - initialY + initialHeight);
        image.style.width = newWidth + "px";
        image.style.height = (event.clientY - initialY + initialHeight) + "px";
    }
    if (draggable) {
        let left = event.clientX - offsetX;
        let top = event.clientY - offsetY;
        image.style.left = left + "px";
        image.style.top = top + "px";
        if (event.clientX < editableRect.left + (editableRect.width / 2) && !isSnappedLeft && Math.abs(event.clientX - offsetX) > leftThreshold) {
            image.style.cssFloat = "left";
            isSnappedLeft = true;
            isSnappedRight = false;
        } else if (event.clientX >= editableRect.left + (editableRect.width / 2) && !isSnappedRight && Math.abs(event.clientX - offsetX) > rightThreshold) {
            image.style.cssFloat = "right";
            isSnappedLeft = false;
            isSnappedRight = true;
        }
    }
});

document.addEventListener("mouseup", (event) => {
      // check whether the image is more than half on the left or right
      if (event.clientX < (editableRect.left + (editableRect.width / 2))) {
        isSnappedLeft = true;
    } else {
        isSnappedRight = true;
    }
   resizing = false;
   draggable = false;
});