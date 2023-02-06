import { useRef, useState, useEffect } from "react";
import {
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  fitSelection,
  zoomOnViewerCenter,
  fitToViewer,
} from "react-svg-pan-zoom";


import * as MARKER_DATA from '../Markers';


const PLAN_1 =
  "https://media.istockphoto.com/id/1288292255/photo/residential-building-blueprint-plan-real-estate-housing-project-construction-concept.jpg?s=612x612&w=0&k=20&c=Th166PnOqlvPLxRFiysxtgbWR2nWvCvI90-mic6pdH8=";
const PLAN_2 =
  "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png";
const PLAN_3 =
  "https://i.pinimg.com/736x/06/37/2c/06372cef20d89b57c58bdfc140710c70--home-design-floor-plans-small-house-floor-plans.jpg";

export default function App({ currentTool }) {
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_NONE);
  const [value, setValue] = useState(INITIAL_VALUE);

  const [markers, setMarkers] = useState([]);

  const [isDrawingLine, setIsDrawingLine] = useState(false);
  const [isDrawingRect, setIsDrawingRect] = useState(false);
  const [prevPoint, setPrevPoint] = useState(null);

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);


  const createPointMarker = (xC, yC) => {
    return  new MARKER_DATA.PointMarker(new MARKER_DATA.Position([{xC: xC, yC: yC}]), new MARKER_DATA.Data(
      1,
      'point',
      100,
      100,
      100,
      1,
      1,
      'meter',
      ''
    ), "#FFFFFF").render()
  }

  const createLineMarker = (x1C, y1C, x2C, y2C, strokeColor, strokeWidth) => {
    return  new MARKER_DATA.LineMarker(new MARKER_DATA.Position([{xC: x1C, yC: y1C}, {xC: x2C, yC: y2C}]), new MARKER_DATA.Data(
      1,
      'point',
      100,
      100,
      100,
      1,
      1,
      'meter',
      ''
    ), currentTool.color, currentTool.strokeSize).render()
  }

  const createAreaMarker = (x1C, y1C, x2C, y2C) => {
    return  new MARKER_DATA.AreaMarker(new MARKER_DATA.Position([{xC: x1C, yC: y1C}, {xC: x2C, yC: y2C}]), new MARKER_DATA.Data(
      1,
      'point',
      100,
      100,
      100,
      1,
      1,
      'meter',
      ''
    ), "black", currentTool.strokeSize, currentTool.color).render()
  }

  const handleClick = (event) => {
      console.log("click", event.x, event.y, event.originalEvent)

      switch(currentTool.toolId) {
        case 2:
          // Point Marker Drawing
          setMarkers([...markers, createPointMarker(event.x, event.y)]);
          break;
        case 3:
          // Line Drawing
          console.log(isDrawingLine);
          console.log(prevPoint);
          if (isDrawingLine) {
            setIsDrawingLine(!isDrawingLine);
            setMarkers([...markers, createLineMarker(event.x, event.y, prevPoint.x, prevPoint.y)]);
          } else {
            setIsDrawingLine(!isDrawingLine);
            setPrevPoint({x: event.x, y: event.y})
          }
          break;
        case 4:
          // Rectangle Drawing
          if (isDrawingRect) {
            setIsDrawingRect(!isDrawingRect);
            setMarkers([...markers, createAreaMarker(event.x, event.y, prevPoint.x, prevPoint.y)]);
          } else {
            setIsDrawingRect(!isDrawingRect);
            setPrevPoint({x: event.x, y: event.y})
          }
          break;
        default:
          console.log("Mouse Pointer Selected")
      } 
  }

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "black" }}>
      {/* <button onClick={() => handleClick()} style={{color:"white"}}>TEXT</button> */}
      {
        // Get The Desired Height and Width of the Container and Use them in Chile Components
        [
          {
            heightW:
              window.innerWidth <= 768
                ? window.innerHeight - 130
                : window.innerHeight - 105,
            widthW: window.innerWidth,
          },
        ].map((dims) => {
          return (
            <ReactSVGPanZoom
              ref={Viewer}
              width={dims.widthW}
              height={dims.heightW}
              tool={tool}
              onChangeTool={setTool}
              value={value}
              onChangeValue={setValue}
              detectAutoPan={false}
              // onZoom={(e) => console.log("zoom")}
              // onPan={(e) => console.log("pan")}
              onClick={handleClick}
            >
              <svg width={dims.widthW} height={dims.heightW}>
                <image
                  width={dims.widthW}
                  height={dims.heightW}
                  href={PLAN_2}
                />
                {markers.map(marker => marker)}
                
              </svg>
            </ReactSVGPanZoom>
          );
        })
      }
    </div>
  );
}

{
  /* <image x="0" y="0" width="100%" height="100%" href={MarkerSVG} />
            <g fillOpacity=".5" strokeWidth="4">
                <rect x="100" y="100" width="400" height="300" fill="#4286f4" stroke="#f4f142"/>
            </g>
            <g fillOpacity=".5" strokeWidth="10">
                <circle cx="200" cy="200" r="150" fill="#23f9ac" stroke="#a100b0"/>
            </g> */
}
{
  /* <svg width={617} height={316}>
          <g fillOpacity=".5" strokeWidth="4">
            <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
            <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
            <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
            <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
          </g>
        </svg> */
}

{
  /* <ReactSVGPanZoom
        ref={Viewer}
        width={window.innerWidth} height={window.innerWidth <=768 ? window.innerHeight-130 : window.innerHeight-105}
        tool={tool} onChangeTool={setTool}
        value={value} onChangeValue={setValue}
        onZoom={e => console.log('zoom')}
        onPan={e => console.log('pan')}
        onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
      >
        <svg width={window.innerWidth} height={window.innerWidth <=768 ? window.innerHeight-130 : window.innerHeight-105}>
            <image 
            width={window.innerWidth} 
            height={window.innerWidth <=768 ? window.innerHeight-130 : window.innerHeight-105} 
            href={PLAN_1}/>
        </svg>
      </ReactSVGPanZoom> */
}
