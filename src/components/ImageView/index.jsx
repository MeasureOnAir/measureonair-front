import React, { useMemo, useRef, useEffect, useState } from "react";
import Toolbar from "../Toolbar";
import {
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
  handleWheel,
} from "./mouseEvents";

import Marker_Filled from "../../assets/marker-filled.svg";
import MarkerFilled from "../MarkerIcon";

const SAMPLE_IMAGE_URL =
  "https://wcs.smartdraw.com/floor-plan/img/floor-house-plan.jpg?bn=15100111860";
  // "https://wpmedia.roomsketcher.com/content/uploads/2022/01/05101939/Floor-plan-with-total-area-measurement.png";

// const MARKER_IMAGE_URL = "https://cdn3.vectorstock.com/i/1000x1000/33/32/location-icon-map-address-geographical-position-vector-29053332.jpg";
// const MARKER_IMAGE_URL ="/home/sahan/Projects/Personal/MOA/measureonair-front/src/assets/marker-filled.svg";
// const MARKER_IMAGE_URL = "/home/sahan/Projects/Personal/MOA/measureonair-front/src/assets/moa-logo-horizontal.svg";
// const MARKER_IMAGE_URL = "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg";
// const MARKER_IMAGE_URL = `data:image/svg+xml;utf8, <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="red" /><circle cx="150" cy="100" r="80" fill="green" /><text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text></svg>`


const Viewer = ({toolData, projectData}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const background = useMemo(() => new Image(), [SAMPLE_IMAGE_URL]);
  const markerImage = useMemo(() => new Image(), [MarkerFilled])

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const touch = useRef({ x: 0, y: 0 });

  const [pathObjs, setPathObjs] = useState([]);

  const [currentTool, setCurrentTool] = useState(0);

  
  // Set window resize event listener
  // useEffect(() => {
  //   const handleResize = () => console.log("Window Has Changed");
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  useEffect(() => {
    background.src = SAMPLE_IMAGE_URL;
    markerImage.src = MarkerFilled;
    draw();
  }, []);

  useEffect(() => {
    draw();
  }, [zoom, offset]);

  useEffect(() => {
    setCurrentTool(toolData);
    console.log("Tool Data Changed")
  }, [toolData])

  // useEffect(() => {
  //   console.log("Project Data Changed")
  // }, [projectData])


  // useEffect(() => {
  //   background.src = SAMPLE_IMAGE_URL;

  //   if (canvasRef.current) {
  //     background.onload = () => {
  //       // Get the image dimensions
  //       const { width, height } = background;
  //       canvasRef.current.width = width;
  //       canvasRef.current.height = height;

  //       // Draw the image
  //       canvasRef.current.getContext("2d").drawImage(background, 0, 0);
  //     };
  //   }
  // }, [background]);



  const draw = () => {
    if (canvasRef.current) {
      const { width, height } = background;
      const context = canvasRef.current.getContext("2d");

      // Set canvas dimensions
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      // Clear canvas and scale it based on current zoom
      context.translate(-offset.x, -offset.y);
      context.clearRect(0, 0, width, height);
      context.scale(zoom, zoom);

      // Make sure we're zooming to the center
      const x = (context.canvas.width / zoom - background.width) / 2;
      const y = (context.canvas.height / zoom - background.height) / 2;

      // Draw image
      context.drawImage(background, x, y);
      context.drawImage(markerImage, 200, 200, 100, 100);

      // let img = new Image();
      // img.src = "/home/sahan/Projects/Personal/MOA/measureonair-front/src/assets/marker-filled.svg";
      // img.src = "/home/sahan/Projects/Personal/MOA/measureonair-front/src/assets/marker-filled.jpg";
      // img.src = "/home/sahan/Projects/Personal/MOA/measureonair-front/src/assets/moa-logo-horizontal.svg"
      // context.drawImage(img, 0, 0);
      // img.onload = () => {context.drawImage(img, 0, 0);};
      


      // context.fillStyle = "#FFFFFF"
      // context.fillStyle = "rgba(255,87,51,0.8)"
      // // context.fill(x.path)
      // context.lineWidth = 2
      // context.strokeStyle = "#000000"
      // // context.stroke(x.path)

      // context.beginPath();
      // context.rect(x, y, 100, 100 );
      // context.fill();
      // context.stroke();
    }
  };
      {/* <Toolbar props={{ setCurrentTool: setCurrentTool }} /> */}
  return (
      <div ref={containerRef} style={{ backgroundColor: "black"}}>
        {/* <button onClick={() => console.log("")}>TEST</button> */}
        <canvas
          style={{
            height: "100%",
            width: "100%",
          }}
          onMouseDown={(event) =>
            handleMouseDown(event, {
              touch: touch,
              setDragging: setDragging,
              canvasRef: canvasRef,
              pathObjs: pathObjs,
              currentTool: currentTool
            })
          }
          onMouseUp={() => handleMouseUp({ setDragging: setDragging, currentTool: currentTool })}
          onWheel={(event) => handleWheel(event, { setZoom: setZoom })}
          onMouseMove={(event) =>
            handleMouseMove(event, {
              dragging: dragging,
              touch: touch,
              setOffset: setOffset,
              offset: offset,
            })
          }
          ref={canvasRef}
        />
      </div>
  );
};

export default Viewer;
