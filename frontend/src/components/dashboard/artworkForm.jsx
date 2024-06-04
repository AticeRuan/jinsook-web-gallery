import { useState, useEffect } from 'react'
import useCreate from '../../hooks/useCreate'
import useUpdate from '../../hooks/useUpdate'
import useUploadImage from '../../hooks/useImageUpload'
import Heading from '../ui/heading'
import { useArtworksContext } from '../../hooks/useArtworksContext'

const ArtworkForm = ({ item, onClose }) => {
  const { artworks } = useArtworksContext()
  const sortedArtworks = artworks?.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  )
  const Themes = [...new Set(sortedArtworks?.map((item) => item.theme))]

  const isUpdate = !!item
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    imageUrl: '',
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

  const { createData, loading: createLoading, error: createError } = useCreate()
  const { updateData, loading: updateLoading, error: updateError } = useUpdate()
  const {
    uploadProgress,
    imageUrl,
    error: uploadError,
    uploadImage,
  } = useUploadImage()
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    uploadImage(file, formData.category)
  }

  const handleThemeChange = (theme) => {
    const newFormData = {
      ...formData,
      theme: theme,
    }
    setFormData(newFormData)
  }

  useEffect(() => {
    if (isUpdate) {
      setFormData({
        title: item.title,
        category: item.category,
        price: item.price,
        imageUrl: item.imageUrl || '',
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
        imageUrl: imageUrl,
      }))
    }
  }, [imageUrl])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isUpdate) {
      const endpoint = `/api/artworks/${item.category}/${item._id}`
      updateData(endpoint, formData)
    } else {
      const formDataWithHeader = {
        ...formData,
        header: formData.header,
        medium: formData.medium,
        description: formData.description,
        dimensions: formData.dimensions,
      }
      createData(formDataWithHeader)
    }
    onClose()
  }

  const loading = isUpdate ? updateLoading : createLoading
  const error = isUpdate ? updateError : createError

  return (
    <div className="fixed top-0 left-0 flex w-screen h-screen items-center justify-center backdrop-contrast-[0.25]  ">
      <div className="flex flex-col gap-10 bg-jinsook-blue p-10 rounded-xl items-center">
        <Heading
          text={isUpdate ? 'Update Artwork' : 'Create Artwork'}
          color="#009379"
        />

        <div className="flex flex-col lg:flex-row gap-10">
          {formData.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="h-[300px] object-cover rounded-xl"
            />
          ) : (
            <div className="bg-white w-[200px] h-[300px] rounded-lg" />
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
              <label className="block font-bold  font-heading ">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="rounded-sm appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>
            <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
              <label className="block font-bold  font-heading ">Category</label>{' '}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="rounded-sm appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white text-body"
              >
                <option value="" className="text-gray-300 text-body">
                  select a category
                </option>
                <option value="paintings">Paintings</option>
                <option value="illustrations">illustrations</option>
                <option value="childrens-books">Chidrens books</option>
                <option value="handcrafts">Handcraft</option>
              </select>
            </div>
            <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
              <label className="block font-bold  font-heading ">Price</label>{' '}
              <input
                type="text"
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
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
                <label className="block font-bold  font-heading ">Theme</label>{' '}
                <input
                  type="text"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {Themes.slice(0, 6).map((theme) => (
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
            <div className="flex gap-4 items-center bg-white px-2 rounded-lg">
              <label className="block font-bold  font-heading ">
                Dimentions
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
            <input
              type="file"
              onChange={handleFileChange}
              required={!isUpdate}
              className="rounded-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            />
            {uploadProgress > 0 && (
              <progress
                value={uploadProgress}
                max="100"
                className="mx-2 my-5 w-full"
              >
                {uploadProgress}%
              </progress>
            )}
            <div className="flex gap-6 w-full justify-center">
              <button
                onClick={onClose}
                className="hover:bg-jinsook-yellow bg-white hover:text-white text-jinsook-green font-body font-[600] py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:border-2 hover:border-jinsook-yellow border-jinsook-green transition duration-500 ease-in-out h-[40px] w-[120px] uppercase flex items-center justify-center"
              >
                cancle
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-jinsook-green hover:bg-white text-white hover:text-jinsook-green font-body font-[600] py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:border-2 border-jinsook-green transition duration-500 ease-in-out h-[40px] w-[120px] uppercase flex items-center justify-center"
              >
                {loading
                  ? isUpdate
                    ? 'Updating...'
                    : 'Creating...'
                  : isUpdate
                  ? 'Update'
                  : 'Create'}
              </button>
            </div>
          </form>
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
        </div>
      </div>
    </div>
  )
}

export default ArtworkForm
