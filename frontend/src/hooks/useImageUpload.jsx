import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase-config'

const useUploadImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)

  const uploadImage = (file, folder = 'uploads') => {
    if (!file) {
      setError('No file selected')
      return
    }

    const storageRef = ref(storage, `${folder}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress)
      },
      (error) => {
        setError(error.message)
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          setImageUrl(downloadURL)
        } catch (err) {
          setError(err.message)
        }
      },
    )
  }

  return {
    uploadProgress,
    imageUrl,
    error,
    uploadImage,
  }
}

export default useUploadImage
