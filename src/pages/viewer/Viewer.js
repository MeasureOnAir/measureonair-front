import React, { useEffect, useState } from "react";
import { CursorArrowRaysIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { FaMousePointer } from "react-icons/fa";
import { BsSlashLg } from "react-icons/bs";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { IoColorPaletteOutline } from "react-icons/io5";
import { TbRectangle, TbMinusVertical } from "react-icons/tb";
import { CirclePicker } from "react-color";

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

const Viewer = () => {
  const [projectName, setProjectName] = useState(
    "Cool Structures jkdjfkdf endabcdefgh"
  );
  const [projectNameCompressed, setProjectNameCompressed] = useState("");
  const [rangeValue, setRangeValue] = useState(20);
  const [isLineClicked, setIsLineClicked] = useState(false);
  const [isMapPinClicked, setIsMapPinClicked] = useState(false);
  const [isCurserClicked, setIsCurserClicked] = useState(false);
  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const [clickedItem, setClickedItem] = useState(
    localStorage.getItem("clickedItem")
  );
  const [selectedColor, setSelectedColor] = useState("");
  const [isColorPickerClicked, setIsColorPickerClicked] = useState(false);
  const [isProjectNameHover, setIsProjectNameHover] = useState(false);

  // check the length of project name
  useEffect(() => {
    console.log(projectName.length);
    if (projectName.length > 32) {
      const str = projectName;
      const modStr = str.slice(0, 31) + " ...";
      console.log(modStr);

      setProjectNameCompressed(modStr);
    } else {
      setProjectNameCompressed(projectName);
    }
  }, []);

  const onItemClick = (item) => {
    setClickedItem(item.name);
    localStorage.setItem("clickedItem", item.name);

    if (item.name == "mapPin") {
      setIsMapPinClicked(true);
      setIsLineClicked(false);
      setIsBoxClicked(false);
    } else if (item.name == "slash") {
      setIsLineClicked(true);
      setIsBoxClicked(false);
      setIsMapPinClicked(false);
    } else if (item.name == "rectangle") {
      setIsBoxClicked(true);
      setIsLineClicked(false);
      setIsMapPinClicked(false);
    } else {
      setIsBoxClicked(false);
      setIsLineClicked(false);
      setIsMapPinClicked(false);
    }
  };

  const onProjectNameHover = () => {
    console.log(projectName);
  };

  return (
    <div className="mt-16">
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
                    clickedItem == item.name
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
            <div className="md:hidden grid grid-cols-3 items-center justify-between">
              <div className="flex ml-3 gap-x-4 w-full justify-start">
                <div>
                  <IoIosUndo className="h-6 w-6 text-yellow-900 dark:text-gray-200" />
                </div>
                <div>
                  <IoIosRedo className="h-6 w-6 text-yellow-900 dark:text-gray-200" />
                </div>
              </div>
              <div className="grid col-span-2 justify-end sm:mr-4 mr-2 py-1 dark:text-gray-200 ">
                {projectNameCompressed}
              </div>
            </div>

            <div className="hidden relative md:inline-flex py-1 justify-center dark:text-gray-200">
              <div
                onMouseOver={() => setIsProjectNameHover(true)}
                onMouseOut={() => setIsProjectNameHover(false)}
              >
                {projectNameCompressed}
              </div>
            </div>

            {/* {isProjectNameHover && (
                <div className="origin absolute z-50 bg-red-400"> 
                  called
                </div>
              )} */}
          </div>

          {/* third grid */}
          <div className="hidden md:grid justify-center items-center mb-1 mt-1">
            {isLineClicked && (
              <div className="flex gap-x-3 items-center">
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
              <div className="flex gap-x-3 items-center">
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

            {isMapPinClicked && (
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
                  <div className="absolute origin-top-right top-28 p-3 rounded-lg dark:bg-secondary-gray700">
                    <CirclePicker
                      onChange={(color, event) => setSelectedColor(color.hex)}
                      onChangeComplete={() => setIsColorPickerClicked(false)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* toolbar - end */}
      {/* bottom toolbar - mobile view - start*/}
      <div className="absolute bottom-0 w-full md:hidden bg-primary-yellow2_400  dark:bg-secondary-gray500 py-1">
        <div className="grid grid-cols-2 px-2 items-center">
          {/* first grid */}
          <div className="inline-flex gap-x-2">
            {toolbarIcons.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className={classNames(
                    clickedItem == item.name
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
            {isMapPinClicked && (
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
                  <div className="absolute origin-bottom bottom-11 p-3 rounded-lg dark:bg-secondary-gray700">
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
            {isBoxClicked && (
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
          </div>
        </div>
      </div>

      {/* bottom toolbar - mobile view - end*/}

      <div className="">
        <div className="lg:max-w-7xl m-auto">Viewer</div>
      </div>
    </div>
  );
};

export default Viewer;
