import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import MOA_Horizontal_Logo from "../assets/moa-logo-horizontal.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navbarElementsArray = [
  { id: 1, title: "Features", path: "#", selected: false },
  { id: 2, title: "About Us", path: "#", selected: false },
  { id: 3, title: "Our team", path: "#", selected: true },
  { id: 4, title: "Our partners", path: "#", selected: false },
];

const canvasNavbarElementsArray = [
  { id: 1, title: "New", path: "#", selected: false },
  { id: 2, title: "Open", path: "#", selected: false },
  { id: 3, title: "Save", path: "#", selected: true },
  { id: 4, title: "Export", path: "#", selected: false },
];

const profileDropdown = [
  { id: 1, title: "Your Profile", path: "#" },
  { id: 1, title: "Settings", path: "#" },
  { id: 1, title: "Sign out", path: "#" },
];

const Navbar = () => {
  const [user, setUser] = useState("lahiru");
  const [navbarElements, setNavbarElements] = useState(navbarElementsArray);
  const [selectedElement, setSelectedElement] = useState("");
  const [profileElements, setProfileElements] = useState(profileDropdown);
  const [isNavbarLight, setIsNavbarLight] = useState(true);

  const onScroll = () => {
    if (window.scrollY >= window.screen.height - 200) {
      setIsNavbarLight(false);
    } else {
      setIsNavbarLight(true);
    }
  };

  window.addEventListener("scroll", onScroll);

  return (
    <Disclosure
      as="nav"
      // className="fixed w-full top-0 z-30 bg-opacity-70 bg-yellow-600 dark:bg-secondary-gray600 shadow"
      className={classNames(
        isNavbarLight == true
          ? "bg-yellow-400 bg-opacity-50 dark:bg-opacity-50 dark:bg-secondary-gray600 "
          : "bg-opacity-100 bg-yellow-500 dark:bg-secondary-gray600 ",
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
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
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
                  <img
                    className="lg:block h-16 md:h-[4.5rem] w-auto"
                    src={MOA_Horizontal_Logo}
                    alt="MOA-Logo"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8 ">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}

                  {navbarElements &&
                    navbarElements.map((element, elementIdx) => {
                      return (
                        <Link
                          to={element.path}
                          key={element.id}
                          className={classNames(
                            selectedElement == element.id
                              ? "border-b-2 border-primary-yellow200"
                              : "hover:border-b-2 hover:border-gray-200  dark:hover:border-gray-300 ",
                            "text-gray-100 inline-flex items-center px-1 pt-1 text-sm font-medium "
                          )}
                          onClick={() => {
                            setSelectedElement(element.id);
                          }}
                        >
                          {element.title} {element.selected}
                        </Link>
                      );
                    })}
                </div>
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
                              className="h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-amber-300 ring-offset-2 dark:ring-amber-500"
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

                            {/* <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-yellow100 dark:text-gray-300 dark:hover:bg-gray-700"
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item> */}
                            {/* <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-yellow100"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-yellow100"
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item> */}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-yellow100 bg-primary-yellow200 shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-gray-400 dark:hover:bg-gray-500 dark:bg-gray-600 "
                      >
                        <PlusSmallIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        <span>Sign In</span>
                      </button>
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
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}

                {navbarElements &&
                  navbarElements.map((element, elementIdx) => {
                    return (
                      <Link to={element.path}>
                        <Disclosure.Button
                          as="a"
                          className={classNames(
                            selectedElement == element.id
                              ? "bg-primary-yellow100 border-primary-yellow300 text-amber-700 block mr-2 rounded-md dark:bg-gray-500 dark:text-gray-200"
                              : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300",
                            "block pl-3 pr-4 py-2 ml-1 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                          )}
                          onClick={() => {
                            setSelectedElement(element.id);
                          }}
                        >
                          {element.title}
                        </Disclosure.Button>
                      </Link>
                    );
                  })}
              </div>

              {/* profile details on sidebar */}

              {/* <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      tom@example.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
