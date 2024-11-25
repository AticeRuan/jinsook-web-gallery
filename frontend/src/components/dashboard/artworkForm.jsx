import { useState, useEffect, useRef } from 'react'
import useCreate from '../../hooks/useCreate'
import useUpdate from '../../hooks/useUpdate'
import useUploadImage from '../../hooks/useImageUpload'
import Heading from '../ui/heading'
import { useArtworksContext } from '../../hooks/useArtworksContext'

const ArtworkForm = ({ item, onClose }) => {
  const fileInputRef = useRef(null)
  const [uploadQueue, setUploadQueue] = useState([])
  const [uploadProgress, setUploadProgress] = useState({})
  const { artworks } = useArtworksContext()
  const sortedArtworks = artworks?.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  )
  const themes = [...new Set(sortedArtworks?.map((item) => item.theme))]
  const handcraftItems = sortedArtworks?.filter(
    (item) => item.category === 'crafts',
  )

  const setHeroImage = (index) => {
    setFormData((prevData) => {
      const newImageUrls = [...prevData.imageUrl]
      const [selectedImage] = newImageUrls.splice(index, 1)
      newImageUrls.unshift(selectedImage)
      return {
        ...prevData,
        imageUrl: newImageUrls,
      }
    })
  }

  const HandcraftTypes = [...new Set(handcraftItems?.map((item) => item.theme))]
  const filteredHandcraftTypes = HandcraftTypes.filter((item) => item !== '')
  const filteredThemes = themes.filter((item) => item !== '')

  const isUpdate = !!item
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    imageUrl: [],
    featured: false,
    theme: '',
    header: false,
    description: '',
    medium: '',
    dimensions: '',
  })

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }))
  }

  const iscrafts = formData.category === 'crafts'

  const { createData, loading: createLoading, error: createError } = useCreate()
  const { updateData, loading: updateLoading, error: updateError } = useUpdate()
  const {
    imageUrl,
    error: uploadError,
    uploadImage,
    deleteUploadedImages,
    deleteImageByUrl,
    addStorageRef,
  } = useUploadImage()

  // Image upload handling
  const convertToWebP = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)
          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], `${file.name.split('.')[0]}.webp`, {
                  type: 'image/webp',
                }),
              )
            },
            'image/webp',
            0.8,
          )
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFileSelect = async (e) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files)
    const newUploadQueue = []

    for (const file of files) {
      try {
        const webpFile = await convertToWebP(file)
        newUploadQueue.push({
          file: webpFile,
          id: Math.random().toString(36).substring(7),
          progress: 0,
          status: 'pending',
        })
      } catch (err) {
        console.error('Error converting file:', err)
      }
    }

    setUploadQueue((prev) => [...prev, ...newUploadQueue])
  }

  const handleThemeChange = (theme) => {
    setFormData((prev) => ({
      ...prev,
      theme: theme,
    }))
  }

  // Process upload queue
  useEffect(() => {
    const processQueue = async () => {
      const pending = uploadQueue.find((item) => item.status === 'pending')
      if (pending) {
        try {
          setUploadQueue((prev) =>
            prev.map((item) =>
              item.id === pending.id ? { ...item, status: 'uploading' } : item,
            ),
          )

          const uploadResult = await uploadImage(
            pending.file,
            formData.category,
            (progress) => {
              setUploadProgress((prev) => ({
                ...prev,
                [pending.id]: progress,
              }))
            },
          )

          if (uploadResult.url) {
            // Save the storage reference
            if (uploadResult.ref) {
              addStorageRef(uploadResult.ref, uploadResult.url)
            }

            setFormData((prev) => ({
              ...prev,
              imageUrl: [...prev.imageUrl, uploadResult.url],
            }))

            setTimeout(() => {
              setUploadQueue((prev) =>
                prev.filter((item) => item.id !== pending.id),
              )
              setUploadProgress((prev) => {
                const newProgress = { ...prev }
                delete newProgress[pending.id]
                return newProgress
              })
            }, 100)
          }
        } catch (error) {
          setUploadQueue((prev) =>
            prev.map((item) =>
              item.id === pending.id ? { ...item, status: 'error' } : item,
            ),
          )
          setTimeout(() => {
            setUploadQueue((prev) =>
              prev.filter((item) => item.id !== pending.id),
            )
          }, 3000)
        }
      }
    }

    processQueue()
  }, [uploadQueue, uploadImage, formData.category, addStorageRef])

  useEffect(() => {
    if (isUpdate) {
      setFormData({
        title: item.title,
        category: item.category,
        price: item.price,
        imageUrl: item.imageUrl || [],
        theme: item.theme,
        featured: item.featured,
        header: item.header,
        description: item.description,
        medium: item.medium,
        dimensions: item.dimensions,
      })
    }
  }, [item, isUpdate])

  useEffect(() => {
    if (imageUrl) {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: [...prevData.imageUrl, imageUrl],
      }))
    }
  }, [imageUrl])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRemoveImage = async (index) => {
    const imageUrlToRemove = formData.imageUrl[index]
    const deleted = await deleteImageByUrl(imageUrlToRemove)
    if (!deleted) {
      console.error('Failed to delete image from storage')
      return
    }
    setFormData((prev) => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.imageUrl.length === 0) {
      alert('Please upload at least one image')
      return
    }

    if (isUpdate) {
      const endpoint = `artworks/${item.category}/${item._id}`
      updateData(endpoint, formData)
    } else {
      const formDataWithHeader = {
        ...formData,
        header: formData.header,
        medium: formData.medium,
        description: formData.description,
        dimensions: formData.dimensions,
      }
      createData('artworks', formDataWithHeader)
    }
    onClose()
  }

  const handleCancel = async () => {
    // Delete all uploaded images and their references
    await deleteUploadedImages()
    // Reset form data
    setFormData({
      title: '',
      category: '',
      price: '',
      imageUrl: [],
      featured: false,
      theme: '',
      header: false,
      description: '',
      medium: '',
      dimensions: '',
    })
    // Clear upload queue
    setUploadQueue([])
    onClose()
  }

  const loading = isUpdate ? updateLoading : createLoading
  const error = isUpdate ? updateError : createError

  return (
    <div className="fixed top-0 left-0 flex  w-screen h-screen items-start md:items-center justify-center backdrop-contrast-[0.25] py-3 md:pt-10 mt-0 overflow-y-auto overflow-x-hidden ">
      <div className="flex flex-col gap-10 bg-jinsook-blue p-10 rounded-xl items-center w-[90%] 2xl:w-[50%] overflow-y-scroll md:overflow-y-auto h-full md:h-fit overflow-x-hidden overscroll-contain">
        <Heading
          text={isUpdate ? 'Update Artwork' : 'Create Artwork'}
          color="#009379"
        />

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-start">
          <div className="flex flex-col gap-4">
            {formData.imageUrl.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {formData.imageUrl.map((url, index) => (
                  <div key={index} className="relative group">
                    {index === 0 && (
                      <div className="absolute top-0 left-0 bg-jinsook-dark-pink text-white text-xs px-2 py-1 rounded font-bold">
                        Hero Image
                      </div>
                    )}
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-[150px] h-[150px] object-cover rounded-xl"
                    />
                    <div
                      className={`absolute top-0 right-0 flex gap-2 h-full w-full ${
                        index !== 0 ? 'group-hover:backdrop-blur-sm' : ''
                      }`}
                    >
                      {index !== 0 && (
                        <button
                          onClick={() => setHeroImage(index)}
                          className="hidden group-hover:flex bg-jinsook-yellow  text-xs px-2 py-1 rounded transition-all duration-300 text-black font-bold backdrop-blur-[1px]   h-[50px] 
                          items-center justify-center w-full top-[30%] absolute"
                        >
                          Set as Hero
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center absolute -top-2 -right-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {uploadQueue.length > 0 &&
                  uploadQueue.map((item) => (
                    <div
                      key={item.id}
                      className="w-[150px] h-[150px] bg-gray-100 rounded-xl flex flex-col items-center justify-center relative"
                    >
                      {item.status === 'uploading' && (
                        <>
                          <div className="text-sm text-gray-500 mb-2">
                            Uploading...
                          </div>
                          <div className="w-4/5 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-jinsook-green transition-all duration-300"
                              style={{
                                width: `${uploadProgress[item.id] || 0}%`,
                              }}
                            />
                          </div>
                        </>
                      )}
                      {item.status === 'error' && (
                        <div className="text-red-500 text-sm">
                          Upload failed
                        </div>
                      )}
                    </div>
                  ))}
                {/* Add more images button */}
                {(formData.imageUrl.length > 0 || uploadQueue.length > 0) && (
                  <button
                    onClick={handleFileSelect}
                    className="w-[150px] h-[150px] bg-jinsook-light-pink rounded-xl flex items-center justify-center cursor-pointer hover:bg-jinsook-pink transition-colors duration-300"
                  >
                    + Add more images
                  </button>
                )}
              </div>
            )}
            {/* Upload Placeholders */}

            {/* Upload Button Placeholder */}
            {formData.imageUrl.length === 0 && uploadQueue.length === 0 && (
              <div
                onClick={handleFileSelect}
                className="w-[150px] h-[150px] bg-jinsook-light-pink rounded-xl flex items-center justify-center cursor-pointer hover:bg-jinsook-pink transition-colors duration-300"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">+</div>
                  <div className="text-sm">Choose Files</div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex gap-1  px-2 rounded-lg  font-body flex-col items-start text-[0.9rem]">
              <label className="block font-bold  font-heading text-[1rem] ">
                Category<span className="text-red-500">*</span>
              </label>{' '}
              <div className="flex flex-col sm:flex-row gap-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="paintings"
                    checked={formData.category === 'paintings'}
                    onChange={handleChange}
                    required
                    className="form-radio"
                  />
                  <span className="ml-2">Paintings</span>
                </label>
                <label className="inline-flex items-center ">
                  <input
                    type="radio"
                    name="category"
                    value="goods"
                    checked={formData.category === 'goods'}
                    onChange={handleChange}
                    required
                    className="form-radio"
                  />
                  <span className="ml-2">Goods</span>
                </label>
                <label className="inline-flex items-center ">
                  <input
                    type="radio"
                    name="category"
                    value="childrens-books"
                    checked={formData.category === 'childrens-books'}
                    onChange={handleChange}
                    required
                    className="form-radio"
                  />
                  <span className="ml-2">Children&apos;s Books</span>
                </label>
                <label className="inline-flex items-center ">
                  <input
                    type="radio"
                    name="category"
                    value="crafts"
                    checked={formData.category === 'crafts'}
                    onChange={handleChange}
                    required
                    className="form-radio"
                  />
                  <span className="ml-2">Crafts</span>
                </label>
              </div>
            </div>{' '}
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
                <label className="block font-bold  font-heading ">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="rounded-sm appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
              <label className="block font-bold  font-heading ">
                Price(NZD)
              </label>{' '}
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="NZD"
                className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>
            <div className="flex gap-4 items-start bg-white px-2 rounded-lg">
              <label className="block font-bold  font-heading ">
                Description
              </label>{' '}
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                rows={5}
              />
            </div>
            {iscrafts ? (
              <>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
                    <label className="block font-bold  font-heading whitespace-nowrap ">
                      Product Type<span className="text-red-500">*</span>
                    </label>{' '}
                    <input
                      type="text"
                      name="theme"
                      required
                      value={formData.theme}
                      onChange={handleChange}
                      className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 ">
                    {filteredHandcraftTypes.slice(0, 6).map((type, index) => (
                      <span
                        key={index}
                        className="p-1 bg-jinsook-light-pink text-[0.6rem] hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out rounded-sm "
                        onClick={() => handleThemeChange(type)}
                        name="theme"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {' '}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
                    <label className="block font-bold  font-heading ">
                      Theme
                    </label>{' '}
                    <input
                      type="text"
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                      className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 ">
                    {filteredThemes.slice(0, 6).map((theme) => (
                      <span
                        key={theme}
                        className="p-1 bg-jinsook-light-pink text-[0.6rem] hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out rounded-sm "
                        onClick={() => handleThemeChange(theme)}
                        name="theme"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
              <label className="block font-bold  font-heading ">
                Dimensions
              </label>{' '}
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>
            <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
              <label className="block font-bold  font-heading ">Medium</label>{' '}
              <input
                type="text"
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>
            {/* set feature */}
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
              />
              <label className="block font-bold  font-heading ">Featured</label>
            </div>
            {/* set header */}
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                name="header"
                checked={formData.header}
                onChange={handleCheckboxChange}
              />
              <label className="block font-bold  font-heading ">
                Use for category header
              </label>
            </div>
            <div className="flex gap-6 w-full justify-center">
              <button
                type="button"
                onClick={handleCancel}
                className="hover:bg-jinsook-yellow bg-white hover:text-white text-jinsook-green font-body font-[600] py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:border-2 hover:border-jinsook-yellow border-jinsook-green transition duration-500 ease-in-out h-[40px] w-[120px] uppercase flex items-center justify-center"
              >
                cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-jinsook-green hover:bg-white text-white hover:text-jinsook-green font-body font-[600] py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:border-2 border-jinsook-green transition duration-500 ease-in-out h-[40px] w-[120px] uppercase flex items-center justify-center hover:shadow-xl"
              >
                {loading
                  ? isUpdate
                    ? 'Updating...'
                    : 'Creating...'
                  : isUpdate
                  ? 'Update'
                  : 'Create'}
              </button>
            </div>{' '}
            {error && (
              <div className="text-[.8rem] text-jinsook-yellow text-body">
                Error: {error.message}
              </div>
            )}
            {uploadError && (
              <div className="text-[.8rem] text-jinsook-yellow text-body">
                Error uploading image: {uploadError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ArtworkForm
