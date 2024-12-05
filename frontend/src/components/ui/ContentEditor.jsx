import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const ContentEditor = ({ content, section, onSave, page }) => {
  const [paragraphs, setParagraphs] = useState(content?.text || [])
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
    setParagraphs(newParagraphs)
  }

  const handleSubmit = () => {
    if (!content?._id) {
      console.error('No content ID available')
      return
    }

    onSave({
      contentId: content._id,
      updateData: {
        page,
        section,
        text: paragraphs.filter((p) => p.trim() !== ''),
      },
    })
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
          <button
            onClick={() => handleRemoveParagraph(index)}
            className="text-red-500 hover:text-red-700"
            type="button"
          >
            ×
          </button>
        </div>
      ))}
      <div className="flex gap-2 flex-col">
        <button
          onClick={handleAddParagraph}
          className="text-jinsook-green hover:text-white hover:bg-jinsook-green border border-jinsook-green rounded-full px-4 py-2 text-sm transition-colors"
          type="button"
        >
          Add Paragraph
        </button>
        <button
          onClick={handleSubmit}
          className="bg-jinsook-green text-white hover:bg-white hover:text-jinsook-green border border-jinsook-green rounded-full px-4 py-2 text-sm transition-colors"
          type="button"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default ContentEditor
