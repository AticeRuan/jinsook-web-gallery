export const artworksReducer = (state, action) => {
  let updatedArtwork
  let createdArtwork
  let createdArtworks
  let updatedArtworks
  let updatedArtworksAfterCreate
  switch (action.type) {
    case 'SET_ARTWORKS':
      return {
        artworks: action.payload,
      }
    case 'CREATE_ARTWORK':
      createdArtwork = action.payload
      createdArtworks = [...state.artworks, createdArtwork]
      updatedArtworksAfterCreate = createdArtwork.header
        ? createdArtworks.map((artwork) =>
            artwork.category === createdArtwork.category &&
            artwork._id !== createdArtwork._id
              ? { ...artwork, header: false }
              : artwork,
          )
        : createdArtworks
      return {
        ...state,
        artworks: updatedArtworksAfterCreate,
      }
    case 'DELETE_ARTWORK':
      return {
        artworks: state.artworks.filter(
          (artwork) => artwork._id !== action.payload._id,
        ),
      }
    case 'UPDATE_ARTWORK':
      updatedArtwork = action.payload
      updatedArtworks = state.artworks.map((artwork) => {
        let updatedArt
        if (artwork._id === updatedArtwork._id) {
          updatedArt = updatedArtwork
        } else if (
          artwork.header &&
          artwork.category === updatedArtwork.category
        ) {
          updatedArt = { ...artwork, header: false }
        } else {
          updatedArt = artwork
        }
        return updatedArt
      })
      return {
        ...state,
        artworks: updatedArtworks,
      }
    default:
      return state
  }
}
