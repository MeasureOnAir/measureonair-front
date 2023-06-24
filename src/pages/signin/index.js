import React, { useState } from "react"

import { useSignIn } from '../../hooks/auth/useSignIn'

const SigninBase = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const { signin, error, isLoading } = useSignIn()

  const onSubmit = async event => {
    event.preventDefault()
    await signin(email, password)
  }

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-md text-gray-600">
          Or
          <a
            href="/signup"
            className="mx-2 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            create a new account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error!=="" && error && (<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block font-medium sm:inline">{
          error.message.replace("Firebase: Error (auth/", "").replace(").", "")
          }</span>
        </div>)}
          <form onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Enter your email address"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-5">
                <a
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-yellow100 bg-primary-yellow200 shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 
              dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:hover:bg-opacity-90 dark:bg-primary-yellow200 dark:text-gray-700"
            >
                Sign in
              </button>
            </div>
          </form>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm leading-5">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <span className="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                    onClick={() => alert("Haven't Implemented This Option Yet. Coming Soon!")}
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <img
                      className="h-5 w-5"
                      alt="signin with facebook"
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                    />
                  </button>
                </span>
              </div>

              <div>
                <span className="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                    onClick={() => alert("Haven't Implemented This Option Yet. Coming Soon!")}
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <img
                      className="h-5 w-5"
                      alt="signin with twitter"
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
                    />
                  </button>
                </span>
              </div>

              <div>
                <span className="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                    onClick={() => alert("Haven't Implemented This Option Yet. Coming Soon!")}
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <img
                      className="h-5 w-5"
                      alt="signin with google"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </button>
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SigninBase;
