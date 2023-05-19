import { useState } from 'react'
import { useAuthContext } from './useAuthContext.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import useUser from '../api/useUser.js'

export const useSignIn = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const navigate = useNavigate()
  const [createUser,  getUser] = useUser()

  const signin = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        return user

        // Get User Data From DB and Add Additional Data to the User Object
        // (async () => {
        //   const userData = await getUser(user.uid)
        //   console.log(userData)
        //   user.username = userData.name
        //   user.profile_picture = userData.profile_picture
        // })()

        // save the user to local storage
        // localStorage.setItem('user', JSON.stringify(user))

        // update the auth context
        // dispatch({ type: 'SIGNIN', payload: user })
        // setIsLoading(false)

        // Navigate to Home Page
        // navigate(ROUTES.HOME)
      })
      .catch(error => {
        setError(error)
        setIsLoading(false)
      })

      // Get User from the Database
      const userData = await getUser(user.uid)

      if (userData){
        console.log("userDB", userData)

        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(userData))

        dispatch({ type: 'SIGNIN', payload: userData })
        setIsLoading(false)

        // Navigate to Home Page
        navigate(ROUTES.HOME)
      }

      
  }

  return { signin, isLoading, error }
}