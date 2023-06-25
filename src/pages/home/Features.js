import React from "react";
import Tape from '../../assets/features/tape.png'
import Plan from '../../assets/features/plan.png'
import Spreadsheet from '../../assets/features/spreadsheet.png'


const featuresArray = [
  {
    id: 1,
    path: "/",
    title: 'View Building Plans Easily',
    description: [
      "Effortlessly access and view your uploaded project plans from anywhere, at any time",
      "Whether you're in the office or on the go, stay connected to your project",
      "Seamlessly scroll, zoom in, and zoom out Using your laptop trackpad or Use your fingertips on touch-enabled devices"
    ],
    // imageSrc:
    //   "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageSrc: Plan,
    imageAlt: "Front of men's Basic Tee in black",
  },
  {
    id: 2,
    path: "/",
    title: "Add Different Measures",
    description: [
      "Efficiently track and mark work progress within their projects",
      "Easily insert pins, shade areas, or draw lines directly on drawings",
      "Fully scrollable interactive objects",
      "Add relevant measurements, annotations, or notes to these objects, providing a comprehensive overview of the work status."
    ],
    // imageSrc:
    //   "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageSrc: Tape,
    imageAlt: "Front of men's Basic Tee in black",
  },
  {
    id: 3,
    path: "/",
    title: "Generate Spreadsheet Automatically",
    description:[
      "By leveraging the data from pins, lines, and shaded areas inserted on drawings, our application generates Measurement Sheets ",
      "Formatted correctly and automatically performs calculations for you",
      "Each measurement entry is conveniently linked to the corresponding object ID."
    ],
    // imageSrc:
    //   "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageSrc: Spreadsheet,
    imageAlt: "Front of men's Basic Tee in black",
  },
];

const Features = () => {
  const features = featuresArray;

  return (
    <div>
      {/* mobile view */}
      <section className="lg:col-span-7 block md:hidden ">
        <h2 className="mx-4 mt-11 mb-8 text-3xl font-extrabold tracking-normal sm:text-4xl text-gray-900 dark:text-gray-200">
          Features
        </h2>
          <ul className="">
          {features.map((feature, featureIdx) => (
            <li
              key={feature.id}
              className="flex py-4 px-1 sm:py-6 m-3 my-5 rounded-lg bg-gray-100 dark:bg-secondary-gray700 shadow-lg"
            >
                              <>
                  <div className="grid justify-center items-center flex-shrink-0">
                    <img
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      className="w-28 h-28 rounded-md object-center object-contain sm:w-48 sm:h-48"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex ">
                    <div className="relative grid justify-center items-center">
                      <div>
                        <h3 className="text-center">
                          <div
                            className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-200 "
                          >
                            {feature.title}
                          </div>
                        </h3>

                        <div className="mt-1 text-center">
                            {feature.description.map(
                                    (description, descriptionIdx) => (
                                      <p className="text-base sm:text-base text-gray-500 dark:text-gray-300">
                                        {"◆ "}&nbsp;{description}
                                      </p>
                                    )
                              )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              {/* {featureIdx % 2 === 0 ? (
                <>
                  <div className="grid justify-center items-center flex-shrink-0">
                    <img
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      className="w-28 h-28 rounded-md object-center object-contain sm:w-48 sm:h-48"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex ">
                    <div className="relative grid justify-center items-center">
                      <div>
                        <h3 className="text-center">
                          <div
                            className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-200 "
                          >
                            {feature.title}
                          </div>
                        </h3>

                        <div className="mt-1 text-center">
                            {feature.description.map(
                                    (description, descriptionIdx) => (
                                      // <p className="text-base sm:text-base text-gray-500 dark:text-gray-300">
                                      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
                                        {"◆ "}&nbsp;{description}
                                      </p>
                                    )
                              )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="ml-2 mr-4 flex-1 flex">
                    <div className="relative grid justify-center items-center">
                      <div>
                        <h3 className="text-center">
                          <a
                            href={feature.path}
                            className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-200"
                          >
                            {feature.title}
                          </a>
                        </h3>

                        <div className="mt-1 flex  text-center">
                          {feature.description.map(
                                    (description, descriptionIdx) => (
                                      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
                                        {"◆ "}&nbsp;{description}
                                      </p>
                                    )
                              )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid justify-center items-center flex-shrink-0">
                    <img
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      className="w-28 h-28 rounded-md object-center object-contain sm:w-48 sm:h-48"
                    />
                  </div>
                </>
              )} */}
            </li>
          ))}
        </ul>
      </section>

      {/* desktop view - start */}
      <div className="hidden md:block dark:bg-transparent">
        <div className="max-w-2xl mx-auto py-5 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between space-x-4 mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-200">
              Features
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {features.map((feature) => (
              <div className="grid justify-center">
              <div key={feature.id} className="relative group">
                <div className="aspect-w-4 aspect-h-3 py-4 w-72 grid justify-center rounded-lg overflow-hidden bg-gray-100 drop-shadow-lg dark:bg-secondary-gray700" style={{minHeight:"540px"}}>
                  <div className="grid justify-center">
                    <img
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      // className="h-40 w-40"
                      className="w-28 h-28 object-center object-contain sm:w-48 sm:h-48"
                    />
                  </div>

                  <div
                    className="flex opacity-70 p-4 group-hover:opacity-100 transition ease-in-out delay-150 duration-300"
                    aria-hidden="true"
                  >
                    <div className="items-center justify-center text-base font-medium text-gray-700 z-10 dark:text-gray-200">
                      <h3 className="text-center">
                        <div className="font-bold">
                          <span
                            aria-hidden="true"
                            className="absolute"
                          />
                          {feature.title}
                        </div>
                      </h3>
                          {feature.description.map(
                                (description, descriptionIdx) => (
                                  <p className="text-sm text-left pt-2 dark:text-gray-400">
                                    {"◆ "}&nbsp;{description}
                                  </p>
                                )
                          )}
                      {/* <p className="text-sm text-center pt-2 dark:text-gray-400">
                        {feature.description}
                      </p> */}
                    </div>
                    {/* gradient for feature card */}
                    <div className="absolute inset-x-0 bottom-0 rounded-lg h-1/2 bg-gradient-to-t from-gray-600 to-transparent opacity-40 dark:from-secondary-gray500" />
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* desktop view - end */}
    </div>
  );
};

export default Features;
