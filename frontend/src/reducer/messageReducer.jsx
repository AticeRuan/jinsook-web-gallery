export const messageReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_MESSAGE':
      return {
        messages: [action.payload, ...state.messages],
      }
    case 'SET_MESSAGE':
      return {
        messages: action.payload,
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
