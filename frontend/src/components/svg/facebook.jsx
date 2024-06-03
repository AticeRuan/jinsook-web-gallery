const Facebook = ({ color = 'black' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M23.566 0.432983H4.433C2.233 0.432983 0.432999 2.23298 0.432999 4.43298V23.568C0.432999 25.768 2.233 27.568 4.433 27.568H23.568C25.768 27.568 27.568 25.768 27.568 23.568V4.43298C27.566 2.23298 25.768 0.432983 23.566 0.432983ZM23.309 14.916H20.089V26.566H15.271V14.916H12.861V10.9H15.271V8.48998C15.271 5.21398 16.631 3.26498 20.501 3.26498H23.718V7.27998H21.706C20.202 7.27998 20.102 7.84298 20.102 8.88998L20.089 10.9H23.734L23.309 14.916Z"
        fill={color}
      />
    </svg>
  )
}

export default Facebook