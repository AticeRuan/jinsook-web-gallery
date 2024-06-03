export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        user: null,
      }
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload.token,
        },
      }
    default:
      return state
  }
}
