import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";

import { BACKEND } from "../../constants/endpoints";

const projectDetails = [
  {
    id: 1,
    title: "project 1",
    levels: [
      {
        id: 11,
        title: "level 11",
        elements: [
          { id: 111, title: "element 111" },
          { id: 112, title: "element 112" },
          { id: 113, title: "element 113" },
          { id: 114, title: "element 114" },
        ],
      },
      {
        id: 12,
        title: "level 12",
        elements: [
          { id: 121, title: "element 121" },
          { id: 122, title: "element 122" },
          { id: 123, title: "element 123" },
          { id: 124, title: "element 124" },
        ],
      },
      {
        id: 13,
        title: "level 13",
        elements: [
          { id: 131, title: "element 131" },
          { id: 132, title: "element 132" },
          { id: 133, title: "element 133" },
          { id: 134, title: "element 134" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "project 2",
    levels: [
      {
        id: 21,
        title: "level 21",
        elements: [
          { id: 211, title: "element 211" },
          { id: 212, title: "element 212" },
          { id: 213, title: "element 213" },
          { id: 214, title: "element 214" },
        ],
      },
      {
        id: 22,
        title: "level 22",
        elements: [
          { id: 221, title: "element 221" },
          { id: 222, title: "element 222" },
          { id: 223, title: "element 223" },
          { id: 224, title: "element 224" },
        ],
      },
      {
        id: 23,
        title: "level 23",
        elements: [
          { id: 231, title: "element 231" },
          { id: 232, title: "element 232" },
          { id: 233, title: "element 233" },
          { id: 234, title: "element 234" },
        ],
      },
    ],
  },
];

const ELEMENT_DICT = {
  'floor': 'EL001',
  'wall': 'EL002',
  'door': 'EL003',
  'window': 'EL004',
  'paint': 'EL005',
  'roof': 'EL006'
}

const OpenProjectModal = ({ openProjectModal, setOpenProjectModal, setProjectAttrs }) => {
  // const [selectedProjectName, setSelectedProjectName] = useState(
  //   projectDetails[0]
  // );
  // const [selectedLevelNumber, setSelectedLevelNumber] = useState(
  //   selectedProjectName.levels[0]
  // );
  // const [selectedElement, setSelectedElement] = useState(
  //   selectedLevelNumber.elements[0]
  // );

  // New Variables
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({
    id: 1,
    title: "Select a Project",
  });
  const [levelList, setLevelList] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState({
    id: 1,
    title: "Select a Level",
  });
  const [elementList, setElementList] = useState([]);
  const [selectedElement, setSelectedElement] = useState({
    id: 1,
    title: "Select an Element",
  });

  // useEffect(() => {
  //   getAllProjects();
  // }, []);

  useEffect(() => {
    getAllProjects();
  }, [openProjectModal])

  useEffect(() => {
    setLevelAndElements();
  }, [selectedProject]);

  // {
  //   "description": "This is a Test Project",
  //   "elements": [
  //     "floor",
  //     "wall"
  //   ],
  //   "id": "7059bd5e",
  //   "key": "a5djnopw29u6",
  //   "name": "Test Project 1",
  //   "num_levels": 2
  // },

  const getAllProjects = async () => {
    await axios
      .get(`${BACKEND}data/all/project`)
      .then((res) => {
        const responseData = res.data;
        const projectsWithTitle = responseData.map((project) => ({
          ...project,
          title: project.name,
        }));
        const sortedProjects = projectsWithTitle.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
        setProjectList(sortedProjects);
      })
      .catch((error) => {
        console.log("Some Error Occured While Fetching Project List", error);
        // console.log(error.errorCode, error.errorMessage)
      });
  };

  const setLevelAndElements = () => {
    if (selectedProject.id === 1) {
      return;
    } else {
      const numLevels = Number(selectedProject?.num_levels) || 0;
      const levels = Array.from({ length: numLevels }, (_, i) => ({
        id: i + 1,
        title: (i + 1).toString(),
      }));
      setLevelList(levels);

      // if (selectedProject.id === 1 || selectedLevel.id === 1) {
      //   return;
      // } else {
        const elements = selectedProject.elements.map((title) => {
          const elem_id = ELEMENT_DICT[title]
          return {id: elem_id, title: title}
        })
        setElementList(elements);
      // }
    }
  };



  return (
    <div>
      <Transition.Root show={openProjectModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpenProjectModal}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block md:min-w-max md:max-w-4xl md:w-2/5 bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl align-middle transform transition-all sm:my-8 sm:p-6 dark:bg-secondary-gray600">
                <div>
                  <div className="mt-1 text-center sm:mt-3">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                    >
                      Open Project
                    </Dialog.Title>

                    <div className="gap-4 my-10">
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Project name
                        </div>
                        <div className=" col-span-2">
                          <Dropdown
                            selected={selectedProject}
                            setSelected={setSelectedProject}
                            items={projectList}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Level number
                        </div>
                        <div className=" col-span-2">
                          <Dropdown
                            selected={selectedLevel}
                            setSelected={setSelectedLevel}
                            items={levelList}
                          />
                        </div>
                      </div>

                      <div className=" grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Elements
                        </div>

                        <div className="col-span-2 w-full">
                          <Dropdown
                            selected={selectedElement}
                            setSelected={setSelectedElement}
                            items={elementList}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 
                  bg-primary-yellow200 font-medium text-white hover:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow200 text-sm md:text-base
                  dark:bg-primary-yellow200 dark:text-gray-800 dark:font-bold dark:hover:bg-yellow-500 dark:hover:text-gray-900 dark:tracking-wide dark:focus:ring-primary-yellow200
                  dark:ring-offset-secondary-gray500
                  "
                    onClick={() => {
                      setProjectAttrs({project_id: selectedProject.id, level: selectedLevel, element_id: selectedElement})
                      setOpenProjectModal(false)
                    }}
                  >
                    Open
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default OpenProjectModal;
