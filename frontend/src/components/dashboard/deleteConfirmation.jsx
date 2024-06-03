const DeleteConfirmation = ({ show, onConfirm, onCancel, loading }) => {
  return (
    show && (
      <div className="absolute flex w-screen h-screen items-center justify-center backdrop-blur-sm">
        <p>Are you sure you want to delete this artwork?</p>
        <button onClick={onConfirm} disabled={loading}>
          {loading ? 'Deleting...' : 'Yes'}
        </button>
        <button onClick={onCancel}>No</button>
      </div>
    )
  )
}

export default DeleteConfirmation
