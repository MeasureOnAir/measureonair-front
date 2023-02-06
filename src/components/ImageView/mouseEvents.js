// Mouse Configs
const SCROLL_SENSITIVITY = 0.005;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.5;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const getXY = (canvas, event) => {
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    const x = event.clientX - rect.left
    return {x: x, y: y}
}

const handleMouseDown = (event, props) => {
    const {clientX, clientY} = event;
    // Store the last position where user clicked
    props.touch.current = {
        x: clientX,
        y: clientY
    };
    props.setDragging(true);

    // Check Mouse Click
    handleMouseClick(event, props)
};

const handleMouseUp = (props) => props.setDragging(false);

const handleMouseClick = (event, props) => {

    if (props.canvasRef.current) {
        const XY = getXY(props.canvasRef.current, event)
        const context = props.canvasRef.current.getContext("2d");

        const currentToolId = props.currentTool.toolId

        // if(currentToolId === 1){
        //     console.log("Mouse Pointer Selecetd")
        // } else if (currentToolId === 2){
        //     console.log("Marker Selecetd")
        // } else if (currentToolId === 3){
        //     console.log("Line Selecetd")
        // } else if (currentToolId === 4){
        //     console.log("Rectangle Selecetd")
        // } else {
        //     console.log("Nothing Selecetd")
        // }


        const isMarkerNotClicked = props.pathObjs.every(path => {
            if (context.isPointInPath(path.path, XY.x, XY.y)) {
                // Do Something with the click
                // console.log("Clicked on Rectangle", XY.x, XY.y);
                // setFormValues(path.data);
                // setDragging(false);
                // handleOpen();
                // return false;
                console.log("Path Clicked")
            }
            return true;
        })

        // console.log(event.clientX)

        // if(currentToolId === 2){
        //     const x = event.clientX;
        //     const y = event.clientY;

        //     const img = new Image();
        //     img.src = "/home/sahan/Projects/Personal/MOA/measureonair-front/src/assets/marker-filled.svg";
        //     img.onload = function() {
        //         context.drawImage(img, x, y);
        //     };
        // }

        // if (doAddMarkers && isMarkerNotClicked) {
            

        //     const imgRatio = handleCanvasSize(context);
        //     // setClickedCordinates({x: XY.x, y: XY.y});
        //     setClickedCordinates({x: XY.x*imgRatio, y: XY.y*imgRatio});

        //     // Add New Marker
        //     setFormValues(INIT_DATA);
        //     handleOpen();
        // }
    }
}

const handleWheel = (event, props) => {
    const {deltaY} = event;
    props.setZoom((zoom) => clamp(zoom + deltaY * SCROLL_SENSITIVITY * -1, MIN_ZOOM, MAX_ZOOM));
};

const handleMouseMove = (event, props) => {
    if (props.dragging) {
        const {x, y} = props.touch.current;
        const {clientX, clientY} = event;
        // Calculate where the user is panning the image
        props.setOffset({
            x: props.offset.x + (x - clientX),
            y: props.offset.y + (y - clientY)
        });
        // Update the last position where user clicked
        props.touch.current = {
            x: clientX,
            y: clientY
        };
    }
};


export {handleMouseDown, handleMouseUp, handleWheel, handleMouseMove}