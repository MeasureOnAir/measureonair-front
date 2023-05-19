import React from "react";

const ForgotPasswordBase = () => {
  return (
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div class="max-w-md mx-auto">
            <div class="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.396 7.073A3.999 3.999 0 015.705 10a4 4 0 11-1.998-3.464l1.689-.463zm2.494-.684a6 6 0 10.002 8.223l1.692-.463a4 4 0 110-7.297l-1.694.537zm3.407-.341a8 8 0 10-.002 11.185l1.695-.463a6 6 0 010-10.26l-1.693.538zM16.5 10a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-bold text-gray-700 text-2xl">
                Forgot Password
              </span>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>
                  Please enter your email address. We will send you a link to
                  reset your password.
                </p>
                <form class="mt-8 space-y-6" action="#" method="POST">
                  <input type="hidden" name="remember" value="true" />
                  <div class="rounded-md shadow-sm space-y-4">
                    <div>
                      <label for="email-address" class="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-yellow100 bg-primary-yellow200 shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 
              dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:hover:bg-opacity-90 dark:bg-primary-yellow200 dark:text-gray-700"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordBase;
