import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/auth/useAuthContext";
import axios from "axios";
import { BACKEND } from "../constants/endpoints";
import Dropdown from "../components/Dropdown";
import useUser from "../hooks/api/useUser";

const ShareProjectModal = ({ openShareProjectModal, setShareProjectModal }) => {
  const [createUser,
    getUser,
    getUsers,
    addProject,
    removeProject,
    isLoading,
    error,
    success
  ] = useUser();
  
  // const isLoading = false;
  // const error = "";
  // const success = false;

  const otherUserEmail = useRef(null);

  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({
    id: 1,
    title: "Select a Project",
  });

  const [userList, setUserList] = useState([])

  const { user } = useAuthContext()

  useEffect(() => {
    getAllUsers();
    user && getAllProjects();
  }, [openShareProjectModal, user])

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
            const resTmp =  statusCode === 200 ? response : responseData
            const projectsWithTitle = resTmp.map((project) => ({
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

  const getAllUsers = async () => {
    await axios
      .get(`${BACKEND}user/all`)
      .then((res) => {
        if(res.status === 200){
          setUserList(res.data)
        } else {
          console.log("No Projects Found For The User", res);
          setUserList([])
        }
      })
      .catch((error) => {
        console.log("Some Error Occured While Fetching Project List", error);
        // console.log(error.errorCode, error.errorMessage)
      });
  };

  const getUserByEmail = (email) => {
    const matchingObject = userList.find(obj => obj.email === email);
    if (matchingObject) {
      return [true, matchingObject.id];
    } else {
      return [false, "No User found for the given Email."];
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(otherUserEmail.current.value.length > 0){
      const [isFound, userId] = getUserByEmail(otherUserEmail.current.value)
      if (isFound){
          addProject(userId, selectedProject.id)
          setShareProjectModal(false)
          alert("Project Shared Successfully!")
      } else {
        alert("The User for the Corresponding Email Not Found!")
      }
      
    } else {
      alert("Enter An Email Address To Share")
    }
    
  };

  return (
    <div>
      <Transition.Root show={openShareProjectModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setShareProjectModal}
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
                      Share Project
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
                          User Email
                        </div>
                        <div className=" col-span-2">
                          <input
                            ref={otherUserEmail}
                            type="text"
                            placeholder="Email . . ."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
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
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? "Sharing..." : "Share"}
                  </button>
                  {error && <p>Error: {error}</p>}
                  {/* {success && <p>Project Shared Successfully!</p>} */}

                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ShareProjectModal;
