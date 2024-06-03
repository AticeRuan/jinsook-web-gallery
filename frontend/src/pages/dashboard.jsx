import Login from '../components/auth/login'
import DashboardMain from '../components/dashboard/dashboardmain'
import { useArtworksContext } from '../hooks/useArtworksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import useRead from '../hooks/useRead'
const Dashboard = () => {
  const { user } = useAuthContext()

  useRead('/api/artworks')
  const { artworks } = useArtworksContext()
  if (!user) {
    return <Login />
  }
  return <DashboardMain user={user} data={artworks} />
}

export default Dashboard
