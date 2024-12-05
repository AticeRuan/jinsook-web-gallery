import PageTitle from '../components/ui/pageTitle'
import portrait from '../assets/portrait.jpg'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useContentContext } from '../hooks/useContentContext'
import useUpdate from '../hooks/useUpdate'
import useRead from '../hooks/useRead'
import ContentEditor from '../components/ui/ContentEditor'
import EditButton from '../components/ui/EditButton'
import Loader from '../components/ui/loader'
import Refresh from '../components/ui/refresh'
const About = () => {
  const detailRef = useRef()
  // const detailInView = useInView(detailRef)

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
  } = useRead('contents/about')
  const bioContent = localContent?.filter(
    (content) => content.section === 'bio',
  )
  const detailContent = localContent?.filter(
    (content) => content.section === 'detail',
  )

  const [isBioEditing, setIsBioEditing] = useState(false)
  const [isDetailEditing, setIsDetailEditing] = useState(false)

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
          setIsBioEditing(false)
          setIsDetailEditing(false)
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
      className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-16 md:gap-28 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* heading */}
      <motion.div
        className="flex items-center  w-full mt-10 "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
      >
        <PageTitle heading="About Jinsook" />
      </motion.div>
      {/* bio */}
      <motion.div
        className="w-screen flex items-center  justify-center bg-jinsook-blue py-10 "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-center lg:w-[780px] md:w-[650px] flex-col md:flex-row gap-10 ">
          {/* profile */}
          <div className="flex flex-col items-center md:items-start justify-center w-[70rem]">
            <img
              src={portrait}
              alt="jinsook portrait"
              className="w-[200px] md:w-[500px] mb-4"
            />
            <p className="font-heading text-[1rem] font-bold">Jinsook Taylor</p>
            <p className="font-body text-[.9rem] font-[500]  tracking-wide">
              Artist/Story-writter
            </p>
          </div>
          {/* bio blurb */}
          <div className="flex flex-col items-start justify-center w-[300px] md:w-auto text-justify">
            <p className="font-heading font-bold text-[1.2rem]">Bio</p>

            {isBioEditing && bioContent?.[0] ? (
              <ContentEditor
                content={bioContent[0]}
                section="bio"
                page="about"
                onSave={handleContentSave}
              />
            ) : (
              bioContent?.[0]?.text.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-body font-[500] text-sm md:text-[1rem] mb-2"
                >
                  {paragraph}
                </p>
              ))
            )}
            <EditButton
              isEditing={isBioEditing}
              onEdit={() => setIsBioEditing(true)}
            />
          </div>
        </div>
      </motion.div>
      {/* detail */}
      <div ref={detailRef}>
        <motion.div
          className="md:w-[800px] px-12 md:px-20 flex flex-col items-center justify-center gap-5 mb-10 text-sm md:text-[1rem]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-3 items-start w-full">
            {isDetailEditing && detailContent?.[0] ? (
              <ContentEditor
                content={detailContent[0]}
                section="detail"
                page="about"
                onSave={handleContentSave}
              />
            ) : (
              detailContent?.[0]?.text.map((paragraph, index) => (
                <p
                  key={index}
                  className="even:font-heading even:bg-transparent even:text-black font-[500] text-white font-body  bg-jinsook-green w-full"
                >
                  {paragraph}
                </p>
              ))
            )}
            <EditButton
              isEditing={isDetailEditing}
              onEdit={() => setIsDetailEditing(true)}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default About
