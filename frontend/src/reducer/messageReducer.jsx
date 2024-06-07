export const messageReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_MESSAGE':
      return {
        messages: [...state.messages, action.payload],
      }
    case 'SET_MESSAGES':
      return {
        messages: action.payload,
      }
    case 'UPDATE_MESSAGE':
      return {
        messages: state.messages.map((message) =>
          message._id === action.payload._id ? action.payload : message,
        ),
      }
    case 'DELETE_MESSAGE':
      return {
        messages: state.messages.filter(
          (message) => message._id !== action.payload._id,
        ),
      }
    default:
      return state
  }
}
