import { useState } from 'react'
import { useAuthContext } from './useAuthContext.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import useUser from '../api/useUser'

export const useSignUp = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const navigate = useNavigate()
  const [createUser] = useUser()

  const signup = async (email, password, username) => {
    setIsLoading(true)
    setError(null)

    const user = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user

        return user

        // user.username = username
        // user.profile_picture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

        // save the user to local storage
        // localStorage.setItem('user', JSON.stringify(user))

        // update the auth context
        // dispatch({ type: 'SIGNIN', payload: user })

        // add user to db
        // createUser(user.uid, user.email, username)

        // setIsLoading(false)

        // Navigate to Home Page
        // navigate(ROUTES.HOME)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })

      user.id = user.uid
      user.name = username
      user.profile_picture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      
      // add user to db
      await createUser(user.uid, user.email, username)

      // save the user to local storage
      localStorage.setItem('user-auth', JSON.stringify(user))

      // update the auth context
      dispatch({ type: 'SIGNIN', payload: user })

      setIsLoading(false)

      // Navigate to Home Page
      navigate(ROUTES.HOME)


  }

  return { signup, isLoading, error }
}
