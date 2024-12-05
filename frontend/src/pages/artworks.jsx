import CategoryCard from '../components/artworks/categoryCard'
import Heading from '../components/ui/heading'
import Loader from '../components/ui/loader'
import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import placeholder from '../assets/portrait.jpg'
import usePreviousPath from '../hooks/usePreviousPath'
import { motion } from 'framer-motion'
import Refresh from '../components/ui/refresh'
import { useContentContext } from '../hooks/useContentContext'
import useUpdate from '../hooks/useUpdate'
import { useCallback, useEffect, useState } from 'react'
import ContentEditor from '../components/ui/ContentEditor'
import EditButton from '../components/ui/EditButton'
const Artworks = () => {
  const { data, loading, error } = useRead('artworks')
  const headerArtworks = data?.filter((artwork) => artwork.header === true)
  const previousPath = usePreviousPath()
  const paintingHeader = headerArtworks?.filter(
    (artwork) => artwork.category === 'paintings',
  )

  const goodsHeader =
    headerArtworks &&
    headerArtworks.filter((artwork) => artwork.category === 'goods')

  const childrensBooksHeader =
    headerArtworks &&
    headerArtworks.filter((artwork) => artwork.category === 'childrens-books')

  const craftsHeader = headerArtworks?.filter(
    (artwork) => artwork.category === 'crafts',
  )

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
  } = useRead('contents/category')
  const paintingsIntro = localContent?.filter(
    (content) => content.section === 'paintings',
  )
  const craftIntro = localContent?.filter(
    (content) => content.section === 'crafts',
  )
  const goodIntro = localContent?.filter(
    (content) => content.section === 'goods',
  )
  const bookIntro = localContent?.filter(
    (content) => content.section === 'books',
  )
  const headerContent = localContent?.filter(
    (content) => content.section === 'header',
  )

  const [isHeaderEditing, setIsHeaderEditing] = useState(false)
  const [isPaintingEditing, setIsPaintingEditing] = useState(false)
  const [isGoodEditing, setIsGoodEditing] = useState(false)
  const [isBookEditing, setIsBookEditing] = useState(false)
  const [isCraftEditing, setIsCraftEditing] = useState(false)

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
          setIsHeaderEditing(false)
          setIsPaintingEditing(false)
          setIsGoodEditing(false)
          setIsBookEditing(false)
          setIsCraftEditing(false)
        }
      } catch (error) {
        console.error('Error updating content:', error)
      }
    },
    [dispatch, updateContent],
  )

  if (loading || loadingContent || loadingUpdate) {
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center justify-center z-10 relative ">
        <Loader />
      </div>
    )
  }

  if (error || errorContent || errorUpdate) {
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center justify-center z-10 relative font-bold">
        Something went wrong...
        <Refresh />
      </div>
    )
  }

  return (
    <motion.section
      className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-start w-full mt-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <PageTitle
          heading="Artworks"
          desc={
            isHeaderEditing && headerContent?.[0] ? (
              <ContentEditor
                content={headerContent[0]}
                section="header"
                page="category"
                onSave={handleContentSave}
              />
            ) : (
              headerContent?.[0]?.text.map((paragraph, index) => (
                <p key={index} className="mb-2">
                  {paragraph}
                </p>
              ))
            )
          }
        />{' '}
        <EditButton
          isEditing={isHeaderEditing}
          onEdit={() => setIsHeaderEditing(true)}
          className="bg-white p-2 rounded-md"
        />
      </motion.div>
      {/* large screens */}
      <motion.div
        className="lg:flex flex-col gap-20 w-full items-center justify-center hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Heading text="Products" color="#CDE7E3" />

        <CategoryCard
          category="paintings"
          desc={
            isPaintingEditing && paintingsIntro?.[0] ? (
              <ContentEditor
                content={paintingsIntro[0]}
                section="paintings"
                page="category"
                onSave={handleContentSave}
              />
            ) : (
              paintingsIntro?.[0]?.text.map((paragraph, index) => (
                <div key={index}>
                  <p className="mb-2">{paragraph}</p>{' '}
                  <EditButton
                    isEditing={isPaintingEditing}
                    onEdit={() => setIsPaintingEditing(true)}
                    className="w-full flex justify-center"
                  />
                </div>
              ))
            )
          }
          imgUrl={
            paintingHeader && paintingHeader.length > 0
              ? paintingHeader[0].imageUrl
              : placeholder
          }
          previousPath={previousPath}
        />
        <CategoryCard
          category="goods"
          desc={
            isGoodEditing && goodIntro?.[0] ? (
              <ContentEditor
                content={goodIntro[0]}
                section="goods"
                page="category"
                onSave={handleContentSave}
              />
            ) : (
              goodIntro?.[0]?.text.map((paragraph, index) => (
                <div key={index}>
                  <p className="mb-2">{paragraph}</p>{' '}
                  <EditButton
                    isEditing={isGoodEditing}
                    onEdit={() => setIsGoodEditing(true)}
                    className="w-full flex justify-center"
                  />
                </div>
              ))
            )
          }
          imgUrl={
            goodsHeader && goodsHeader.length > 0
              ? goodsHeader[0].imageUrl
              : placeholder
          }
          isReverse={true}
          previousPath={previousPath}
        />
        <CategoryCard
          category="childrens-books"
          desc={
            isBookEditing && bookIntro?.[0] ? (
              <ContentEditor
                content={bookIntro[0]}
                section="books"
                page="category"
                onSave={handleContentSave}
              />
            ) : (
              bookIntro?.[0]?.text.map((paragraph, index) => (
                <div key={index}>
                  <p className="mb-2">{paragraph}</p>{' '}
                  <EditButton
                    isEditing={isBookEditing}
                    onEdit={() => setIsBookEditing(true)}
                    className="w-full flex justify-center"
                  />
                </div>
              ))
            )
          }
          imgUrl={
            childrensBooksHeader && childrensBooksHeader.length > 0
              ? childrensBooksHeader[0].imageUrl
              : placeholder
          }
          previousPath={previousPath}
        />
        <CategoryCard
          category="crafts"
          desc={
            isCraftEditing && craftIntro?.[0] ? (
              <ContentEditor
                content={craftIntro[0]}
                section="crafts"
                page="category"
                onSave={handleContentSave}
              />
            ) : (
              craftIntro?.[0]?.text.map((paragraph, index) => (
                <div key={index}>
                  <p className="mb-2">{paragraph}</p>{' '}
                  <EditButton
                    isEditing={isCraftEditing}
                    onEdit={() => setIsCraftEditing(true)}
                    className="w-full flex justify-center"
                  />
                </div>
              ))
            )
          }
          imgUrl={
            craftsHeader && craftsHeader.length > 0
              ? craftsHeader[0].imageUrl
              : placeholder
          }
          isReverse={true}
          previousPath={previousPath}
        />
      </motion.div>
      {/* small screens */}
      <motion.div
        className="flex flex-col gap-20 w-full items-center justify-center lg:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Heading text="Products" color="#CDE7E3" />

        <CategoryCard
          category="paintings"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            paintingHeader && paintingHeader.length > 0
              ? paintingHeader[0].imageUrl
              : placeholder
          }
          isSmallScreen={true}
          previousPath={previousPath}
        />
        <CategoryCard
          category="goods"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            goodsHeader && goodsHeader.length > 0
              ? goodsHeader[0].imageUrl
              : placeholder
          }
          isSmallScreen={true}
          previousPath={previousPath}
        />
        <CategoryCard
          category="childrens-books"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            childrensBooksHeader && childrensBooksHeader.length > 0
              ? childrensBooksHeader[0].imageUrl
              : placeholder
          }
          isSmallScreen={true}
          previousPath={previousPath}
        />
        <CategoryCard
          category="crafts"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            craftsHeader && craftsHeader.length > 0
              ? craftsHeader[0].imageUrl
              : placeholder
          }
          isSmallScreen={true}
          previousPath={previousPath}
        />
      </motion.div>
    </motion.section>
  )
}

export default Artworks
