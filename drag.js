const image = document.getElementById("draggable-resizable-image");

//First Dropdown (Resize, Drag, Margin)
const dropdown = document.getElementById("dropdown");

//Resizing and Moving/Dragging
const resizeButton = document.getElementById("resize-button");
const moveButton = document.getElementById("move-button");

//Margin Editting Tools
const marginButton = document.getElementById("margin-resize");
const marginDropdown = document.getElementById("margin-dropdown");

const leftMargin = document.getElementById("left-margin")
const rightMargin = document.getElementById("right-margin")
const topMargin = document.getElementById("top-margin")
const bottomMargin = document.getElementById("bottom-margin")

const marginSliderLeft = document.getElementById("margin-slider-left")
const marginSliderRight = document.getElementById("margin-slider-right")
const marginSliderTop = document.getElementById("margin-slider-top")
const marginSliderBottom = document.getElementById("margin-slider-bottom")

//Div Parent
const editable = document.getElementById("editable");
//All Paragraphs
const paragraphs = document.querySelectorAll('p')

let imageRect = image.getBoundingClientRect();

//Content Editable Div Variables
let editableRect = editable.getBoundingClientRect()
let middleX = editableRect.left + (editableRect.width / 2);

//Resizing Variables
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

//Margin
let marginResizing = false;
let marginLeft = false;
let marginRight = false;
let marginTop = false;
let marginBottom = false;

//Redefines Editable Rect On Resize 
window.addEventListener("resize", () => {
    editableRect = editable.getBoundingClientRect()
    middleX = editableRect.left + (editableRect.width / 2) 
}) 

image.addEventListener("mousedown", event => {
    if (!resizing && !draggable && !marginResizing) {

      //Dropdown Activated
      dropdown.classList.remove("hidden");
 
      dropdown.style.top = image.offsetTop + image.offsetHeight + "px"
      dropdown.style.left = image.offsetLeft + image.offsetWidth + "px"

      // Add event listeners to the buttons
      resizeButton.addEventListener("click", handleResize);
      moveButton.addEventListener("click", handleMove);
      marginButton.addEventListener("click", handleMargin);

    } else {
      resizing = false;
      draggable = false;
    
      marginResizing = false;

        marginLeft = false;
        marginRight = false;
        marginTop = false;
        marginBottom = false;

      dropdown.classList.add("hidden");
      marginDropdown.classList.add("hidden");

      if (!marginLeft || !marginRight || !marginTop || !marginBottom) {

        marginSliderLeft.classList.add("hidden")
        marginSliderRight.classList.add("hidden")
        marginSliderTop.classList.add("hidden")
        marginSliderBottom.classList.add("hidden")

      }
      
    }
  });

  //If mousedown occurs while resizing/dragging within parent, cancels the action
  editable.addEventListener("mousedown", event => {
    if (resizing || draggable) {
        resizing = false;
        draggable = false;

    } else if (!marginLeft || !marginRight || !marginTop || !marginBottom) {

        marginSliderLeft.classList.add("hidden")
        marginSliderRight.classList.add("hidden")
        marginSliderTop.classList.add("hidden")
        marginSliderBottom.classList.add("hidden")
        
     
    }
  })

  function handleResize() {
    // Set up resizing variables
    resizing = true;
    draggable = false;
    marginResizing = false;
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
    marginResizing = false;
    offsetX = event.clientX - image.offsetLeft;
    offsetY = event.clientY - image.offsetTop;
    dropdown.classList.add("hidden");
  }

  function handleMargin () {
    marginResizing = true;
    draggable = false;
    resizing = false;
    marginDropdown.classList.remove("hidden")
    dropdown.classList.add("hidden")

    marginDropdown.style.top = image.offsetTop + image.offsetHeight + "px"
    marginDropdown.style.left = image.offsetLeft + image.offsetWidth + "px"

    marginSliderRight.style.top = image.offsetTop + image.offsetHeight + "px" 
    marginSliderRight.style.left = image.offsetLeft + image.offsetWidth + "px"

    marginSliderTop.style.top = image.offsetTop + image.offsetHeight + "px" 
    marginSliderTop.style.left = image.offsetLeft + image.offsetWidth + "px"

    marginSliderBottom.style.top = image.offsetTop + image.offsetHeight + "px" 
    marginSliderBottom.style.left = image.offsetLeft + image.offsetWidth + "px"

}

editable.addEventListener("mousemove", event => {
    if (resizing) {

        imageRect = image.getBoundingClientRect()
        
        let left = event.clientX - offsetX;
        let top = event.clientY - offsetY;
        image.style.left = left + "px";
        image.style.top = top + "px";

        let newWidth = aspectRatio * (event.clientY - initialY + initialHeight);
        let newHeight = event.clientY - initialY + initialHeight;

        if(newWidth > editableRect.width) {
            newWidth = editableRect.width 
        }
        if(newHeight > editableRect.height) {
            newHeight = editableRect.height;
        }

        image.style.width = newWidth + "px";
    
        if (imageRect.left < editableRect.left) {
            image.style.left = editableRect.left;
        }
        if (imageRect.top < editableRect.top) {
            image.style.top = editableRect.top;
        }
        if (imageRect.right > editableRect.right) {
            image.style.left = editableRect.right - imageRect.width + "px";
        } 
        if (imageRect.bottom > editableRect.bottom) {
            image.style.top = editableRect.bottom - imageRect.height + "px";
        }
    }

    if (draggable) {

        imageRect = image.getBoundingClientRect()

        event.target.style.cursor = "pointer";

        //
        let left = event.clientX - offsetX;
        let top = event.clientY - offsetY;
        image.style.left = left + "px";
        image.style.top = top + "px";

        // Check if cursor is within left or right half of parent div
        if (event.clientX < middleX) {
            image.style.cssFloat = "left";
            isSnappedLeft = true;
            isSnappedRight = false;
        } else if (event.clientX >= middleX) {
            image.style.cssFloat = "right";
            isSnappedLeft = false;
            isSnappedRight = true;
        }

        for (let i = 0; i < paragraphs.length; i++) {
            let rect = paragraphs[i].getBoundingClientRect()
            let lowerQuarter = rect.bottom / 4 
            if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.bottom - lowerQuarter && event.clientY < rect.bottom) {
                paragraphs[i].appendChild(image);
            }
            
        }

   }

   if (marginResizing) {
     
    image.style.backgroundColor = "red"

     leftMargin.addEventListener("click", event => {

        marginLeft = true;
    
        marginDropdown.classList.add("hidden")
        marginSliderLeft.classList.remove("hidden")

        marginSliderLeft.style.top = image.offsetTop + image.offsetHeight + "px" 
        marginSliderLeft.style.left = image.offsetLeft + image.offsetWidth + "px"

        marginSliderLeft.addEventListener("input", function () {
            image.style.marginLeft = this.value + "px";
        });

     })
     rightMargin.addEventListener("click", event => {

        marginRight = true;

        marginDropdown.classList.add("hidden")
        marginSliderRight.classList.remove("hidden")

        marginSliderRight.style.top = image.offsetTop + image.offsetHeight + "px" 
        marginSliderRight.style.left = image.offsetLeft + image.offsetWidth + "px"

        marginSliderRight.addEventListener("input", function () {
            image.style.marginRight = this.value + "px";
        });


     })
     topMargin.addEventListener("click", event => {

        marginTop = true;

        marginDropdown.classList.add("hidden")
        marginSliderTop.classList.remove("hidden")

        marginSliderTop.style.top = image.offsetTop + image.offsetHeight + "px" 
        marginSliderTop.style.left = image.offsetLeft + image.offsetWidth + "px"

        marginSliderTop.addEventListener("input", function () {
            image.style.marginTop = this.value + "px";
        });

     })
     bottomMargin.addEventListener("click", event => {
        marginBottom = true;

        marginDropdown.classList.add("hidden")
        marginSliderBottom.classList.remove("hidden")

        marginSliderBottom.style.top = image.offsetTop + image.offsetHeight + "px" 
        marginSliderBottom.style.left = image.offsetLeft + image.offsetWidth + "px"

        marginSliderBottom.addEventListener("input", function () {
            image.style.marginBottom = this.value + "px";
        });

     })

   }


});

const coordinates = document.createElement("div");
            moveButton.appendChild(coordinates);

            document.addEventListener("mousemove", event => {
            coordinates.innerHTML = `X: ${event.clientX}, Y: ${event.clientY}`;
});
    
