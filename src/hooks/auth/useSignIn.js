import { useState } from 'react'
import { useAuthContext } from './useAuthContext.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import useUser from '../api/useUser.js'

export const useSignIn = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const navigate = useNavigate()
  const [createUser,  getUser] = useUser()

  const signin = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
    
      if (user) {
        // Get User from the Database
        const userData = await getUser(user.uid);
    
        if (userData) {
          console.log("userDB", userData);
    
          // save the user to local storage
          localStorage.setItem('user', JSON.stringify(userData));
    
          dispatch({ type: 'SIGNIN', payload: userData });
          setIsLoading(false);
    
          // Navigate to Home Page
          navigate(ROUTES.HOME);
        } else {
          setError("User Not Found");
          setIsLoading(false);
        }
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }      
  }

  return { signin, isLoading, error }
}
