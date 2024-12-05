import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const ContentEditor = ({ content, section, onSave, page }) => {
  const [paragraphs, setParagraphs] = useState(
    content?.text?.length > 0 ? content.text : [''],
  )
  const { user } = useAuthContext()

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...paragraphs]
    newParagraphs[index] = value
    setParagraphs(newParagraphs)
  }

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, ''])
  }

  const handleRemoveParagraph = (index) => {
    const newParagraphs = paragraphs.filter((_, i) => i !== index)
    setParagraphs(newParagraphs.length > 0 ? newParagraphs : [''])
  }

  const handleSubmit = () => {
    const filteredParagraphs = paragraphs.filter((p) => p.trim() !== '')

    if (filteredParagraphs.length === 0) {
      return
    }

    onSave({
      contentId: content?._id,
      updateData: {
        page,
        section,
        text: filteredParagraphs,
      },
    })
  }

  const handleReset = () => {
    setParagraphs(content?.text?.length > 0 ? [...content.text] : [''])
  }

  if (!user) return null

  return (
    <div className="w-full space-y-4 flex justify-center flex-col items-center">
      {paragraphs.map((paragraph, index) => (
        <div
          key={index}
          className="flex gap-2 w-full items-center justify-between
        "
        >
          <textarea
            value={paragraph}
            onChange={(e) => handleParagraphChange(index, e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-jinsook-green"
            rows={3}
          />
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleRemoveParagraph(index)}
              className="text-red-500 hover:text-red-700 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={paragraphs.length === 1}
            >
              Remove
            </button>
            {/* <label htmlFor="">
              <input type="checkbox" className="mr-3" value/>
              Bold
            </label> */}
          </div>
        </div>
      ))}
      <div className="flex gap-2 ">
        <button
          onClick={handleAddParagraph}
          className="bg-blue-200 text-xs p-1 rounded-full  hover:bg-white hover:text-blue-200 border border-blue-200 transition-colors h-fit"
          type="button"
        >
          Add Paragraph
        </button>
        <button
          onClick={handleReset}
          className="bg-pink-200 text-xs p-1 rounded-full  hover:bg-white hover:text-pink-200 border border-pink-200 transition-colors h-fit"
          type="button"
        >
          Reset
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-300 text-xs p-1 rounded-full  hover:bg-white hover:text-green-200 border border-green-200 transition-colors h-fit"
          type="button"
        >
          {content?._id ? 'Save' : 'Create Content'}
        </button>
      </div>
    </div>
  )
}

export default ContentEditor
