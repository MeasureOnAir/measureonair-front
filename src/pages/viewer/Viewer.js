import React from "react";
import { CursorArrowRaysIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { FaMousePointer } from "react-icons/fa";
import { BsSlashLg } from "react-icons/bs";

const Viewer = () => {
  return (
    <div className="mt-16">
      {/* toolbar - start */}
      <div className="bg-primary-yellow2_400 dark:bg-secondary-gray500">
        <div className="lg:max-w-7xl m-auto px-10 ">
          <div className="py-1 inline-flex space-x-4 sm:space-x-6 lg:space-x-8 items-center ">
            <div className="hover:bg-gray-100 p-1 rounded-md">
              <FaMousePointer className="h-5 w-5 md:h-6 md:w-6 text-yellow-900 dark:text-gray-200" />
            </div>
            <div className="hover:bg-gray-100 p-1 rounded-md">
              <MapPinIcon className="h-6 w-6 md:h-7 md:w-7 text-yellow-900 dark:text-gray-200" />
            </div>
            <div className="hover:bg-gray-100 p-1 rounded-md">
                <BsSlashLg className="h-5 w-5 md:h-6 md:w-6 text-yellow-900 dark:text-gray-200"/>
            </div>
          </div>
        </div>
      </div>
      {/* toolbar - end */}

      <div className="">
        <div className="lg:max-w-7xl m-auto">Viewer</div>
      </div>
    </div>
  );
};

export default Viewer;
