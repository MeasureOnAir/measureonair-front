import React, { useEffect, useState } from "react";
import { CursorArrowRaysIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { FaMousePointer } from "react-icons/fa";
import { BsSlashLg } from "react-icons/bs";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { IoColorPaletteOutline } from "react-icons/io5";
import { TbRectangle, TbMinusVertical } from "react-icons/tb";
import { CirclePicker } from "react-color";

import ImageViewSVG from "../../views/ImageViewSVG";
import EmptyView from "../../views/EmptyView";
import InitView from "../../views/InitView";
import OpenProjectModal from "../../modals/OpenProjectModal";
import axios from "axios";
import { BACKEND } from "../../constants/endpoints";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let toolbarIcons = [
  {
    id: 1,
    name: "mousePointer",
    icon: <FaMousePointer className="h-4 w-4 md:h-5 md:w-5" />,
    clicked: false,
  },
  {
    id: 2,
    name: "mapPin",
    icon: <MapPinIcon className="h-5 w-5 md:h-6 md:w-6" />,
    clicked: false,
  },
  {
    id: 3,
    name: "slash",
    icon: <BsSlashLg className="h-4 w-4 md:h-5 md:w-5" />,
    clicked: false,
  },
  {
    id: 4,
    name: "rectangle",
    icon: <TbRectangle className="h-5 w-5 md:h-6 md:w-6" />,
    clicked: false,
  },
];

const Viewer = ({
  projectName,
  setProjectName,
  projectAttrs,
  setProjectAttrs,
  markers,
  setMarkers,
  setExcelUrl,
  setExcelFilename
}) => {
  const [projectNameCompressed, setProjectNameCompressed] = useState("");
  const [rangeValue, setRangeValue] = useState(5);
  const [isLineClicked, setIsLineClicked] = useState(false);
  const [isMapPinClicked, setIsMapPinClicked] = useState(false);
  const [isCurserClicked, setIsCurserClicked] = useState(false);
  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const [clickedItem, setClickedItem] = useState(
    localStorage.getItem("clickedItem")
  );
  const [selectedColor, setSelectedColor] = useState("red");
  const [isColorPickerClicked, setIsColorPickerClicked] = useState(false);
  const [isProjectNameHover, setIsProjectNameHover] = useState(false);

  // const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isImageAvailable, setIsImageAvailable] = useState(true);
  const [currentImage, setCurrentImage] = useState("");

  const [openProjectModal, setOpenProjectModal] = useState(false);
  // const [projectAttrs, setProjectAttrs] = useState({project_id: 1, level: 1, element_id: 1})
  const [projectData, setProjectData] = useState(null);
  const [unitData, setUnitData] = useState(null);

  const [displayProjectName, setDisplayProjectName] = useState(
    "Open a Project to Start Working"
  );

  // check the length of project name
  useEffect(() => {
    if (projectName.length > 32) {
      const str = projectName;
      const modStr = str.slice(0, 31) + " ...";
      setProjectNameCompressed(modStr);
    } else {
      setProjectNameCompressed(projectName);
    }
  }, []);

  useEffect(() => {
    getProject();
    (async function loadAPIData() {
      await loadMarkers()
    })();
  }, [projectAttrs]);


  useEffect(() => {
    // Save markers on Database each time marker value changes
    Object.keys(markers).length > 0 && saveMarkers()
  }, [markers])
  

  // id: marker.data.id,
  // type: marker.data.type,
  // size: {height: imageData.props?.height, width: imageData.props?.width},
  // fill: imageData.props?.fill,
  // stroke: imageData.props?.stroke,
  // strokeWidth: imageData.props?.strokeWidth || 2,
  // position


  const createPointMarker = (id, xC, yC, size) => {
    return new MARKER_DATA.PointMarker(
      id,
      new MARKER_DATA.Position([{ xC: xC, yC: yC }]),
      new MARKER_DATA.Data(...Object.values(INIT_MARKER_VALUES)),
      "#FFFFFF",
      size,
    ).render();
  };

  const createLineMarker = (id, x1C, y1C, x2C, y2C, color, strokeWidth) => {
    return new MARKER_DATA.LineMarker(
      id,
      new MARKER_DATA.Position([
        { xC: x1C, yC: y1C },
        { xC: x2C, yC: y2C },
      ]),
      new MARKER_DATA.Data(...Object.values(INIT_MARKER_VALUES)),
      color,
      strokeWidth
    ).render();
  };

  const createAreaMarker = (id, x1C, y1C, x2C, y2C, strokeWidth, color) => {
    return new MARKER_DATA.AreaMarker(
      id,
      new MARKER_DATA.Position([
        { xC: x1C, yC: y1C },
        { xC: x2C, yC: y2C },
      ]),
      new MARKER_DATA.Data(...Object.values(INIT_MARKER_VALUES)),
      "black",
      strokeWidth,
      color
    ).render();
  };

  const onItemClick = (item) => {
    setClickedItem(item.name);
    // localStorage.setItem("clickedItem", item.name);

    if (item.name === "mapPin") {
      setIsMapPinClicked(true);
      setIsLineClicked(false);
      setIsBoxClicked(false);
    } else if (item.name === "slash") {
      setIsLineClicked(true);
      setIsBoxClicked(false);
      setIsMapPinClicked(false);
    } else if (item.name === "rectangle") {
      setIsBoxClicked(true);
      setIsLineClicked(false);
      setIsMapPinClicked(false);
    } else {
      setIsBoxClicked(false);
      setIsLineClicked(false);
      setIsMapPinClicked(false);
    }
  };

  const deselectTool = () => {
    setIsBoxClicked(false);
    setIsLineClicked(false);
    setIsMapPinClicked(false);
    setClickedItem({
      id: 1,
      name: "mousePointer",
      icon: <FaMousePointer className="h-4 w-4 md:h-5 md:w-5" />,
      clicked: true,
    });
  };

  const loadMarkers = async () => {
    if(projectAttrs.project_id===1) return
    await axios.get(
      `${BACKEND}data/get/markers?project_id=${projectAttrs.project_id}&level=${projectAttrs.level.id}&element=${projectAttrs.element_id.id}`
    ).then(
      response => {
        const resMarkers = response.data?.markers
        const newMarkers = {};
        for (const key in resMarkers) {
          if (Object.hasOwnProperty.call(resMarkers, key)) {
            const marker = resMarkers[key];
            const figure = marker.figure
            let drawing = {}

            // const winWidth = window.innerWidth
            // const winHeight = window.innerHeight

            switch(marker.data.type){
              case 'point':
                drawing = createPointMarker(marker.data.id, (figure.position[0].xC + figure.size.width/2), (figure.position[0].yC + figure.size.height/2), {width: figure.size.width, height: figure.size.height})
                break
              case 'line':
                drawing = createLineMarker(marker.data.id, figure.position[1].xC, figure.position[1].yC, figure.position[2].xC, figure.position[2].yC, figure.stroke, figure.strokeWidth)
                break
              case 'area':
                drawing = createAreaMarker(marker.data.id, figure.position[0].xC, figure.position[0].yC, figure.position[0].xC+figure.size.width, figure.position[0].yC+figure.size.height, figure.strokeWidth, figure.fill)
                break
              default:
                console.log('Unknown Marker')
            }

            newMarkers[key] = {
              ...marker,
              figure: drawing
            }
          }
        }
        setMarkers(newMarkers)
        return newMarkers;
      }
    ).catch(error => console.log(error))
  };

  const saveMarkers = (event) => {
    // create a new object with the same structure, but with the 'figure' properties replaced
    const newMarkers = {};
    for (const key in markers) {
      if (Object.hasOwnProperty.call(markers, key)) {
        const marker = markers[key];
        const imageData = marker.figure
        // const winWidth = window.innerWidth
        // const winHeight = window.innerHeight
        newMarkers[key] = {
          ...marker,
          figure: {
            id: marker.data.id,
            type: marker.data.type,
            size: {height: imageData.props?.height, width: imageData.props?.width},
            fill: imageData.props?.fill,
            stroke: imageData.props?.stroke,
            strokeWidth: imageData.props?.strokeWidth || 2,
            position: [{xC: (imageData.props?.x || 0), yC: (imageData.props?.y || 0)}, {xC: (imageData.props?.x1 || 0), yC: (imageData.props?.y1 || 0)}, {xC: (imageData.props?.x2 || 0), yC: (imageData.props?.y2 || 0)}],
            viewPort: {width: window.innerWidth, height: window.innerHeight}
            // position: [{xC: (imageData.props?.x || 0)/winWidth, yC: (imageData.props?.y || 0)/winHeight}, {xC: (imageData.props?.x1 || 0)/winWidth, yC: (imageData.props?.y1 || 0)/winHeight}, {xC: (imageData.props?.x2 || 0)/winWidth, yC: (imageData.props?.y2 || 0)/winHeight}]
          }
        };
      }
    }
    const reqBody = {
      project_id: projectAttrs.project_id,
      level: projectAttrs?.level.id,
      element: projectAttrs?.element_id.id,
      markers: newMarkers,
    };

    axios
      .post(`${BACKEND}data/add/markers`, reqBody)
      .then((response) => {
        console.log("Markers Added")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const createToolObj = () => {
    return {
      toolId: isMapPinClicked ? 2 : isLineClicked ? 3 : isBoxClicked ? 4 : 1,
      color: selectedColor,
      strokeSize: rangeValue,
      deselectTool: deselectTool,
      // deselectTool: isMapPinClicked
      // ? setIsMapPinClicked
      // : isLineClicked
      // ? setIsLineClicked
      // : isBoxClicked
      // ? setIsBoxClicked
      // : setIsCurserClicked
    };
  };

  const isReloadViewer = () => {
    getProject();
  };

  const getProject = async () => {
    if (projectAttrs.project_id === 1) {
      return;
    } else {
      await axios
        .get(`${BACKEND}data/get/project?project_id=${projectAttrs.project_id}`)
        .then((res) => {
          const responseData = res.data;
          setProjectData(responseData);
          setDisplayProjectName(
            `${responseData?.project_meta?.name} / ${projectAttrs?.level.id} / ${projectAttrs?.element_id.title}`
          );
          const level = responseData?.levels[projectAttrs?.level.id];
          const element = level?.elements[projectAttrs?.element_id.id];
          if (element?.image !== null) {
            setIsImageAvailable(true);
            setCurrentImage(
              `${BACKEND}data/get/image/${projectAttrs.project_id}/${element.image.name}`
            );
            console.log(
              `${BACKEND}data/get/image/${projectAttrs.project_id}/${element.image.name}`
            );
          } else {
            setIsImageAvailable(false);
          }

          setUnitData(element);
        })
        .catch((error) => {
          console.log("Some Error Occured While Fetching Project Data", error);
          // console.log(error.errorCode, error.errorMessage)
        });
    }
  };

  return (
    <div className="mt-16">
      {/* <button onClick={() => saveMarkers()}>TEST</button> */}
      {/* toolbar - start */}
      <div className="bg-primary-yellow2_400 dark:bg-secondary-gray500">
        <div className="lg:max-w-7xl m-auto w-full md:px-10 px-2 md:grid md:grid-cols-3">
          {/* first grid */}
          <div className="hidden py-1 md:inline-flex space-x-2 sm:space-x-4 lg:space-x-4 items-center ">
            {toolbarIcons.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className={classNames(
                    clickedItem === item.name
                      ? "ring-1 ring-yellow-600 bg-gray-200 text-yellow-700 dark:bg-primary-yellow200 dark:text-gray-700 dark:ring-gray-800"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600",
                    "p-1 rounded-md dark:text-gray-200"
                  )}
                  onClick={() => {
                    onItemClick(item);
                  }}
                >
                  {item.icon}
                </div>
              );
            })}

            <div className="grid justify-center items-center">
              <TbMinusVertical className="h-7 w-7 text-yellow-700 font-thin text-sm dark:text-gray-500" />
            </div>

            <div>
              <IoIosUndo className="h-6 w-6 text-yellow-900 dark:text-gray-200" />
            </div>
            <div>
              <IoIosRedo className="h-6 w-6 text-yellow-900 dark:text-gray-200" />
            </div>
          </div>

          {/* second grid */}
          <div className="grid items-center">
            <div className="md:hidden grid grid-cols-3 py-1 items-center justify-between">
              <div className="flex ml-3 gap-x-4 w-full justify-start">
                <div>
                  <IoIosUndo className="h-6 w-6 text-yellow-900 dark:text-gray-200" />
                </div>
                <div>
                  <IoIosRedo className="h-6 w-6 text-yellow-900 dark:text-gray-200" />
                </div>
              </div>
              <div className="hidden md:grid col-span-2 justify-end sm:mr-4 mr-2 py-1 dark:text-gray-200 ">
                {displayProjectName}
              </div>
            </div>

            <div className="hidden relative md:inline-flex py-1 justify-center dark:text-gray-200">
              <div
                onMouseOver={() => setIsProjectNameHover(true)}
                onMouseOut={() => setIsProjectNameHover(false)}
              >
                {displayProjectName}
              </div>
            </div>

            {/* {isProjectNameHover && (
                <div className="origin absolute z-50 bg-red-400"> 
                  called
                </div>
              )} */}
          </div>

          {/* third grid */}
          <div className="hidden md:flex lg:flex justify-center items-center mb-1 mt-1 ">
            {/* <div className="hidden flex flex-row md:grid justify-center items-center mb-1 mt-1"> */}
            {isLineClicked && (
              <div className="flex gap-x-3 items-center mr-1">
                <label
                  for="default-range"
                  className="block mb-0 text-xs font-medium text-gray-900 dark:text-gray-300"
                >
                  Size
                </label>
                <input
                  id="default-range"
                  type="range"
                  value={rangeValue}
                  className="w-36 h-1 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-400 accent-primary-yellow200"
                  onChange={(e) => setRangeValue(e.target.value)}
                />
              </div>
            )}
            {isBoxClicked && (
              <div className="flex gap-x-3 items-center mr-1">
                <label
                  for="default-range"
                  className="block mb-0 text-xs font-medium text-gray-900 dark:text-gray-300"
                >
                  Size
                </label>
                <input
                  id="default-range"
                  type="range"
                  value={rangeValue}
                  className="w-36 h-1 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-400 accent-primary-yellow200"
                  onChange={(e) => setRangeValue(e.target.value)}
                />
              </div>
            )}

            {(isMapPinClicked || isLineClicked || isBoxClicked) && (
              <div className="flex">
                <div className="flex">
                  {selectedColor.length > 0 ? (
                    <TbRectangle
                      color={selectedColor}
                      fill={selectedColor}
                      className="h-7 w-7"
                      onClick={() => setIsColorPickerClicked((prev) => !prev)}
                    />
                  ) : (
                    <IoColorPaletteOutline
                      className="w-6 h-6 text-gray-300"
                      onClick={() => setIsColorPickerClicked((prev) => !prev)}
                    />
                  )}
                </div>

                {isColorPickerClicked && (
                  <div className="absolute origin-top right-5 top-28 p-3 rounded-lg dark:bg-secondary-gray700 z-30">
                    {/* <div className="absolute origin-top dark:bg-secondary-gray700"> */}
                    <CirclePicker
                      onChange={(color, event) => setSelectedColor(color.hex)}
                      onChangeComplete={() => setIsColorPickerClicked(false)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* toolbar - end */}
      {/* bottom toolbar - mobile view - start*/}
      {/* <div className="absolute bottom-0 w-full md:hidden bg-primary-yellow2_400  dark:bg-secondary-gray500 py-1"> */}
      <div className="absolute bottom-0 w-full md:hidden bg-primary-yellow2_400  dark:bg-secondary-gray500 py-1">
        <div className="grid grid-cols-2 px-2 items-center">
          {/* first grid */}
          <div className="inline-flex gap-x-2">
            {toolbarIcons.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className={classNames(
                    clickedItem === item.name
                      ? "ring-1 ring-yellow-600 bg-gray-200 text-yellow-700 dark:bg-primary-yellow200 dark:text-gray-700 dark:ring-gray-800"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600",
                    "p-1 rounded-md dark:text-gray-200"
                  )}
                  onClick={() => {
                    onItemClick(item);
                  }}
                >
                  {item.icon}
                </div>
              );
            })}
          </div>

          {/* second grid */}
          <div className="flex justify-end items-center mr-4">
            {(isMapPinClicked || isLineClicked || isBoxClicked) && (
              <>
                <div className="flex">
                  {selectedColor.length > 0 ? (
                    <TbRectangle
                      color={selectedColor}
                      fill={selectedColor}
                      className="h-7 w-7"
                      onClick={() => setIsColorPickerClicked((prev) => !prev)}
                    />
                  ) : (
                    <IoColorPaletteOutline
                      className="w-6 h-6 text-gray-300"
                      onClick={() => setIsColorPickerClicked((prev) => !prev)}
                    />
                  )}
                </div>

                {isColorPickerClicked && (
                  <div className="absolute origin-bottom bottom-11 p-3 rounded-lg dark:bg-secondary-gray700 z-30">
                    {/* <div className="absolute origin-top dark:bg-secondary-gray700"> */}
                    <CirclePicker
                      onChange={(color, event) => setSelectedColor(color.hex)}
                      onChangeComplete={() => setIsColorPickerClicked(false)}
                    />
                  </div>
                )}
              </>
            )}

            {isLineClicked && (
              <div className="">
                <input
                  id="default-range"
                  type="range"
                  value={rangeValue}
                  className="w-36 h-1 flex justify-center items-center bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-400 accent-primary-yellow200"
                  onChange={(e) => setRangeValue(e.target.value)}
                />
              </div>
            )}
            {/* {isBoxClicked && (
              <div className="">
                <input
                  id="default-range"
                  type="range"
                  value={rangeValue}
                  className="w-36 h-1 flex justify-center items-center bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-400 accent-primary-yellow200"
                  onChange={(e) => setRangeValue(e.target.value)}
                />
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* bottom toolbar - mobile view - end*/}
      {/* <div className="m-auto">
        <ImageView toolData={currentTool} projectData={{}}/>
      </div> */}
      {projectData ? (
        isImageAvailable ? (
          <ImageViewSVG
            currentTool={createToolObj()}
            currentImage={currentImage}
            markers={markers}
            setMarkers={setMarkers}
          />
        ) : (
          <EmptyView
            project_id={projectAttrs.project_id}
            level={projectAttrs.level.id}
            element_id={projectAttrs.element_id.id}
            isReloadViewer={isReloadViewer}
          />
        )
      ) : (
        <InitView setOpenProjectModal={setOpenProjectModal} />
      )}

      {/* Modals */}
      <OpenProjectModal
        openProjectModal={openProjectModal}
        setOpenProjectModal={setOpenProjectModal}
        setProjectAttrs={setProjectAttrs}
        setExcelUrl={setExcelUrl}
        setExcelFilename={setExcelFilename}
      />
    </div>
  );
};

export default Viewer;
