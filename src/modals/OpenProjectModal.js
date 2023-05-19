import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";

import { BACKEND } from "../constants/endpoints";
import { useAuthContext } from "../hooks/auth/useAuthContext";

const ELEMENT_DICT = {
  'floor': 'EL001',
  'wall': 'EL002',
  'door': 'EL003',
  'window': 'EL004',
  'paint': 'EL005',
  'roof': 'EL006'
}

const OpenProjectModal = ({ openProjectModal, setOpenProjectModal, setProjectAttrs, setExcelUrl, setExcelFilename }) => {
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

  const { user } = useAuthContext()

  // useEffect(() => {
  //   getAllProjects();
  // }, []);

  useEffect(() => {
    user && getAllProjects();
  }, [openProjectModal, user])

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
      .get(`${BACKEND}data/all/project?user_id=${user.id}`)
      .then((res) => {
        if(res.status === 200){
          const responseData = res.data;
          const [response, statusCode] = responseData;
          if(statusCode===404){
            console.log("No Projects Found For The User, Status Code 404", responseData);
            setProjectList([])
          } else {
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
          }
        } else {
          console.log("No Projects Found For The User", res);
          setProjectList([])
        }
        
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

                      setExcelUrl(`${BACKEND}data/get/excel?project_id=${selectedProject.id}&level=${selectedLevel.id}&element_id=${selectedElement.id}`)
                      setExcelFilename(`${selectedProject.title}_${selectedLevel.id}_${selectedElement.title}.xlsx`)

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
