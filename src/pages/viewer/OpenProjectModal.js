import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import Dropdown from "../../components/Dropdown";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const projects = [
  { id: 1, title: "project 1" },
  { id: 2, title: "project 2" },
  { id: 3, title: "project 3" },
  { id: 4, title: "project 4" },
  { id: 5, title: "project 5" },
];

const levels = [
  { id: 1, title: "level 1" },
  { id: 2, title: "level 2" },
  { id: 3, title: "level 3" },
  { id: 4, title: "level 4" },
  { id: 5, title: "level 5" },
];

const elements = [
  { id: 1, title: "element 1" },
  { id: 2, title: "element 2" },
  { id: 3, title: "element 3" },
  { id: 4, title: "element 4" },
  { id: 5, title: "element 5" },
];

const OpenProjectModal = ({ openProjectModal, setOpenProjectModal }) => {
  const [selected, setSelected] = useState(people[0]);

  const [selectedProjectName, setSelectedProjectName] = useState(projects[0]);
  const [selectedLevelNumber, setSelectedLevelNumber] = useState(levels[0]);
  const [selectedElement, setSelectedElement] = useState(elements[0]);

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
                            selected={selectedProjectName}
                            setSelected={setSelectedProjectName}
                            items={projects}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Level number
                        </div>
                        <div className=" col-span-2">
                          <Dropdown
                            selected={selectedLevelNumber}
                            setSelected={setSelectedLevelNumber}
                            items={levels}
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
                            items={elements}
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
                  "
                    onClick={() => setOpenProjectModal(false)}
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
