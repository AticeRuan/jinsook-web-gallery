import PageTitle from '../components/ui/pageTitle'
import Heading from '../components/ui/heading'
import intro01 from '../assets/intro-01.png'
import intro02 from '../assets/intro-02.png'
import intro03 from '../assets/intro-03.png'
import IntroComponent from '../components/home/introComponent'
import ProductItem from '../components/ui/productItem'
import useRead from '../hooks/useRead'
import Loader from '../components/ui/loader'
import ContentEditor from '../components/ui/ContentEditor'

import usePreviousPath from '../hooks/usePreviousPath'
import { motion } from 'framer-motion'
import Refresh from '../components/ui/refresh'
import { useState, useCallback, useEffect } from 'react'
import { useContentContext } from '../hooks/useContentContext'
import useUpdate from '../hooks/useUpdate'
import EditButton from '../components/ui/EditButton'
const Home = () => {
  const { data: artworks, loading, error } = useRead('artworks')

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
  } = useRead('contents/home')
  const introContent = localContent?.filter(
    (content) => content.section === 'introduction',
  )
  const artWorkIntro = localContent?.filter(
    (content) => content.section === 'artwork-introduction',
  )
  const craftIntro = localContent?.filter(
    (content) => content.section === 'craft-introduction',
  )
  const bookIntro = localContent?.filter(
    (content) => content.section === 'book-introduction',
  )

  const [isIntroEditing, setIsIntroEditing] = useState(false)
  const [isArtworkEditing, setIsArtworkEditing] = useState(false)
  const [isCraftEditing, setIsCraftEditing] = useState(false)
  const [isBookEditing, setIsBookEditing] = useState(false)

  const previousPath = usePreviousPath()

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
          setIsIntroEditing(false)
          setIsArtworkEditing(false)
          setIsCraftEditing(false)
          setIsBookEditing(false)
        }
      } catch (error) {
        console.error('Error updating content:', error)
      }
    },
    [dispatch, updateContent],
  )

  const featuredArtworks = Array.isArray(artworks)
    ? artworks.filter((artwork) => artwork.featured === true)
    : []

  if (loading || loadingContent || loadingUpdate)
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
  if (error || errorContent || errorUpdate)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center flex-col font-bold">
        Something went wrong...
        <Refresh />
      </div>
    )

  return (
    <motion.section
      className="max-w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="mt-20  flex items-center justify-start flex-col "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {/* heading section */}
        <PageTitle
          heading="Jinsook Taylor"
          desc={
            isIntroEditing && introContent?.[0] ? (
              <ContentEditor
                content={introContent[0]}
                section="introduction"
                page="home"
                onSave={handleContentSave}
              />
            ) : (
              introContent?.[0]?.text.map((paragraph, index) => (
                <p key={index} className="mb-2">
                  {paragraph}
                </p>
              ))
            )
          }
        />{' '}
        <EditButton
          isEditing={isIntroEditing}
          onEdit={() => setIsIntroEditing(true)}
        />
      </motion.div>

      {/* owner's title section */}
      <div>
        <motion.div
          className="mt-20 flex flex-col justify-start"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <Heading text="Artistry & Storytelling" />
          <div className="bg-white rounded-lg flex items-center justify-center md:gap-20 gap-10 flex-col md:flex-row mt-10 px-10 py-28 w-[80vw] md:w-auto">
            <IntroComponent
              imgUrl={intro01}
              heading="Hand-drawn Artworks"
              desc={
                isArtworkEditing && artWorkIntro?.[0] ? (
                  <ContentEditor
                    content={artWorkIntro[0]}
                    section="artwork-introduction"
                    page="home"
                    onSave={handleContentSave}
                  />
                ) : (
                  artWorkIntro?.[0]?.text.map((paragraph, index) => (
                    <>
                      <p key={index} className="mb-2">
                        {paragraph}
                      </p>{' '}
                      <EditButton
                        isEditing={isArtworkEditing}
                        onEdit={() => setIsArtworkEditing(true)}
                        className="w-full flex justify-center"
                      />
                    </>
                  ))
                )
              }
            />

            <IntroComponent
              imgUrl={intro02}
              heading="Crafts"
              desc={
                isCraftEditing && craftIntro?.[0] ? (
                  <ContentEditor
                    content={craftIntro[0]}
                    section="craft-introduction"
                    page="home"
                    onSave={handleContentSave}
                  />
                ) : (
                  craftIntro?.[0]?.text.map((paragraph, index) => (
                    <>
                      <p key={index} className="mb-2">
                        {paragraph}
                      </p>{' '}
                      <EditButton
                        isEditing={isCraftEditing}
                        onEdit={() => setIsCraftEditing(true)}
                        className="w-full flex justify-center"
                      />
                    </>
                  ))
                )
              }
            />
            <IntroComponent
              imgUrl={intro03}
              heading="Children's Books"
              desc={
                isBookEditing && bookIntro?.[0] ? (
                  <ContentEditor
                    content={bookIntro[0]}
                    section="book-introduction"
                    page="home"
                    onSave={handleContentSave}
                  />
                ) : (
                  bookIntro?.[0]?.text.map((paragraph, index) => (
                    <>
                      <p key={index} className="mb-2">
                        {paragraph}
                      </p>{' '}
                      <EditButton
                        isEditing={isBookEditing}
                        onEdit={() => setIsBookEditing(true)}
                        className="w-full flex justify-center"
                      />
                    </>
                  ))
                )
              }
            />
          </div>
        </motion.div>
      </div>
      {/* feature products */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <Heading text="Featured Artworks" />
        <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 p-16 sm:p-20 w-auto md:p-10 gap-8 md:gap-20 place-content-center">
          {featuredArtworks.length > 0 ? (
            featuredArtworks.map((artwork) => (
              <ProductItem
                item={artwork}
                key={artwork._id}
                forFeatured={true}
                previousPath={previousPath}
              />
            ))
          ) : (
            <div className="text-center border-gray-200 py-5 flex items-center justify-center w-full">
              <p className="text-gray-600 animate-pulse">Coming Soon...</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Home
