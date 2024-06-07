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
  const themes = [...new Set(sortedArtworks?.map((item) => item.theme))]
  const handcraftItems = sortedArtworks?.filter(
    (item) => item.category === 'handcrafts',
  )
  const handcraftTitles = [
    ...new Set(handcraftItems?.map((item) => item.title)),
  ]
  const HandcraftTypes = [...new Set(handcraftItems?.map((item) => item.theme))]
  const filteredHandcraftTypes = HandcraftTypes.filter((item) => item !== '')
  const filteredThemes = themes.filter((item) => item !== '')

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

  const isHandcrafts = formData.category === 'handcrafts'

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
  const handleTitleChange = (title) => {
    const newFormData = {
      ...formData,
      title: title,
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

  const loading = isUpdate ? updateLoading : createLoading
  const error = isUpdate ? updateError : createError

  return (
    <div className="fixed top-0 left-0 flex  w-screen h-screen items-start md:items-center justify-center backdrop-contrast-[0.25] pt-10 md:mt-0 overflow-y-auto ">
      <div className="flex flex-col gap-10 bg-jinsook-blue p-10 rounded-xl items-center w-[90%] 2xl:w-[50%] ">
        <Heading
          text={isUpdate ? 'Update Artwork' : 'Create Artwork'}
          color="#009379"
        />

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-start">
          {formData.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-[300px] object-contain rounded-xl"
            />
          ) : (
            <div className="bg-jinsook-light-pink w-[300px] lg:w-[200px] h-[300px] rounded-lg" />
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <input
                type="file"
                onChange={handleFileChange}
                required={!isUpdate}
                className="rounded-sm appearance-none border  w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              />
              {uploadProgress > 0 && (
                <progress value={uploadProgress} max="100" className=" w-full">
                  {uploadProgress}%
                </progress>
              )}
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
                    value="illustrations"
                    checked={formData.category === 'illustrations'}
                    onChange={handleChange}
                    required
                    className="form-radio"
                  />
                  <span className="ml-2">Illustrations</span>
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
                    value="handcrafts"
                    checked={formData.category === 'handcrafts'}
                    onChange={handleChange}
                    required
                    className="form-radio"
                  />
                  <span className="ml-2">Handcrafts</span>
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
              {isHandcrafts && (
                <div className="flex flex-wrap gap-2 ">
                  {handcraftTitles.slice(0, 6).map((title) => (
                    <span
                      key={title}
                      className="p-1 bg-jinsook-light-pink text-[0.6rem] hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out rounded-sm "
                      onClick={() => handleTitleChange(title)}
                      name="title"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              )}
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
            {isHandcrafts ? (
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
