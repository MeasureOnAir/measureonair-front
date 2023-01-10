import React from "react";

const HeroSection = () => {
  return (
    <div>
      <main>
        <div>
          {/* Hero card */}
          <div className="">
            {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" /> */}
            {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */}
            <div className="w-full h-screen mx-auto ">
              <div className="w-full h-full sm:overflow-hidden grid items-end ">
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                    alt="People working on laptops"
                  />
                  <div className="absolute inset-0 bg-primary-yellow200 mix-blend-multiply dark:bg-gray-700" />
                </div>
                {/* <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8"> */}
                <div className="relative px-4 bottom-28">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white md:text-6xl lg:text-7xl dark:text-gray-300">
                      Take control of your
                    </span>
                    <span className="block text-amber-200 pt-2 dark:text-primary-yellow200 dark:opacity-80">
                      construction workload
                    </span>
                  </h1>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-amber-200 sm:max-w-3xl dark:text-primary-yellow200 dark:opacity-70">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua.
                  </p>
                  <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:gap-5">
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-yellow300 bg-opacity-60 hover:bg-opacity-70 sm:px-8 dark:bg-primary-yellow200 dark:bg-opacity-70 dark:hover:bg-opacity-80"
                      >
                        Get started
                      </a>
                    </div>
                  </div>
                </div>
                {/* <div>
                  <div class="h-16 bg-gradient-to-b from-cyan-500 to-transparent"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
