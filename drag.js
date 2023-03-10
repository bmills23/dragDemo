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

//Redefines Editable Rect On Resize 
window.addEventListener("resize", () => {
    editableRect = editable.getBoundingClientRect()
    middleX = editableRect.left + (editableRect.width / 2) 
})

class Image {
    constructor(image, //Image DOM Element
        
                resizing = false, aspectRatio = 0, initialX = 0, initialY = 0, initialWidth = 0, initialHeight = 0, //Resizing

                draggable = false, offsetX = 0, offsetY = 0, isSnappedLeft = false, isSnappedRight = false, isPlaced = false, //Dragging
 
                marginResizing = false, marginLeft = 0, marginRight = 0, marginTop = 0, marginBottom = 0) //Margin Editing 

    {

        this.image = image

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

        //Mouse Move Handler for Event Listening Matchup
        this.handleMMRef = event => this.handleMouseMove(event)
      
        //Handlers for Margin Editing

        //Left
        this.leftMarginClickHandler = (event) => {
            this.marginLeft = true;
            marginDropdown.classList.add("hidden");
            marginSliderLeft.classList.remove("hidden");
          
            marginSliderLeft.style.top = this.image.offsetTop + this.image.offsetHeight + "px";
            marginSliderLeft.style.left = this.image.offsetLeft + this.image.offsetWidth + "px";
          
            marginSliderLeft.addEventListener("input", this.inputHandlerLeft)
        }

        this.inputHandlerLeft = () => {
            this.image.style.marginLeft = marginSliderLeft.value + "px";
        }

        //Right
        this.rightMarginClickHandler = (event) => {
            this.marginRight = true;
            marginDropdown.classList.add("hidden");
            marginSliderRight.classList.remove("hidden");
          
            marginSliderRight.style.top = this.image.offsetTop + this.image.offsetHeight + "px";
            marginSliderRight.style.left = this.image.offsetLeft + this.image.offsetWidth + "px";
          
            marginSliderRight.addEventListener("input", this.inputHandlerRight)
        }

        this.inputHandlerRight = () => {
            this.image.style.marginRight = marginSliderRight.value + "px";
        }

        //Top
        this.topMarginClickHandler = (event) => {
            this.marginTop = true;
            marginDropdown.classList.add("hidden");
            marginSliderTop.classList.remove("hidden");
          
            marginSliderTop.style.top = this.image.offsetTop + this.image.offsetHeight + "px";
            marginSliderTop.style.left = this.image.offsetLeft + this.image.offsetWidth + "px";
          
            marginSliderTop.addEventListener("input", this.inputHandlerTop)
        }

        this.inputHandlerTop = () => {
            this.image.style.marginTop = marginSliderTop.value + "px";
        }

        //Bottom
        this.bottomMarginClickHandler = (event) => {
            this.marginBottom = true;
            marginDropdown.classList.add("hidden");
            marginSliderBottom.classList.remove("hidden");
          
            marginSliderBottom.style.top = this.image.offsetTop + this.image.offsetHeight + "px";
            marginSliderBottom.style.left = this.image.offsetLeft + this.image.offsetWidth + "px";
          
            marginSliderBottom.addEventListener("input", this.handleMarginButton) 
        }

        this.inputHandlerBottom = () => {
            this.image.style.marginBottom = marginSliderBottom.value + "px";
        }

    }



    //Arrow Functions Inherit 'this' From Parent Scope

    //Handle Mouse Down Function
    handleMouseDown = (event) => {

        if (!this.resizing && 
            !this.draggable && 
            !this.marginResizing) {

            let handleResizeButton = event => this.handleResize(event)
            let handleMoveButton = event => this.handleMove(event)
            let handleMarginButton = event => this.handleMargin(event)
        
              //Dropdown Activated
              dropdown.classList.remove("hidden");

              console.log("Dropdown unhidden")

              dropdown.style.top = this.image.offsetTop + this.image.offsetHeight + "px"
              dropdown.style.left = this.image.offsetLeft + this.image.offsetWidth + "px"
        
              // Add event listeners to the buttons
              resizeButton.addEventListener("click", handleResizeButton, { once: true });
              moveButton.addEventListener("click", handleMoveButton, { once: true });
              marginButton.addEventListener("click", handleMarginButton, { once: true });
      
            } else {

            //Reset all Boolean Values
            if (this.resizing || this.draggable || this.marginResizing) {
            
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
    
    }
    
    //If mousedown occurs while resizing/dragging within parent, cancels the action
    handleMouseDownDiv = (event) => {

        leftMargin.removeEventListener("click", this.leftMarginClickHandler)
        rightMargin.removeEventListener("click", this.rightMarginClickHandler)
        topMargin.removeEventListener("click", this.topMarginClickHandler)
        bottomMargin.removeEventListener("click", this.bottomMarginClickHandler)

        marginSliderLeft.removeEventListener("input", this.inputHandlerLeft)
        marginSliderRight.removeEventListener("input", this.inputHandlerRight)
        marginSliderTop.removeEventListener("input", this.inputHandlerTop)
        marginSliderBottom.removeEventListener("input", this.inputHandlerBottom)
        
        //Reset all Boolean Values
        if (this.resizing || this.draggable || this.marginResizing) {
        
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
      
    handleResize = (event) => {

        editable.addEventListener("mousedown", this.removeMouseMove, { once : true });
        this.image.addEventListener("mousedown", this.removeMouseMove, { once : true });
        
        // Set up resizing variables
        this.resizing = true;   
        this.draggable = false;
        this.marginResizing = false;
        this.aspectRatio = this.image.clientWidth / this.image.clientHeight;
        this.initialX = event.clientX;
        this.initialY = event.clientY;

        this.initialWidth = this.image.clientWidth;
        this.initialHeight = this.image.clientHeight;
        dropdown.classList.add("hidden");

    }

    //Removes Mouse Move in handleMove method while creating new listeners for mousedown
    //The handleMMRef is essential for making sure that the added and subtracted listeners are equal

    removeMouseMove = () => {

        editable.removeEventListener("mousemove", this.handleMMRef);

    }

   handleMove = (event) => {  

        editable.addEventListener("mousedown", this.removeMouseMove, { once : true });
        this.image.addEventListener("mousedown", this.removeMouseMove, { once : true });

        // Set up draggable variables
        this.draggable = true;
        this.resizing = false;
        this.marginResizing = false;
        this.offsetX = event.clientX - this.image.offsetLeft;
        this.offsetY = event.clientY - this.image.offsetTop;
        dropdown.classList.add("hidden");
        
    }

    handleMargin = (event) => { 

        this.marginResizing = true;
        this.draggable = false;
        this.resizing = false;

        this.marginLeft = false;
        this.marginRight = false;
        this.marginTop = false;
        this.marginBottom = false;

        marginDropdown.classList.remove("hidden")
        dropdown.classList.add("hidden")

        marginDropdown.style.top = this.image.offsetTop + this.image.offsetHeight + "px"
        marginDropdown.style.left = this.image.offsetLeft + this.image.offsetWidth + "px"

        marginSliderRight.style.top = this.image.offsetTop + this.image.offsetHeight + "px" 
        marginSliderRight.style.left = this.image.offsetLeft + this.image.offsetWidth + "px"

        marginSliderTop.style.top = this.image.offsetTop + this.image.offsetHeight + "px" 
        marginSliderTop.style.left = this.image.offsetLeft + this.image.offsetWidth + "px"

        marginSliderBottom.style.top = this.image.offsetTop + this.image.offsetHeight + "px" 
        marginSliderBottom.style.left = this.image.offsetLeft + this.image.offsetWidth + "px"

    }
    
    handleMouseMove = (event) => {
          
        if (this.resizing) {
        
            let imageRect = this.image.getBoundingClientRect()
              
            let left = event.clientX - this.offsetX;
            let top = event.clientY - this.offsetY;
            this.image.style.left = left + "px";
            this.image.style.top = top + "px";

            let newWidth = this.aspectRatio * (event.clientY - this.initialY + this.initialHeight);
            let newHeight = event.clientY - this.initialY + this.initialHeight;

            if(newWidth > editableRect.width) {
                newWidth = editableRect.width 
            }
            if(newHeight > editableRect.height) {
                newHeight = editableRect.height;
            }

            this.image.style.width = newWidth + "px";
        
            if (imageRect.left < editableRect.left) {
                this.image.style.left = editableRect.left;
            }
            if (imageRect.top < editableRect.top) {
                this.image.style.top = editableRect.top;
            }
            if (imageRect.right > editableRect.right) {
                this.image.style.left = editableRect.right - imageRect.width + "px";
            } 
            if (imageRect.bottom > editableRect.bottom) {
                this.image.style.top = editableRect.bottom - imageRect.height + "px";
            }   

        }    
          
        if (this.draggable) {

            event.target.style.cursor = "pointer";

            let left = event.clientX - this.offsetX;
            let top = event.clientY - this.offsetY;

            this.image.style.left = left + "px";
            this.image.style.top = top + "px";
    
            // Check if cursor is within left or right half of parent div
            if (event.clientX < middleX) {
                this.image.style.cssFloat = "left";
                this.isSnappedLeft = true;
                this.isSnappedRight = false;
            } else if (event.clientX >= middleX) {
                this.image.style.cssFloat = "right";
                this.isSnappedLeft = false;
                this.isSnappedRight = true;
            }
    
            for (let i = 0; i < paragraphs.length; i++) {
                let rect = paragraphs[i].getBoundingClientRect();

                let top = rect.top;
                let bottom = rect.bottom;
              
                if (event.clientY > top && event.clientY < bottom) {
                    paragraphs[i].appendChild(this.image);
                    break;
                }

              }
            
        }
        
        if (this.marginResizing) {
              
            leftMargin.addEventListener("click", this.leftMarginClickHandler)

            rightMargin.addEventListener("click", this.rightMarginClickHandler)

            topMargin.addEventListener("click", this.topMarginClickHandler)

            bottomMargin.addEventListener("click", this.bottomMarginClickHandler)

        }
            
    }

    
}


images.forEach((image) => {

    let imageObject = new Image(image)

    imageObjects.push(imageObject)

    image.addEventListener("click", event => {

        let handleMD = event => imageObject.handleMouseDown(event)
        let handleMDD = event => imageObject.handleMouseDownDiv(event)

        image.addEventListener("mousedown", handleMD, { once : true })

        editable.addEventListener("mousedown", handleMDD, { once : true })

        editable.addEventListener("mousemove", imageObject.handleMMRef)
        
    });
});

//Coordinates Appended to Move Button
const coordinates = document.createElement("div");
moveButton.appendChild(coordinates);

document.addEventListener("mousemove", event => {
    coordinates.innerHTML = `X: ${event.clientX}, Y: ${event.clientY}`;
});



