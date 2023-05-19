import { useRef, useState, useEffect } from "react";
import {
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  // fitSelection,
  // zoomOnViewerCenter,
  // fitToViewer,
} from "react-svg-pan-zoom";

import NewMarkerModal from "../../modals/NewMarkerModal";
// import useGenerateId from "../../hooks/util/useGenerateId";

import * as MARKER_DATA from "../../components/Markers";

const INIT_MARKER_VALUES = {
  id: "M0",
  type: "point",
  length: 1,
  width: 1,
  height: 1,
  qty: 1,
  times: 1,
  unit: "meter",
  remarks: "",
};

// const PLAN_1 =
//   "https://media.istockphoto.com/id/1288292255/photo/residential-building-blueprint-plan-real-estate-housing-project-construction-concept.jpg?s=612x612&w=0&k=20&c=Th166PnOqlvPLxRFiysxtgbWR2nWvCvI90-mic6pdH8=";
// const PLAN_2 =
//   "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png";
// const PLAN_3 =
//   "https://qsmigu.deta.dev/data/get/image/7059bd5e/1-EL001.png";

export default function App({
  currentTool,
  currentImage,
  markers,
  setMarkers,
}) {
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_NONE);
  const [value, setValue] = useState(INITIAL_VALUE);

  // const [markers, setMarkers] = useState([]);

  const [isDrawingLine, setIsDrawingLine] = useState(false);
  const [isDrawingRect, setIsDrawingRect] = useState(false);
  const [prevPoint, setPrevPoint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentMarkerData, setCurrentMarkerData] = useState(INITIAL_VALUE);

  // const { generateMarkerId, setLastMarkerId } = useGenerateId();

  useEffect(() => {
    // Viewer.current.fitSelection(0, 0, window.innerWidth, window.innerHeight)
    Viewer.current.fitToViewer();
  }, []);





  const generateMarkerId = () => {
    let lastMarkerId = 0
    if(Object.keys(markers).length > 0) {
      lastMarkerId = Math.max(...Object.keys(markers).map(key => parseInt(key.slice(1))))
    }
    // setLastMarkerId(lastMarkerId + 1);
    return `M${lastMarkerId + 1}`;
  }
  

  const createPointMarker = (id, xC, yC) => {
    return new MARKER_DATA.PointMarker(
      id,
      new MARKER_DATA.Position([{ xC: xC, yC: yC }]),
      new MARKER_DATA.Data(...Object.values(INITIAL_VALUE)),
      "#FFFFFF",
      {width: 80, height: 80}
    ).render();
  };

  const createLineMarker = (id, x1C, y1C, x2C, y2C, strokeColor, strokeWidth) => {
    return new MARKER_DATA.LineMarker(
      id,
      new MARKER_DATA.Position([
        { xC: x1C, yC: y1C },
        { xC: x2C, yC: y2C },
      ]),
      new MARKER_DATA.Data(...Object.values(INITIAL_VALUE)),
      currentTool.color,
      currentTool.strokeSize
    ).render();
  };

  const createAreaMarker = (id, x1C, y1C, x2C, y2C) => {
    return new MARKER_DATA.AreaMarker(
      id,
      new MARKER_DATA.Position([
        { xC: x1C, yC: y1C },
        { xC: x2C, yC: y2C },
      ]),
      new MARKER_DATA.Data(...Object.values(INITIAL_VALUE)),
      "black",
      currentTool.strokeSize,
      currentTool.color
    ).render();
  };

  const handleClick = (event) => {
    switch (currentTool.toolId) {
      case 2:
        // Point Marker Drawing
        const markerId = generateMarkerId();
        setMarkers({
          ...markers,
          [markerId]: {
            data: { ...INIT_MARKER_VALUES, id: markerId, type: "point" },
            figure: createPointMarker(markerId, event.x, event.y),
          },
        });
        currentTool.deselectTool();
        break;
      case 3:
        // Line Drawing
        if (isDrawingLine) {
          const markerId = generateMarkerId();
          setIsDrawingLine(!isDrawingLine);
          setMarkers({
            ...markers,
            [markerId]: {
              data: { ...INIT_MARKER_VALUES, id: markerId, type: "line" },
              figure: createLineMarker(
                markerId,
                event.x,
                event.y,
                prevPoint.x,
                prevPoint.y
              ),
            },
          });
          currentTool.deselectTool();
        } else {
          setIsDrawingLine(!isDrawingLine);
          setPrevPoint({ x: event.x, y: event.y });
        }
        break;
      case 4:
        // Rectangle Drawing
        if (isDrawingRect) {
          const markerId = generateMarkerId();
          setIsDrawingRect(!isDrawingRect);
          setMarkers({
            ...markers,
            [markerId]: {
              data: { ...INIT_MARKER_VALUES, id: markerId, type: "area" },
              figure: createAreaMarker(
                markerId, 
                event.x,
                event.y,
                prevPoint.x,
                prevPoint.y
              ),
            },
          });
          currentTool.deselectTool();
        } else {
          setIsDrawingRect(!isDrawingRect);
          setPrevPoint({ x: event.x, y: event.y });
        }
        break;
      default:
        const clickedMarker = event.originalEvent.target.attributes;
        if (clickedMarker?.id) {
          setIsModalOpen(true)
          setCurrentMarkerData(markers[clickedMarker.id.value].data)
        }
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "black" }}>
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
            <div>
              <ReactSVGPanZoom
                ref={Viewer}
                width={dims.widthW}
                height={dims.heightW}
                tool={tool}
                onChangeTool={setTool}
                value={value}
                onChangeValue={setValue}
                detectAutoPan={false}
                onClick={handleClick}
              >
                <svg viewBox={`0 0 1600 1200`}>
                {/* width={dims.widthW} height={dims.heightW} */}
                  <image
                    // width={dims.widthW}
                    // height={dims.heightW}
                    href={currentImage}
                  />
                  {Object.values(markers).map((value, index) => {
                    return value.figure;
                  })}
                  {/* {markers.map(marker => marker)} */}
                </svg>
              </ReactSVGPanZoom>
              <NewMarkerModal
                openNewMarkerModal={isModalOpen}
                setOpenNewMarkerModal={setIsModalOpen}
                currentMarkerData={currentMarkerData}
                setCurrentMarkerData={setCurrentMarkerData}
                markers={markers}
                setMarkers={setMarkers}
              />
            </div>
          );
        })
      }
    </div>
  );
}
