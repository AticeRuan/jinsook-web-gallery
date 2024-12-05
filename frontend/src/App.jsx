import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AnimatedRoutes from './layouts/animatedRoutes'
import { AuthContextProvider } from './context/authContext'
import { ArtworksContextProvider } from './context/artworksContext'
import { MessagesContextProvider } from './context/messagesContext'
import { ContentContextProvider } from './context/contentContext'

function App() {
  return (
    <AuthContextProvider>
      <ArtworksContextProvider>
        <MessagesContextProvider>
          <ContentContextProvider>
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </ContentContextProvider>
        </MessagesContextProvider>
      </ArtworksContextProvider>
    </AuthContextProvider>
  )
}

export default App
