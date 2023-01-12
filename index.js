const image = document.getElementById("draggable-resizable-image");
const dropdown = document.getElementById("dropdown");
const resizeButton = document.getElementById("resize-button");
const moveButton = document.getElementById("move-button");

const editable = document.getElementById("editable");
const editableRect = editable.getBoundingClientRect();

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
let isPlaced = false;

image.addEventListener("mousedown", event => {
    if (!resizing && !draggable) {
    
    const rect = image.getBoundingClientRect()  

    let cursorX = event.clientX;
    let cursorY = event.clientY;

    let centerX = rect.left + rect.width/2;
    let centerY = rect.top + rect.height/2;
    
    let offsetX = cursorX - centerX;
    let offsetY = cursorY - centerY;

    image.style.left = rect.left + offsetX + "px";
    image.style.top = rect.top + offsetY + "px";
        
      // check if cursor is in bottom right quadrant
    
      dropdown.classList.remove("hidden");
      dropdown.style.top = event.clientY + "px";
      dropdown.style.left = event.clientX + "px";
      // Add event listeners to the buttons
      resizeButton.addEventListener("click", handleResize);
      moveButton.addEventListener("click", handleMove);
    } else {
      resizing = false;
      draggable = false;
      dropdown.classList.add("hidden");
    }
  });
  
  function handleResize() {
    // Set up resizing variables
    resizing = true;
    draggable = false;
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
    resizing = false;
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

        let imageRect = image.getBoundingClientRect();

        if (imageRect.left < editableRect.left) {
            left = editableRect.left;
        }
        if (imageRect.top < editableRect.top) {
            top = editableRect.top;
        }
        if (imageRect.right > editableRect.right) {
            left = editableRect.right - imageRect.width;
        }
        if (imageRect.bottom > editableRect.bottom) {
            top = editableRect.bottom - imageRect.height;
        }

        // Check if image is mostly inside or mostly outside of the parent div
        let insidePercentage = (imageRect.width * imageRect.height) / (editableRect.width * editableRect.height);
        if (insidePercentage > 0.5) {
            image.style.position = "relative";
            image.style.cssFloat = "none";
        } else {
            if (image.style.position !== "absolute") {
                image.style.position = "absolute";
            }
        }
    }
    if (draggable) {
        let left = event.clientX - offsetX;
        let top = event.clientY - offsetY;
        image.style.left = left + "px";
        image.style.top = top + "px";

        let imageRect = image.getBoundingClientRect();

        if (imageRect.left < editableRect.left) {
            left = editableRect.left;
        }
        if (imageRect.top < editableRect.top) {
            top = editableRect.top;
        }
        if (imageRect.right > editableRect.right) {
            left = editableRect.right - imageRect.width;
        }
        if (imageRect.bottom > editableRect.bottom) {
            top = editableRect.bottom - imageRect.height;
        }

        // Check if image is mostly inside or mostly outside of the parent div
        let insidePercentage = (imageRect.width * imageRect.height) / (editableRect.width * editableRect.height);
        if (insidePercentage > 0.5) {
            image.style.position = "relative";
            image.style.cssFloat = "none";
        } else {
            if (image.style.position !== "absolute") {
                image.style.position = "absolute";
            }
        }
    }
        
});