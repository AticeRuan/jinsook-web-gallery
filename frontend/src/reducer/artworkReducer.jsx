export const artworksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ARTWORKS':
      return {
        artworks: action.payload,
      }
    case 'CREATE_ARTWORK':
      return {
        artworks: [action.payload, ...state.artworks],
      }
    case 'DELETE_ARTWORK':
      return {
        artworks: state.artworks.filter(
          (artwork) => artwork._id !== action.payload._id,
        ),
      }
    case 'UPDATE_ARTWORK':
      return {
        ...state,
        artworks: state.artworks.map((artwork) =>
          artwork._id === action.payload._id ? action.payload : artwork,
        ),
      }
    default:
      return state
  }
}
