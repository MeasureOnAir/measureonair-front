import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useRef, useState } from "react";
import useCreateProject from "../../hooks/api/useCreateProject";

const elements = [
  { id: "EL001", title: "floor" },
  { id: "EL002", title: "wall" },
  { id: "EL003", title: "door" },
  { id: "EL004", title: "window" },
  { id: "EL005", title: "paint" },
  { id: "EL006", title: "roof" },
];

const NewProjectModal = ({ openNewProjectModal, setOpenNewProjectModal }) => {
  const [creatProject, isLoading, error, success] = useCreateProject();
  const [selectedElements, setSelectedElements] = useState([]);

  const project_name = useRef(null);
  const project_details = useRef(null);
  const num_floors = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await creatProject(
      project_name.current.value,
      project_details.current.value,
      num_floors.current.value,
      selectedElements.map((x) => x.title)
    );
    console.log(data);

    // if (success) {
    //   alert("Project Created Successfully!")
    //   setSelectedElements([]);
    //   setOpenNewProjectModal(false)
    // } else {
    //   alert(`Error: ${error}`)
    // }

    // {error && <p>Error: {error}</p>}
    // {success && <p>Project Created Successfully!</p>}
    
    setSelectedElements([])
    setOpenNewProjectModal(false)


  };

  return (
    <div>
      <Transition.Root show={openNewProjectModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpenNewProjectModal}
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
                      New Project
                    </Dialog.Title>

                    <div className="gap-4 my-10">
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Project name
                        </div>
                        <div className=" col-span-2">
                          <input
                            ref={project_name}
                            type="text"
                            placeholder="Name . . ."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-200 focus:outline  focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                            name="project_name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Project details
                        </div>
                        <div className=" col-span-2">
                          <input
                            ref={project_details}
                            type="text"
                            placeholder="Details . . ."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                      <div className=" grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Number of floors
                        </div>
                        <div className=" col-span-2">
                          <input
                            ref={num_floors}
                            type="number"
                            placeholder="Floors . . ."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>

                      <div className=" grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Elements
                        </div>

                        {/*dropdown - start */}
                        <div className="col-span-2 w-full">
                          <Listbox
                            value={selectedElements}
                            onChange={setSelectedElements}
                            multiple
                          >
                            <div className="relative mt-1">
                              <Listbox.Button
                                className="relative w-full cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left shadow-md focus:outline-none 
                               border border-gray-200 dark:border-gray-600
                              text-sm focus:ring-1 ring-primary-yellow200 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:ring-primary-yellow200"
                              >
                                <span className="block truncate">
                                  {selectedElements.length > 0 ? (
                                    <>
                                      {selectedElements
                                        .map((element) => element.title)
                                        .join(", ")}
                                    </>
                                  ) : (
                                    <div>Select</div>
                                  )}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options
                                  className="absolute mt-1 max-h-24 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1
                                 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-xs scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-200
                                 dark:bg-secondary-gray500 dark:scrollbar-track-secondary-gray500 dark:scrollbar-thumb-secondary-gray700
                                 "
                                >
                                  {elements.map((element, personIdx) => (
                                    <Listbox.Option
                                      key={personIdx}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-6 ${
                                          active
                                            ? "bg-amber-100 text-amber-900 dark:bg-secondary-gray600 dark:text-gray-100"
                                            : "text-gray-900 dark:text-gray-300"
                                        }`
                                      }
                                      value={element}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              (selected
                                                ? "font-medium"
                                                : "font-normal",
                                              "flex justify-end right-0")
                                            }`}
                                          >
                                            {element.title}
                                          </span>
                                          {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-primary-yellow200">
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>

                        {/*dropdown - end */}
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
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? "Creating..." : "Create"}
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

export default NewProjectModal;
