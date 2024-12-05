import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import Heading from '../components/ui/heading'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
import usePreviousPath from '../hooks/usePreviousPath'
import { motion } from 'framer-motion'
import Refresh from '../components/ui/refresh'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useContentContext } from '../hooks/useContentContext'
import useUpdate from '../hooks/useUpdate'
import ContentEditor from '../components/ui/ContentEditor'
import EditButton from '../components/ui/EditButton'
const AllArtworksByTheme = () => {
  const { data: artworks, loading, error } = useRead(`artworks`)
  const previousPath = usePreviousPath()

  const sortedArtworks = useMemo(() => {
    if (!artworks) return []
    return artworks.sort((a, b) => {
      return a.theme.localeCompare(b.theme)
    })
  }, [artworks])

  const themes = [...new Set(artworks?.map((artwork) => artwork.theme))]

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
  } = useRead(`contents/theme`)

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

  if (loading || loadingContent || loadingUpdate)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative justify-center">
        <Loader />
      </div>
    )

  if (error || errorContent || errorUpdate)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative justify-center font-bold">
        Something went wrong...
        <Refresh />
      </div>
    )

  return (
    <motion.div
      className="max-w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-start w-full mt-10 flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <PageTitle
          heading="All Themes"
          desc={
            isEditing && localContent?.[0] ? (
              <ContentEditor
                content={content[0]}
                section="header"
                page="theme"
                onSave={handleContentSave}
              />
            ) : (
              localContent?.[0]?.text.map((paragraph, index) => (
                <p key={index} className="mb-2">
                  {paragraph}
                </p>
              ))
            )
          }
        />{' '}
        <EditButton isEditing={isEditing} onEdit={() => setIsEditing(true)} />
      </motion.div>
      <motion.div
        className="rounded-xl bg-white h-fit  p-10 w-[90%] flex flex-col items-center justify-center gap-10 mt-10  md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {artworks.length > 0 ? (
          themes.map((theme) => (
            <motion.div
              key={theme}
              className="text-center border-gray-200 py-5"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <Heading text={theme} color="#CDE7E3" />
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                {sortedArtworks
                  .filter((artwork) => artwork.theme === theme)
                  .map((artwork) => (
                    <ProductItem
                      item={artwork}
                      key={artwork._id}
                      previousPath={previousPath}
                    />
                  ))}
              </motion.div>
            </motion.div>
          ))
        ) : (
          <div className="text-center border-gray-200 py-5">
            <p className="text-gray-600 animate-pulse">Coming Soon...</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default AllArtworksByTheme
