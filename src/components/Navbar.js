import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import MOA_Horizontal_Logo from "../assets/moa-logo-horizontal.svg";
import NewProjectModal from "../pages/viewer/NewProjectModal";
import OpenProjectModal from "../pages/viewer/OpenProjectModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const navbarElementsArray = [
//   { id: 1, title: "Features", path: "#", selected: false },
//   { id: 2, title: "About Us", path: "#", selected: false },
//   { id: 3, title: "Our team", path: "#", selected: true },
//   { id: 4, title: "Our partners", path: "#", selected: false },
// ];

const canvasNavbarElementsArray = [
  { id: 1, title: "New", path: "#", selected: false },
  { id: 2, title: "Open", path: "#", selected: false },
  { id: 3, title: "Save", path: "#", selected: true },
  { id: 4, title: "Export", path: "/", selected: false },
];

const profileDropdown = [
  { id: 1, title: "Your Profile", path: "#" },
  { id: 1, title: "Settings", path: "#" },
  { id: 1, title: "Sign out", path: "#" },
];

const Navbar = ({navbarElementsArray, projectName }) => {
  const [user, setUser] = useState("");
  const [navbarElements, setNavbarElements] = useState(navbarElementsArray[1]);
  const [selectedElement, setSelectedElement] = useState("");
  const [profileElements, setProfileElements] = useState(profileDropdown);
  const [isNavbarLight, setIsNavbarLight] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [openModal, setOpen] = useState(true);
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);


  useEffect(() => {
    setNavbarElements(navbarElementsArray[1]);
    setSelectedElement('')
  }, [navbarElementsArray]);

  const onScroll = () => {
    if (window.scrollY >= window.screen.height - 200) {
      setIsNavbarLight(false);
    } else {
      setIsNavbarLight(true);
    }
  };
  window.addEventListener("scroll", onScroll);

  const onSubMenuHovered = () => {
    console.log("called here");
    setSubMenuOpen((prev) => !prev);
  };

  // checking navbar items
  const onItemClick = (item) => {
    setSelectedElement(item.id);
    if (item.title == "Open") {
      setOpenProjectModal(true);
    }
  };

  // checking sub item of 'New'
  const onNewItemsClick = (subItem) => {
    if (subItem.title == "Project") {
      console.log(subItem);
      setOpenNewProjectModal(true);
    }
  };

  return (
    <>
      <Disclosure
        as="nav"
        // className="fixed w-full top-0 z-30 bg-opacity-70 bg-yellow-600 dark:bg-secondary-gray600 shadow"

        className={classNames(
          isNavbarLight == true && navbarElementsArray[0] == "home"
            ? "bg-primary-yellow2_500 bg-opacity-50 text-gray-100 dark:bg-opacity-50 dark:bg-secondary-gray600 "
            : "bg-opacity-90 bg-primary-yellow2_500 text-gray-600 dark:text-gray-100 dark:bg-secondary-gray600 ",
          "fixed w-full top-0 z-30 shadow transition ease-in-out delay-100 duration-200"
        )}
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-200 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-yellow200 dark:focus:ring-gray-600">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-8 w-8"
                          aria-hidden="true"
                          color="white"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <Link to={"/"}>
                      <img
                        className="lg:block h-16 md:h-[4.5rem] w-auto"
                        src={MOA_Horizontal_Logo}
                        alt="MOA-Logo"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8 ">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}

                    {navbarElements &&
                      navbarElements.map((element, elementIdx) => {
                        return (
                          <div
                            key={element.id}
                            className={classNames(
                              selectedElement == element.id
                                ? "border-b-4 border-gray-500 dark:border-b-2 dark:border-primary-yellow2_500"
                                : "hover:border-b-2 hover:border-gray-700 dark:hover:border-gray-300 ",
                              "inline-flex items-center px-1 pt-1 text-sm font-medium cursor-pointer"
                            )}
                            onClick={() => {
                              // setSelectedElement(element.id);
                              onItemClick(element);
                            }}
                          >
                            {/* rendering subItems from the navbar */}
                            {element.subItems ? (
                              <div>
                                <Menu as="div" className="relative">
                                  <Menu.Button
                                    className="text-sm focus:outline-none "
                                    onMouseOver={() => onSubMenuHovered()}
                                  >
                                    <span className="sr-only">
                                      Open user menu
                                    </span>
                                    <div className="">{element.title}</div>
                                  </Menu.Button>

                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      static
                                      className=" origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-secondary-gray600 dark:ring-gray-500"
                                    >
                                      {element.subItems &&
                                        element.subItems.map((subItem, idx) => {
                                          return (
                                            <Menu.Item>
                                              {({ active }) => (
                                                <div
                                                  className={classNames(
                                                    active
                                                      ? "bg-gray-100 dark:bg-transparent"
                                                      : "",
                                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-yellow100 hover:rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
                                                  )}
                                                  onClick={() =>
                                                    onNewItemsClick(subItem)
                                                  }
                                                >
                                                  {subItem.title}
                                                </div>
                                              )}
                                            </Menu.Item>
                                          );
                                        })}
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </div>
                            ) : (
                              <Link
                                to={element.path}
                              >{element.title}</Link>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  {/* modal - start */}
                  <NewProjectModal
                    openNewProjectModal={openNewProjectModal}
                    setOpenNewProjectModal={setOpenNewProjectModal}
                  />

                  <OpenProjectModal
                    openProjectModal={openProjectModal}
                    setOpenProjectModal={setOpenProjectModal}
                  />
                  {/* modal - end */}
                </div>
                <div className="flex items-center">
                  {user ? (
                    <>
                      <div className="md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                          <div>
                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow200 dark:focus:ring-gray-500 dark:bg-gray-400">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-amber-300 ring-offset-1 ring-offset-gray-400 dark:ring-amber-500"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className=" origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-secondary-gray600 dark:ring-gray-500">
                              {profileElements &&
                                profileElements.map((element, idx) => {
                                  return (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 dark:bg-transparent"
                                              : "",
                                            "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-yellow100 dark:text-gray-300 dark:hover:bg-gray-700"
                                          )}
                                        >
                                          {element.title}
                                        </a>
                                      )}
                                    </Menu.Item>
                                  );
                                })}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0">
                        <Link
                         to={'/viewer'}
                        >
                        <button
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-yellow100 bg-primary-yellow200 shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 
                          dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:hover:bg-opacity-90 dark:bg-primary-yellow200 dark:text-gray-700"
                        
                          onClick={() => {
                            setUser("Lahiru")
                          }
                        }
                        >
                          <PlusSmallIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          <span>Sign In</span>
                        </button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* mobile view - sidebar */}
            <Disclosure.Panel className="md:hidden absolute w-full">
              <div className="bg-primary-yellow200 rounded-lg py-4 mx-2 mt-1 shadow-xl dark:bg-secondary-gray600">
                <div className="pt-2 pb-3 space-y-1 ">
                  
                  <div className="border-b mt-0 pb-2 mx-3 border-gray-500">
                  <div className="px-1 sm:px-3">{projectName}</div>
                  {/* <hr className="mx-3 mt-3 " /> */}
                  </div>
                  {navbarElements &&
                    navbarElements.map((element, elementIdx) => {
                      return (
                        <Link to={element.path}>
                          <Disclosure.Button
                            as="a"
                            className={classNames(
                              selectedElement == element.id
                                ? "border-l-4 bg-primary-yellow100 border-primary-yellow300 text-amber-700 block mr-2 rounded-md dark:bg-gray-500 dark:text-gray-200"
                                : "border-transparent mr-2 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300",
                              "block pl-3 pr-4 py-2 ml-1 text-base font-medium sm:pl-5 sm:pr-6"
                            )}
                            onClick={() => {
                              // setSelectedElement(element.id);
                              onItemClick(element);
                            }}
                          >
                            {/* rendering subItems from the navbar */}
                            {element.subItems ? (
                              <div>
                                <Menu as="div" className="relative">
                                  <Menu.Button
                                    className="text-sm focus:outline-none "
                                    onMouseOver={() => onSubMenuHovered()}
                                  >
                                    <span className="sr-only">
                                      Open user menu
                                    </span>
                                    <div className="">{element.title}</div>
                                  </Menu.Button>

                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      static
                                      className=" origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-secondary-gray600 dark:ring-gray-500"
                                    >
                                      {element.subItems &&
                                        element.subItems.map((subItem, idx) => {
                                          return (
                                            <Menu.Item>
                                              {({ active }) => (
                                                <a
                                                  href="#"
                                                  className={classNames(
                                                    active
                                                      ? "bg-gray-100 dark:bg-transparent"
                                                      : "",
                                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-yellow100 hover:rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
                                                  )}
                                                  onClick={() =>
                                                    onNewItemsClick(subItem)
                                                  }
                                                >
                                                  {subItem.title}
                                                </a>
                                              )}
                                            </Menu.Item>
                                          );
                                        })}
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </div>
                            ) : (
                              <>{element.title}</>
                            )}
                          </Disclosure.Button>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {/* new project modal */}
      {/* <NewProjectModal /> */}
    </>
  );
};

export default Navbar;
