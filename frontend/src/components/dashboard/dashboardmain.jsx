import Logout from '../auth/logout'
import ArtworkItem from './artworkItem'
import { useState, useEffect } from 'react'
import ArtworkForm from './artworkForm'
import DeleteConfirmation from './deleteConfirmation'
import useDelete from '../../hooks/useDelete'
import ChangePasswordForm from '../auth/changePassword'

const DashboardMain = ({
  user,
  paintings,
  illustrations,
  books,
  handcrafts,
  featured,
  headers,
  paintingsThemes,
  illustrationsThemes,
  booksThemes,
  handcraftsThemes,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currectData, setCurrentData] = useState(paintings)
  const [currentThemes, setCurrentThemes] = useState(paintingsThemes)
  const [activeCategory, setActiveCategory] = useState('paintings')

  //   const [deleteItemId, setDeleteItemId] = useState(null)
  const { deleteData, loading: deleteLoading } = useDelete()
  const isEmpty = currentThemes && currentThemes.length === 0
  const handleCreateClick = () => {
    setShowCreateModal(true)
  }

  useEffect(() => {
    if (paintings) {
      setCurrentData(paintings)
    }
  }, [paintings])

  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
  }

  const handleUpdateClick = (item) => {
    setSelectedItem(item)
    setShowUpdateModal(true)
  }
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false)
    setSelectedItem(null)
  }

  const handleDeleteClick = (item) => {
    setShowConfirm(true)

    setSelectedItem(item)
  }
  const handleChangepasswordClick = () => {
    setShowPasswordUpdate(true)
  }
  const handleChangepasswordClose = () => {
    setShowPasswordUpdate(false)
  }

  const handleDelete = () => {
    if (selectedItem) {
      const endpoint = `/api/artworks/${selectedItem.category}/${selectedItem._id}`
      deleteData(endpoint)
      setShowConfirm(false)
      setSelectedItem(null)
    }
  }

  return (
    <section className="relative  h-[80vh] lg:h-[50vh] w-full  z-10 bg-white rounded-2xl lg:m-10 sm:p-10 p-5 overflow-auto flex flex-col gap-5 ">
      <div className="flex gap-3 md:gap-10 md:items-center flex-col lg:flex-row items-start place-content-center">
        <p className="text-[1.5rem] font-body text-jinsook-green tracking-widest font-bold ">
          Welcome back {user.username}!
        </p>
        <div className="flex items-center justify-start gap-2 flex-wrap md:gap-5">
          <Logout />
          <button
            onClick={handleChangepasswordClick}
            className="bg-jinsook-yellow hover:bg-white text-black hover:text-jinsook-yellow font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-500 ease-in-out w-[175px] md:w-[220px] h-[35px] md:h-[40px] border-jinsook-yellow hover:border-2 uppercase flex items-center justify-center text-[.8rem] md:text-[1rem] font-heading "
          >
            Change password
          </button>
          <button
            onClick={handleCreateClick}
            className="text-[1.5rem] md:text-[2rem] font-bold rounded-full border-2 border-jinsook-green md:w-[50px] md:h-[50px] w-[35px] h-[35px] flex items-center justify-center text-jinsook-green font-heading hover:bg-jinsook-green hover:text-white transition duration-500 ease-in-out "
          >
            +
          </button>
        </div>
      </div>
      <div className="flex lg:flex-col lg:gap-10 mt-8 lg:mt-10  ">
        <div className="flex items-center justify-start flex-col lg:flex-row gap-16 lg:gap-0">
          <button
            className="text-jinsook-green border-t-2 border-l-2 border-r-2 rounded-tr-lg  rounded-tl-lg p-2 border-jinsook-green lg:mr-2 rotate-[270deg] lg:rotate-0 hover:bg-jinsook-green hover:text-white transition duration-500 ease-in-out"
            onClick={() => {
              setCurrentData(paintings)
              setCurrentThemes(paintingsThemes)
              setActiveCategory('paintings')
            }}
            style={
              activeCategory === 'paintings'
                ? { backgroundColor: '#009379', color: '#fff' }
                : {}
            }
          >
            Paintings
          </button>
          <button
            className="text-jinsook-green border-t-2 border-l-2 border-r-2 rounded-tr-lg  rounded-tl-lg p-2 border-jinsook-green lg:mr-2 rotate-[270deg] lg:rotate-0 hover:bg-jinsook-green hover:text-white transition duration-500 ease-in-out"
            onClick={() => {
              setCurrentData(illustrations)
              setCurrentThemes(illustrationsThemes)
              setActiveCategory('illustrations')
            }}
            style={
              activeCategory === 'illustrations'
                ? { backgroundColor: '#009379', color: '#fff' }
                : {}
            }
          >
            Illustrations
          </button>
          <button
            className="text-jinsook-green border-t-2 border-l-2 border-r-2 rounded-tr-lg  rounded-tl-lg p-2 border-jinsook-green lg:mr-2 rotate-[270deg] lg:rotate-0 hover:bg-jinsook-green hover:text-white transition duration-500 ease-in-out"
            onClick={() => {
              setCurrentData(books)
              setCurrentThemes(booksThemes)
              setActiveCategory('books')
            }}
            style={
              activeCategory === 'books'
                ? { backgroundColor: '#009379', color: '#fff' }
                : {}
            }
          >
            Children&apos;s Books
          </button>
          <button
            className="text-jinsook-green border-t-2 border-l-2 border-r-2 rounded-tr-lg  rounded-tl-lg p-2 border-jinsook-green lg:mr-2 rotate-[270deg] lg:rotate-0 hover:bg-jinsook-green hover:text-white transition duration-500 ease-in-out"
            onClick={() => {
              setCurrentData(handcrafts)
              setCurrentThemes(handcraftsThemes)
              setActiveCategory('handcrafts')
            }}
            style={
              activeCategory === 'handcrafts'
                ? { backgroundColor: '#009379', color: '#fff' }
                : {}
            }
          >
            Handcrafts
          </button>
          <button
            className="text-jinsook-green border-t-2 border-l-2 border-r-2 rounded-tr-lg  rounded-tl-lg p-2 border-jinsook-green lg:mr-2 rotate-[270deg] lg:rotate-0 hover:bg-jinsook-green hover:text-white transition duration-500 ease-in-out"
            onClick={() => {
              setCurrentData(featured)
              setCurrentThemes([])
              setActiveCategory('featured')
            }}
            style={
              activeCategory === 'featured'
                ? { backgroundColor: '#009379', color: '#fff' }
                : {}
            }
          >
            Featured
          </button>
          <button
            className="text-jinsook-green border-t-2 border-l-2 border-r-2 rounded-tr-lg  rounded-tl-lg p-2 border-jinsook-green lg:mr-2 rotate-[270deg] lg:rotate-0 hover:bg-jinsook-green hover:text-white transition duration-500 ease-in-out"
            onClick={() => {
              setCurrentData(headers)
              setCurrentThemes([])
              setActiveCategory('headers')
            }}
            style={
              activeCategory === 'headers'
                ? { backgroundColor: '#009379', color: '#fff' }
                : {}
            }
          >
            Header
          </button>
        </div>
        <div className=" border-l-2 lg:border-none border-jinsook-green  w-full overflow-y-auto overflow-x-hidden flex flex-col gap-10 -ml-6 lg:ml-0 ">
          {currentThemes &&
            currentThemes.length !== 0 &&
            currentThemes.map((theme) => (
              <div key={theme} className="flex flex-col gap-8  ">
                <h1 className="text-[1.2rem] font-bold font-heading pl-4">
                  {theme}
                </h1>
                <div className="grid grid-cols-2 md:flex flex-wrap gap-1 place-content-start">
                  {currectData &&
                    currectData
                      .filter((artwork) => artwork.theme === theme)
                      .map((artwork) => (
                        <ArtworkItem
                          item={artwork}
                          key={artwork._id}
                          user={user}
                          onUpdateClick={handleUpdateClick}
                          onDeleteClick={handleDeleteClick}
                        />
                      ))}
                </div>
              </div>
            ))}
          <div className="grid grid-cols-2 lg:flex flex-wrap gap-1 place-content-start">
            {isEmpty &&
              currectData &&
              currectData.map((artwork) => (
                <ArtworkItem
                  item={artwork}
                  key={artwork._id}
                  user={user}
                  onUpdateClick={handleUpdateClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
          </div>

          {showCreateModal && (
            <div className="">
              <ArtworkForm onClose={handleCloseCreateModal} />
            </div>
          )}
          {showUpdateModal && selectedItem && (
            <div className="">
              <ArtworkForm
                item={selectedItem}
                onClose={handleCloseUpdateModal}
              />
            </div>
          )}
          <DeleteConfirmation
            show={showConfirm}
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
            loading={deleteLoading}
          />
          {showPasswordUpdate && (
            <ChangePasswordForm onClose={handleChangepasswordClose} />
          )}
        </div>
      </div>
    </section>
  )
}

export default DashboardMain
