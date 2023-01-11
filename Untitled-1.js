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

const image = document.getElementById("resizable-image");
let resizing = false;
let aspectRatio;
let initialX;
let initialY;
let initialWidth;
let initialHeight;
let threshold = 10;

image.addEventListener("mousedown", event => {
    resizing = true;
    aspectRatio = image.clientWidth / image.clientHeight;
    initialX = event.clientX;
    initialY = event.clientY;
    initialWidth = image.clientWidth;
    initialHeight = image.clientHeight;
});

image.addEventListener("mousemove", event => {
    if (!resizing) {
        return;
    }
    if (Math.abs(event.clientX - initialX) < threshold && Math.abs(event.clientY - initialY) < threshold) {
        return;
    }
    let newWidth = aspectRatio * (event.clientY - initialY + initialHeight);
    image.style.width = newWidth + "px";
    image.style.height = (event.clientY - initialY + initialHeight) + "px";
});

document.addEventListener("mouseup", () => {
   resizing = false;
   // do something with the end of the resize event
});