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
      //Dropdown Activated
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
  
  let threshold = 50

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

let imageRect = image.getBoundingClientRect();

image.addEventListener("mousemove", event => {
    if (resizing) {
        
        let newWidth = aspectRatio * (event.clientY - initialY + initialHeight);
        image.style.width = newWidth + "px";
        image.style.height = (event.clientY - initialY + initialHeight) + "px";
     
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
     
    }
    if (draggable) {
        let left = event.clientX - offsetX;
        let top = event.clientY - offsetY;
    
        // Check if image is outside the left or top bounds of the parent div
        if (left < editableRect.left) {
            left = editableRect.left;
        }
        if (top < editableRect.top) {
            top = editableRect.top;
        }
    
        // Check if image is outside the right or bottom bounds of the parent div
        if (left + image.clientWidth > editableRect.right) {
            left = editableRect.right - image.clientWidth;
        }
        if (top + image.clientHeight > editableRect.bottom) {
            top = editableRect.bottom - image.clientHeight;
        }
    
        image.style.left = left + "px";
        image.style.top = top + "px";
    
        // Check if image is mostly to the left or right of the parent div
        if (event.clientX < editableRect.left + (editableRect.width / 2)) {
            image.style.cssFloat = "left";
        } else {
            image.style.cssFloat = "right";
        }
      }
      
    });