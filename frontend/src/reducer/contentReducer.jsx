export const contentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        content: action.payload,
      }
    case 'CREATE_CONTENT':
      return {
        content: [...state.content, action.payload],
      }
    case 'UPDATE_CONTENT':
      return {
        content: state.content.map((content) =>
          content._id === action.payload._id ? action.payload : content,
        ),
      }
    case 'DELETE_CONTENT':
      return {
        content: state.content.filter(
          (content) => content._id !== action.payload._id,
        ),
      }
    default:
      return state
  }
}
