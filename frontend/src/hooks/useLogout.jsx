import { useAuthContext } from './useAuthContext'
import { useArtworksContext } from './useArtworksContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchArtworks } = useArtworksContext()

  const logout = () => {
    //remove user/token from storage
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchArtworks({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}
