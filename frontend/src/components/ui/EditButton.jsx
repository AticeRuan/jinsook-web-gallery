import Edit from '../svg/edit'
import { useAuthContext } from '../../hooks/useAuthContext'

const EditButton = ({ isEditing, onEdit, className = '' }) => {
  const { user } = useAuthContext()

  if (!user || isEditing) return null

  return (
    <button
      className={`text-jinsook-green text-bold flex gap-1 items-center hover:text-jinsook-dark-green transition-colors duration-300 ${className}`}
      onClick={onEdit}
    >
      <div className="w-6 h-6">
        <Edit />
      </div>
      Edit
    </button>
  )
}

export default EditButton
