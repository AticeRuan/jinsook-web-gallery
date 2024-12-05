import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'jinsook-gallery.firebaseapp.com',
  projectId: 'jinsook-gallery',
  storageBucket: 'jinsook-gallery.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
