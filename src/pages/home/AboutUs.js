import React from "react";

const stats = [
  { label: "Founded", value: "2022" },
  { label: "Projects In Progress", value: "4" },
  { label: "Beta Users", value: "50+" },
  { label: "Deployed Products", value: "1" },
];

const AboutUs = () => {
  return (
    <div>
      <div className="relative bg-transparent py-16 sm:py-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
          <div className="relative sm:py-16 lg:py-0">
            <div
              aria-hidden="true"
              className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
            >
              <div className="absolute inset-y-0 right-1/2 w-full bg-amber-700 rounded-r-3xl lg:right-72 dark:bg-secondary-gray700" />
              <svg
                className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200 dark:text-gray-400"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                />
              </svg>
            </div>
            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
              {/* Testimonial card*/}
              <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  // src="https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100"
                  src="https://i.ibb.co/YWMGVVK/Square-Ishini.jpg"
                  alt=""
                />
                <div className="absolute inset-0 bg-primary-yellow200 mix-blend-multiply dark:bg-gray-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-yellow300 via-primary-yellow200 opacity-90 dark:from-secondary-gray700 dark:via-secondary-gray600" />
                <div className="relative px-8">
                  <div>
                    <img
                      className="h-16"
                      // src="https://tailwindui.com/img/logos/workcation.svg?color=white"
                      src="https://svgshare.com/i/udR.svg"
                      alt="Workcation"
                    />
                  </div>
                  <blockquote className="mt-8">
                    {/* <div className="relative text-lg font-medium text-white md:flex-grow">
                      <svg
                        className="absolute top-0 left-0 transform -translate-x-6 -translate-y-2 h-8 w-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="relative ml-3">
                        Live fast die young
                      </p>
                    </div> */}

                    <footer className="mt-4">
                      <p className="ml-3 text-base font-semibold text-yellow-200">
                        Ishini Saparamadu, Founder of MeasureOnAir
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
            {/* Content area */}
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl dark:text-gray-200">
              We make Technology work for Construction
              </h2>
              <div className="mt-6 text-gray-500 space-y-6 dark:text-gray-300">
                <p className="text-lg">
                  Welcome to Concolabs: Empowering Construction Industry with Software Solutions. 
                  Explore our innovative software solutions designed to revolutionize the way construction businesses operate. 
                  Streamline your processes, enhance efficiency, and stay ahead of the competition with our cutting-edge technology.
                </p>
                <p className="text-base leading-7">
                Discover the Power of Construction-Specific Software
                Unlock the true potential of your construction projects with our industry-focused software solutions. 
                From project management and scheduling to cost estimation and collaboration tools, our comprehensive suite of products is tailored to meet the unique needs of the construction industry.              
                </p>
                <p className="text-base leading-7">
                Experience Seamless Integration
                Our software seamlessly integrates with your existing systems and processes, ensuring a smooth transition and minimal disruption to your operations. 
                With user-friendly interfaces and intuitive features, our products are designed to be easily adopted and utilized across your organization.
                </p>
              </div>
            </div>

            {/* Stats section */}
            <div className="mt-10">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-t-2 border-gray-100 dark:border-gray-500 pt-6"
                  >
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-300">
                      {stat.label}
                    </dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <a href="#" className="text-base font-medium text-primary-yellow300 dark:text-primary-yellow200">
                  {" "}
                  Patented innovation: View plans, track progress, and automate measurements in construction.{" "}
                  <span aria-hidden="true">&rarr;</span>{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
