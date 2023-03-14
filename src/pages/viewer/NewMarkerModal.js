import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";


const unitList = [
  { id: 1, title: "meter" },
  { id: 2, title: "feet" },
];

const NewMarkerModal = ({ openNewMarkerModal, setOpenNewMarkerModal, currentMarkerData, setCurrentMarkerData, markers, setMarkers }) => {

  const [selectedUnit, setSelectedUnit] = useState({id: 1, title: 'meter'})

  const [id, setId] = useState()
  const [type, setType] = useState()
  const [length, setLength] = useState(1)
  const [width, setWidth] = useState(1)
  const [height, setHeight] = useState(1)
  const [qty, setQty] = useState(1)
  const [times, setTimes] = useState(1)
  const [remarks, setRemarks] = useState("")


  useEffect(() => {
    setId(currentMarkerData.id)
    setType(currentMarkerData.type)
    setLength(currentMarkerData.length)
    setWidth(currentMarkerData.width)
    setHeight(currentMarkerData.height)
    setQty(currentMarkerData.qty)
    setTimes(currentMarkerData.times)
    setSelectedUnit({id: 1, title: currentMarkerData.unit})
    setRemarks(currentMarkerData.remarks)
  }, [currentMarkerData])


  const onSaveClicked = (event) => {

    const currentItem = markers[currentMarkerData.id]
    setMarkers({
      ...markers,
      [currentMarkerData.id]: {
        ...currentItem,
        data: {
          id: id,
          type: type,
          length: length,
          width: width,
          height: height,
          qty: qty,
          times: times,
          unit: selectedUnit.title,
          remarks: remarks
        },
      },
    });
    setOpenNewMarkerModal(false)

  }

  const onDeleteClicked = (event) => {

    // remove the current marker and create a new object
    const newMarkers = Object.keys(markers)
    .filter(key => key !== currentMarkerData.id)
    .reduce((acc, key) => {
      acc[key] = markers[key];
      return acc;
    }, {});
    setMarkers(newMarkers)
    setOpenNewMarkerModal(false)
  }
  

  return (
    <div>
      <Transition.Root show={openNewMarkerModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpenNewMarkerModal}
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
                      Marker Data
                    </Dialog.Title>

                    <div className="gap-4 my-10">
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Marker Id
                        </div>
                        <div className=" col-span-2">
                          <input
                            value={id}
                            onChange={e=>setId(e.target.value)}
                            disabled={true}
                            type="text"
                            placeholder="Marker Id"
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-200 focus:outline  focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Marker Type
                        </div>
                        <div className=" col-span-2">
                          <input
                            value={type}
                            onChange={e=>setType(e.target.value)}
                            disabled={true}
                            type="text"
                            placeholder="Marker Type"
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                      <div className=" grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Length
                        </div>
                        <div className=" col-span-2">
                          <input
                            value={length}
                            onChange={e=>setLength(e.target.value)}
                            type="number"
                            placeholder="Length..."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                      <div className=" grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Width
                        </div>
                        <div className=" col-span-2">
                          <input
                            value={width}
                            onChange={e=>setWidth(e.target.value)}
                            type="number"
                            placeholder="Width..."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                      <div className=" grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Height
                        </div>
                        <div className=" col-span-2">
                          <input
                            value={height}
                            onChange={e=>setHeight(e.target.value)}
                            type="number"
                            placeholder="Height..."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                      <div className=" grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Quantity
                        </div>
                        <div className=" col-span-2">
                          <input
                            value={qty}
                            onChange={e=>setQty(e.target.value)}
                            type="number"
                            placeholder="Quantity..."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                      <div className=" grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Times
                        </div>
                        <div className=" col-span-2">
                          <input
                            value={times}
                            onChange={e=>setTimes(e.target.value)}
                            type="number"
                            placeholder="Times..."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Unit
                        </div>
                        <div className=" col-span-2">
                          <Dropdown
                            selected={selectedUnit}
                            setSelected={setSelectedUnit}
                            items={unitList}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center my-6">
                        <div className="col-span-1 text-left text-sm font-semibold dark:text-gray-200">
                          Remarks
                        </div>
                        <div className=" col-span-2">
                          <input
                            value={remarks}
                            onChange={e=>setRemarks(e.target.value)}
                            type="text"
                            placeholder="Remarks..."
                            className=" px-2 p-1 w-full text-sm border text-gray-600 border-gray-300 focus:outline focus:outline-primary-yellow200 rounded-md dark:border-gray-600 dark:bg-secondary-gray600 dark:text-gray-300 dark:focus:outline-primary-yellow200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-5 sm:mt-6"> */}
                {/* <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:space-x-4"> */}
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 mb-3
                    bg-primary-yellow200 font-medium text-white hover:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow200 text-sm md:text-base
                    dark:bg-primary-yellow200 dark:text-gray-800 dark:font-bold dark:hover:bg-yellow-500 dark:hover:text-gray-900 dark:tracking-wide dark:focus:ring-primary-yellow200
                    dark:ring-offset-secondary-gray500
                    "
                    onClick={onSaveClicked}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 mb-3
                    bg-primary-yellow200 font-medium text-white hover:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow200 text-sm md:text-base
                    dark:bg-primary-yellow200 dark:text-gray-800 dark:font-bold dark:hover:bg-yellow-500 dark:hover:text-gray-900 dark:tracking-wide dark:focus:ring-primary-yellow200
                    dark:ring-offset-secondary-gray500
                    "
                    onClick={onDeleteClicked}
                  >
                    Delete
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

export default NewMarkerModal;
