import Logout from '../auth/logout'
import ArtworkItem from './artworkItem'
import { useState } from 'react'
import ArtworkForm from './artworkForm'
import DeleteConfirmation from './deleteConfirmation'
import useDelete from '../../hooks/useDelete'
import ChangePasswordForm from '../auth/changePassword'
const DashboardMain = ({ user, data }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  //   const [deleteItemId, setDeleteItemId] = useState(null)
  const { deleteData, loading: deleteLoading } = useDelete()
  const handleCreateClick = () => {
    setShowCreateModal(true)
  }

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
    <section className="relative w-screen h-fit">
      <h1>Dashboard</h1>
      <p>Welcome back {user.username}</p>
      <Logout />
      <button onClick={handleChangepasswordClick}>Change password</button>
      <div className="flex items-center justify-center gap-6 relative flex-col">
        <button onClick={handleCreateClick}>Create</button>
        <div className="flex items-center justify-start flex-wrap gap-7 ">
          {data &&
            data.map((item) => (
              <ArtworkItem
                item={item}
                key={item._id}
                user={user}
                onUpdateClick={handleUpdateClick}
                onDeleteClick={handleDeleteClick}
              />
            ))}
        </div>
        {showCreateModal && (
          <div className="absolute flex  justify-center w-screen h-full backdrop-blur-lg top-0">
            <div className="">
              <span className="cursor-pointer" onClick={handleCloseCreateModal}>
                &times;
              </span>
              <ArtworkForm onClose={handleCloseCreateModal} />
            </div>
          </div>
        )}
        {showUpdateModal && selectedItem && (
          <div className="absolute flex items-center justify-center w-screen h-fit backdrop-blur-lg top-0">
            <div className="">
              <span className="cursor-pointer" onClick={handleCloseUpdateModal}>
                &times;
              </span>
              <ArtworkForm
                item={selectedItem}
                onClose={handleCloseUpdateModal}
              />
            </div>
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
    </section>
  )
}

export default DashboardMain
