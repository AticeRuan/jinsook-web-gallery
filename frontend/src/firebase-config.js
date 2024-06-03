import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'jinsook-cba6e.firebaseapp.com',
  projectId: 'jinsook-cba6e',
  storageBucket: 'jinsook-cba6e.appspot.com',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
