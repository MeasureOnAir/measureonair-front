import { useAuthContext } from './useAuthContext'

export const useSignOut = () => {
  const { dispatch } = useAuthContext()
  const signout = () => {
    // remove user from storage
    localStorage.removeItem('user-auth')

    // dispatch User
    dispatch({ type: 'SIGNOUT' })
  }

  return { signout }
}
