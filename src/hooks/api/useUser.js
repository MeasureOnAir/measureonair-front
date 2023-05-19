import { useState } from 'react'
import axios from 'axios'
import { BACKEND } from '../../constants/endpoints'

const useUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const createUser = async (userId, userEmail, username) => {
    setIsLoading(true)
    setError(null)

    axios
      .post(
        `${BACKEND}user/add`,
        {
          id: userId,
          name: username,
          email: userEmail
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        setSuccess(true)
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error)
        setError(error.message)
        setIsLoading(false)
      })
  }

  const getUser = async userId => {
    setIsLoading(true)
    setError(null)

    const userData = await axios
      .get(`${BACKEND}user/get?user_id=${userId}`)
      .then(response => {
        const user = response.data
        setSuccess(true)
        setIsLoading(false)
        return user
      })
      .catch(error => {
        console.error(error)
        setError(error.message)
        setIsLoading(false)
      })

    return userData
  }

  const getUsers = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${BACKEND}user/all`)

      setSuccess(true)
      setIsLoading(false)

      return response.data
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const addProject = async (userId, projectId) => {
    setIsLoading(true)
    setError(null)

    try {
      const formData = {
        userId: userId,
        projectId: projectId
      }

      const response = await axios.post(`${BACKEND}user/project/add`, formData)

      setSuccess(true)
      setIsLoading(false)

      return response.data
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const removeProject = async (userId, projectId) => {
    setIsLoading(true)
    setError(null)

    try {
      const formData = {
        userId: userId,
        projectId: projectId
      }

      const response = await axios.post(
        `${BACKEND}user/project/remove`,
        formData
      )

      setSuccess(true)
      setIsLoading(false)

      return response.data
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return [
    createUser,
    getUser,
    getUsers,
    addProject,
    removeProject,
    isLoading,
    error,
    success
  ]
}

export default useUser
