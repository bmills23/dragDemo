const images = document.querySelectorAll(".draggable-resizable-image");
let imageObjects = []

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

//Content Editable Div Variables
let editableRect = editable.getBoundingClientRect()
let middleX = editableRect.left + (editableRect.width / 2);

//Global Variables Don't Do Much for Multiple Images
// //Resizing Variables
// let resizing = false;
// let aspectRatio;
// let initialX;
// let initialY;
// let initialWidth;
// let initialHeight;

// //Dragging
// let draggable = false;
// let offsetX;
// let offsetY;
// let isSnappedLeft = false;
// let isSnappedRight = false;
// let isPlaced = false;

// //Margin
// let marginResizing = false;
// let marginLeft = false;
// let marginRight = false;
// let marginTop = false;
// let marginBottom = false;

//Redefines Editable Rect On Resize 
window.addEventListener("resize", () => {
    editableRect = editable.getBoundingClientRect()
    middleX = editableRect.left + (editableRect.width / 2) 
})

class Image {
    constructor(resizing = false, aspectRatio = 0, initialX = 0, initialY = 0, initialWidth = 0, initialHeight = 0, //Resizing

                draggable = false, offsetX = 0, offsetY = 0, isSnappedLeft = false, isSnappedRight = false, isPlaced = false, //Dragging
 
                marginResizing = false, marginLeft = 0, marginRight = 0, marginTop = 0, marginBottom = 0) //Margin Editing) 
    
    { 

        this.resizing = resizing;
        this.aspectRatio = aspectRatio;
        this.initialX = initialX;
        this.initialY = initialY;
        this.initialWidth = initialWidth;
        this.initialHeight = initialHeight;

        this.draggable = draggable;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.isSnappedLeft = isSnappedLeft;
        this.isSnappedRight = isSnappedRight;
        this.isPlaced = isPlaced;

        this.marginResizing = marginResizing;
        this.marginLeft = marginLeft;
        this.marginRight = marginRight;
        this.marginTop = marginTop;
        this.marginBottom = marginBottom;
    }

}

//Each Image Needs It's Own Event Listener
images.forEach((image,index) => {

    //Instatiate New Object for Each Image 
    let imageObject = new Image()

    imageObjects.push(imageObject)

    image.addEventListener("mousedown", event => {

        let handleMouseDownFunc = handleMouseDown.bind(imageObjects[index])
        let handleMouseDownDivFunc = handleMouseDownDiv.bind(imageObjects[index])
        let handleMouseMoveFunc = handleMouseMove.bind(imageObjects[index])
    
        if (imageObjects[index].eventAdded) {
            image.removeEventListener("mousedown", handleMouseDownFunc);
            editable.removeEventListener("mousedown", handleMouseDownDivFunc);
            editable.removeEventListener("mousemove", handleMouseMoveFunc);
        } else {
            image.addEventListener("mousedown", handleMouseDownFunc);
            editable.addEventListener("mousedown", handleMouseDownDivFunc);
            editable.addEventListener("mousemove", handleMouseMoveFunc);
        } 
        
    })

    function handleMouseDown(event) {

        if (!this.resizing && 
            !this.draggable && 
            !this.marginResizing) {
        
              //Dropdown Activated
              dropdown.classList.remove("hidden");
         
              dropdown.style.top = image.offsetTop + image.offsetHeight + "px"
              dropdown.style.left = image.offsetLeft + image.offsetWidth + "px"
        
              // Add event listeners to the buttons
              resizeButton.addEventListener("click", handleResize.bind(this));
              moveButton.addEventListener("click", handleMove.bind(this));
              marginButton.addEventListener("click", handleMargin.bind(this));
      
            } else {
    
            this.resizing = false;
            this.draggable = false;
            
            this.marginResizing = false;
        
            this.marginLeft = false;
            this.marginRight = false;
            this.marginTop = false;
            this.marginBottom = false;

            resizeButton.removeEventListener("click", handleResize.bind(this));
            moveButton.removeEventListener("click", handleMove.bind(this));
            marginButton.removeEventListener("click", handleMargin.bind(this));
        
            dropdown.classList.add("hidden");
            marginDropdown.classList.add("hidden");
       
            if (!this.marginLeft || 
                !this.marginRight || 
                !this.marginTop || 
                !this.marginBottom) {
        
                marginSliderLeft.classList.add("hidden")
                marginSliderRight.classList.add("hidden")
                marginSliderTop.classList.add("hidden")
                marginSliderBottom.classList.add("hidden")
        
            }
              
        }
    
    }
    
    //If mousedown occurs while resizing/dragging within parent, cancels the action
    function handleMouseDownDiv(event) {
        
        if (this.resizing || this.draggable) {
        
            this.resizing = false;
            this.draggable = false;
            
            this.marginResizing = false;
        
            this.marginLeft = false;
            this.marginRight = false;
            this.marginTop = false;
            this.marginBottom = false;
               
        } else if (!this.marginLeft ||
            !this.marginRight || 
            !this.marginTop || 
            !this.marginBottom) {
                
            marginSliderLeft.classList.add("hidden")
            marginSliderRight.classList.add("hidden")
            marginSliderTop.classList.add("hidden")
            marginSliderBottom.classList.add("hidden")
                        
        }
    
    }
      
    function handleResize(event) {
    
        // Set up resizing variables
        this.resizing = true;   
        this.draggable = false;
        this.marginResizing = false;
        this.aspectRatio = image.clientWidth / image.clientHeight;
        this.initialX = event.clientX;
        this.initialY = event.clientY;
        this.initialWidth = image.clientWidth;
        this.initialHeight = image.clientHeight;
        dropdown.classList.add("hidden");
    
    }
      
    function handleMove(event) {
    
        // Set up draggable variables
        this.draggable = true;
        this.resizing = false;
        this.marginResizing = false;
        this.offsetX = event.clientX - image.offsetLeft;
        this.offsetY = event.clientY - image.offsetTop;
        dropdown.classList.add("hidden");
        
    }
    
    function handleMargin (event) {
            
        this.marginResizing = true;
        this.draggable = false;
        this.resizing = false;

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
    
    function handleMouseMove(event) {
          
        if (this.resizing) {
        
            let imageRect = image.getBoundingClientRect()
              
            let left = event.clientX - imageObjects[index].offsetX;
            let top = event.clientY - imageObjects[index].offsetY;
            image.style.left = left + "px";
            image.style.top = top + "px";

            let newWidth = this.aspectRatio * (event.clientY - imageObjects[index].initialY + imageObjects[index].initialHeight);
            let newHeight = event.clientY - imageObjects[index].initialY + imageObjects[index].initialHeight;

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
          
        if (this.draggable) {
                  
            event.target.style.cursor = "pointer";

            //
            let left = event.clientX - this.offsetX;
            let top = event.clientY - this.offsetY;
            image.style.left = left + "px";
            image.style.top = top + "px";
    
            // Check if cursor is within left or right half of parent div
            if (event.clientX < middleX) {
                image.style.cssFloat = "left";
                this.isSnappedLeft = true;
                this.isSnappedRight = false;
            } else if (event.clientX >= middleX) {
                image.style.cssFloat = "right";
                this.isSnappedLeft = false;
                this.isSnappedRight = true;
            }
    
            for (let i = 0; i < paragraphs.length; i++) {
                let rect = paragraphs[i].getBoundingClientRect()
                let lowerQuarter = rect.bottom / 4 
                if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.bottom - lowerQuarter && event.clientY < rect.bottom) {
                    paragraphs[i].appendChild(image);
                }
                    
            }
            
        }
        
        if (this.marginResizing) {
              
            leftMargin.addEventListener("click", event => {
    
                this.marginLeft = true;
            
                marginDropdown.classList.add("hidden")
                marginSliderLeft.classList.remove("hidden")
        
                marginSliderLeft.style.top = image.offsetTop + image.offsetHeight + "px" 
                marginSliderLeft.style.left = image.offsetLeft + image.offsetWidth + "px"
        
                marginSliderLeft.addEventListener("input", function () {
                    image.style.marginLeft = this.value + "px";
                });
        
            })

            rightMargin.addEventListener("click", event => {
        
                this.marginRight = true;
        
                marginDropdown.classList.add("hidden")
                marginSliderRight.classList.remove("hidden")
        
                marginSliderRight.style.top = image.offsetTop + image.offsetHeight + "px" 
                marginSliderRight.style.left = image.offsetLeft + image.offsetWidth + "px"
        
                marginSliderRight.addEventListener("input", function () {
                    image.style.marginRight = this.value + "px";
                });
        
        
            })

            topMargin.addEventListener("click", event => {
        
                this.marginTop = true;
        
                marginDropdown.classList.add("hidden")
                marginSliderTop.classList.remove("hidden")
        
                marginSliderTop.style.top = image.offsetTop + image.offsetHeight + "px" 
                marginSliderTop.style.left = image.offsetLeft + image.offsetWidth + "px"
        
                marginSliderTop.addEventListener("input", function () {
                    image.style.marginTop = this.value + "px";
                });
        
            })

            bottomMargin.addEventListener("click", event => {
    
                this.marginBottom = true;
        
                marginDropdown.classList.add("hidden")
                marginSliderBottom.classList.remove("hidden")
        
                marginSliderBottom.style.top = image.offsetTop + image.offsetHeight + "px" 
                marginSliderBottom.style.left = image.offsetLeft + image.offsetWidth + "px"
        
                marginSliderBottom.addEventListener("input", function () {
                    image.style.marginBottom = this.value + "px";
                });
        
            })
       
            }
    
        }
            
    }
        
    })


//Coordinates Appended to Move Button
const coordinates = document.createElement("div");
moveButton.appendChild(coordinates);

document.addEventListener("mousemove", event => {
    coordinates.innerHTML = `X: ${event.clientX}, Y: ${event.clientY}`;
});




