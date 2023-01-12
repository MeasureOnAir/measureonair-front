import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";

const Dropdown = ({ selected, setSelected, items }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button
          className="relative w-full cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left shadow-md focus:outline-none 
                             border border-gray-200 dark:border-gray-600
                            text-sm focus:ring-1 ring-primary-yellow200 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:ring-primary-yellow200"
        >
          <span className="block truncate">{selected.title}</span>
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
                  z-10             ring-black ring-opacity-5 focus:outline-none sm:text-sm text-xs dark:bg-secondary-gray500"
          >
            {items.map((item, elementIdx) => (
              <Listbox.Option
                key={elementIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-amber-100 text-amber-900 dark:bg-secondary-gray600 dark:text-gray-100"
                      : "text-gray-900 dark:text-gray-300"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        (selected ? "font-medium" : "font-normal",
                        "flex justify-end right-0")
                      }`}
                    >
                      {item.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-primary-yellow200">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
};

export default Dropdown;
