import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AnimatedRoutes from './layouts/animatedRoutes'
import { AuthContextProvider } from './context/authContext'
import { ArtworksContextProvider } from './context/artworksContext'
import { MessagesContextProvider } from './context/messagesContext'

function App() {
  return (
    <AuthContextProvider>
      <ArtworksContextProvider>
        <MessagesContextProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </MessagesContextProvider>
      </ArtworksContextProvider>
    </AuthContextProvider>
  )
}

export default App
