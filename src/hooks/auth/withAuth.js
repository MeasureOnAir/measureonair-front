import React, { useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import * as ROUTE from '../../constants/routes'

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const { user } = useAuthContext() || { user: null }
    const navigate = useNavigate()

    useEffect(() => {
      const userAny = user || JSON.parse(localStorage.getItem('user-auth'))
      if (!userAny) {
        navigate(ROUTE.SIGNIN)
      } 
    }, [user, navigate])

    if (!user) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return ComponentWithAuth
}

export default withAuth
