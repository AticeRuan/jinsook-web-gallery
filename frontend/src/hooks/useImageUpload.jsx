import { useState } from 'react'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { storage } from '../firebase-config'

const useUploadImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const [storageRefs, setStorageRefs] = useState([])
  const [urlToRefMap, setUrlToRefMap] = useState(new Map())

  const addStorageRef = (ref, url) => {
    setStorageRefs((prev) => [...prev, ref])
    setUrlToRefMap((prev) => new Map(prev).set(url, ref))
  }

  const uploadImage = async (file, folder = 'uploads', onProgress) => {
    if (!file) {
      setError('No file selected')
      return { error: 'No file selected' }
    }

    try {
      const storageRef = ref(storage, `${folder}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            if (onProgress) {
              onProgress(progress)
            }
          },
          (error) => {
            setError(error.message)
            reject(error)
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              resolve({
                url: downloadURL,
                ref: storageRef, // Return the storage reference
              })
            } catch (err) {
              setError(err.message)
              reject(err)
            }
          },
        )
      })
    } catch (err) {
      setError(err.message)
      return { error: err.message }
    }
  }

  const deleteUploadedImages = async () => {
    try {
      const deletePromises = storageRefs.map((ref) => deleteObject(ref))
      await Promise.all(deletePromises)
      setStorageRefs([])
      setUrlToRefMap(new Map())
      setImageUrl(null)
      setUploadProgress(0)
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const deleteImageByUrl = async (url) => {
    try {
      // First try to get ref from our map of newly uploaded images
      let storageRef = urlToRefMap.get(url)

      // If no ref found (existing image), create one from the URL
      if (!storageRef) {
        // Extract the path from the URL
        const path = decodeURIComponent(url.split('/o/')[1].split('?')[0])
        storageRef = ref(storage, path)
      }

      // Attempt to delete the file
      await deleteObject(storageRef)

      // Clean up our tracking states
      setStorageRefs((prev) => prev.filter((ref) => ref !== storageRef))
      setUrlToRefMap((prev) => {
        const newMap = new Map(prev)
        newMap.delete(url)
        return newMap
      })

      return true
    } catch (err) {
      console.error('Error deleting image:', err)
      setError(err.message)
      return false
    }
  }

  return {
    uploadProgress,
    imageUrl,
    error,
    uploadImage,
    deleteUploadedImages,
    deleteImageByUrl,
    addStorageRef,
  }
}

export default useUploadImage
