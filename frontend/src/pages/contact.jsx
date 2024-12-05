import ContactForm from '../components/contact/contactForm'
import PageTitle from '../components/ui/pageTitle'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContentContext } from '../hooks/useContentContext'
import useUpdate from '../hooks/useUpdate'
import useRead from '../hooks/useRead'
import { useCallback, useEffect, useState } from 'react'
import ContentEditor from '../components/ui/ContentEditor'
import EditButton from '../components/ui/EditButton'
import Refresh from '../components/ui/refresh'
import Loader from '../components/ui/loader'

const Contact = () => {
  let { state } = useLocation()

  //content management logic
  const { content: localContent, dispatch } = useContentContext()
  const {
    updateData: updateContent,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useUpdate()
  const {
    data: content,
    loading: loadingContent,
    error: errorContent,
  } = useRead('contents/contact')

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (content) {
      dispatch({ type: 'SET_CONTENT', payload: content })
    }
  }, [content, dispatch])

  const handleContentSave = useCallback(
    async ({ contentId, updateData }) => {
      try {
        const endpoint = `contents/${contentId}`
        const response = await updateContent(endpoint, updateData)
        if (response) {
          dispatch({ type: 'UPDATE_CONTENT', payload: response })
          setIsEditing(false)
        }
      } catch (error) {
        console.error('Error updating content:', error)
      }
    },
    [dispatch, updateContent],
  )
  if (loadingContent || loadingUpdate)
    return (
      <motion.div
        className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Loader />
      </motion.div>
    )
  if (errorContent || errorUpdate)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center flex-col font-bold">
        Something went wrong...
        <Refresh />
      </div>
    )

  return (
    <motion.section
      className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-28 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* heading */}
      <motion.div
        className="text-start w-full mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <PageTitle heading="Contact Jinsook " />
      </motion.div>
      <div className="flex flex-col lg:flex-row w-full px-5 md:px-20 items-start gap-10 xl:px-5  ">
        {/* blurb */}
        <motion.div
          className="flex flex-col gap-12 md:gap-20 items-start justify-center lg:w-1/2 lg:pr-10 "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <p className="font-heading font-[700] text-[2rem]">
            Let&apos;s work togther
          </p>

          {isEditing && localContent?.[0] ? (
            <ContentEditor
              content={localContent[0]}
              section="header"
              page="contact"
              onSave={handleContentSave}
            />
          ) : (
            localContent?.[0]?.text.map((paragraph, index) => (
              <p key={index} className="font-body text-[1rem] text-justify">
                {paragraph}
              </p>
            ))
          )}

          <EditButton isEditing={isEditing} onEdit={() => setIsEditing(true)} />
        </motion.div>
        {/* form */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <ContactForm subject={state && state.subject} />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contact
