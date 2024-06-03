import { useState, useEffect } from 'react'
import useCreate from '../../hooks/useCreate'
import useUpdate from '../../hooks/useUpdate'
import useUploadImage from '../../hooks/useImageUpload'

const ArtworkForm = ({ item, onClose }) => {
  const isUpdate = !!item
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    imageUrl: '',
    featured: 'false',
    theme: '',
  })

  const handleRadioChange = (e) => {
    const value = e.target.value === 'true'
    setFormData((prevData) => ({
      ...prevData,
      featured: value,
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

  useEffect(() => {
    if (isUpdate) {
      setFormData({
        title: item.title,
        category: item.category,
        price: item.price,
        imageUrl: item.imageUrl || '',
        theme: item.theme,
        featured: item.featured,
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
      createData(formData)
    }
    onClose()
  }

  const loading = isUpdate ? updateLoading : createLoading
  const error = isUpdate ? updateError : createError

  return (
    <div className="flex flex-col w-[50vw] ">
      <h2>{isUpdate ? 'Update Artwork' : 'Create Artwork'}</h2>
      {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" />}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Theme:
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
          />
        </label>
        {/* radio section */}
        <div>
          <p>Featured:</p>
          <div>
            <label>
              <input
                type="radio"
                name="featured"
                value="true"
                checked={formData.featured === true}
                onChange={handleRadioChange}
              />
              Yes
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="featured"
                value="false"
                checked={formData.featured === false}
                onChange={handleRadioChange}
              />
              No
            </label>
          </div>
        </div>

        <input type="file" onChange={handleFileChange} />
        {uploadProgress > 0 && (
          <progress value={uploadProgress} max="100">
            {uploadProgress}%
          </progress>
        )}
        {imageUrl && <img src={imageUrl} alt="Uploaded" />}
        <button type="submit" disabled={loading}>
          {loading
            ? isUpdate
              ? 'Updating...'
              : 'Creating...'
            : isUpdate
            ? 'Update'
            : 'Create'}
        </button>
      </form>
      {error && <div>Error: {error.message}</div>}
      {uploadError && <div>Error uploading image: {uploadError}</div>}
    </div>
  )
}

export default ArtworkForm
