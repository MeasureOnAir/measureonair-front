import React from "react";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/solid";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    inStock: false,
    leadTime: "3–4 weeks",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
  {
    id: 4,
    name: "Nomad Tumbler",
    href: "#",
    price: "$25.00",
    color: "White",
    inStock: false,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

const Features = () => {
  return (
    <div>
      {/* mobile view */}
      <section className="lg:col-span-7 block md:hidden">
        <h2 className="mx-4 mt-16 mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">Features</h2>
        <ul
          role="list"
          className=""
        >
          {products.map((product, productIdx) => (
            <li
              key={product.id}
              className="flex py-8 px-1 sm:py-10 m-3 rounded-lg bg-gray-400"
            >
              {productIdx % 2 == 0 ? (
                <>
                  <div className="flex-shrink-">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-28 h-28 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6 bg-red-300">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="ml-2 flex-1 flex flex-col justify-between sm:ml-6 bg-red-300">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-28 h-28 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* desktop view - start */}
      <div className="hidden md:block">
        <div className="max-w-2xl mx-auto py-5 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">Features</h2>
            
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="relative group">
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="object-center object-cover"
                  />
                  <div
                    className="flex items-end opacity-50 p-4 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
                      <h3>
                        <a href="#">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p>{product.price}</p>
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
