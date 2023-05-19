import React, { useState } from "react";
import { useSignUp } from '../../hooks/auth/useSignUp'

const specialCharactorFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const passwordStrengthStatus = [
  { id: 1, value: 'Length should be 8', success: false },
  { id: 2, value: 'At least one number', success: false },
  { id: 3, value: 'At least one lower case letter', success: false },
  { id: 4, value: 'At least one upper case letter', success: false },
  { id: 5, value: 'At least one special charactor', success: false }
]

const Alert = ({title, message}) => {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  )
}

const SignupBase = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [usernameError, setUsernameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(null)
  
  const { signup, error, isLoading } = useSignUp()

  // username validation
  const onChangeUsername = event => {
    setUsername(event.target.value)

    if (
      event.target.value.length > 5 &&
      /[A-Z0-9_\s]/i.test(event.target.value)
    ) {
      setUsernameError(null)
    } else {
      setUsernameError(
        'length should be longer than 5 letters and can only contain letters, numbers and _'
      )
    }
  }

  // email validation
  const onChangeEmail = event => {
    setEmail(event.target.value)

    if (emailFormat.test(event.target.value)) {
      setEmailError(null)
    } else {
      setEmailError('Pleae Enter A Valid Email Address')
    }
  }

  // password validation
  const onChangePassword = event => {
    setPassword(event.target.value)
    const password = event.target.value

    if (password.length >= 8 && password.length < 15) {
      passwordStrengthStatus[0].success = true
    } else {
      passwordStrengthStatus[0].success = false
    }
    if (/[0-9]/.test(password)) {
      passwordStrengthStatus[1].success = true
    } else {
      passwordStrengthStatus[1].success = false
    }
    if (/[a-z]/.test(password)) {
      passwordStrengthStatus[2].success = true
    } else {
      passwordStrengthStatus[2].success = false
    }
    if (/[A-Z]/.test(password)) {
      passwordStrengthStatus[3].success = true
    } else {
      passwordStrengthStatus[3].success = false
    }
    if (specialCharactorFormat.test(password)) {
      passwordStrengthStatus[4].success = true
    } else {
      passwordStrengthStatus[4].success = false
    }
  }

  // checking two passwords
  const onChangePasswordConfirmation = event => {
    setPasswordConfirmation(event.target.value)
    if (password === event.target.value) {
      setPasswordConfirmationError(null)
    } else {
      setPasswordConfirmationError("Passwords doesn't match")
    }
  }

  const onSubmit = async event => {
    event.preventDefault()
    await signup(email, password, username)
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 mt-14 py-6 sm:py-12">
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div>
            {error && <Alert title='Error' message={error.message}/>}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="email"
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                placeholder="Enter your email address"
                onChange={onChangeEmail}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="username"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                placeholder="Enter a username"
                onChange={onChangeUsername}
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
                onChange={onChangePassword}
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="confirm-password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                placeholder="Confirm your password"
                onChange={onChangePasswordConfirmation}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-yellow100 bg-primary-yellow200 shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 
              dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:hover:bg-opacity-90 dark:bg-primary-yellow200 dark:text-gray-700"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupBase;
