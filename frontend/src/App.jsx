import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AnimatedRoutes from './layouts/animatedRoutes'
import { AuthContextProvider } from './context/authContext'
import { ArtworksContextProvider } from './context/artworksContext'

function App() {
  return (
    <AuthContextProvider>
      <ArtworksContextProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </ArtworksContextProvider>
    </AuthContextProvider>
  )
}

export default App
