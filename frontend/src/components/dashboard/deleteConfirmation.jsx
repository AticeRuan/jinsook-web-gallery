const DeleteConfirmation = ({ show, onConfirm, onCancel, loading, text }) => {
  return (
    show && (
      <div className="fixed top-0 left-0 flex w-screen h-screen items-center justify-center backdrop-contrast-[0.25] ">
        <div className="rounded-lg bg-jinsook-blue md:p-20 sm:p-10 p-5 m-5 flex flex-col gap-10 items-center justify-center font-body font-[500]">
          <p className="text-[1.2rem]">{text}</p>
          <div className=" flex gap-10">
            {' '}
            <button
              onClick={onCancel}
              className="text-jinsook-green hover:text-white border-jinsook-green hover:border-jinsook-yellow hover:bg-jinsook-yellow rounded-full border-2 font-heading px-2 w-[50px] text-sm hover:shadow-xl"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="text-white   bg-jinsook-green border-jinsook-green hover:border-red-700 hover:bg-red-700 rounded-full border-2 font-heading px-2 w-fit text-sm hover:shadow-xl"
            >
              {loading ? 'Deleting...' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default DeleteConfirmation
