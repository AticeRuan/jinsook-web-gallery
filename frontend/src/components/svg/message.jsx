const Message = ({ color = '#947ac2' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M4.455 16L0 19.5V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1V15C20 15.2652 19.8946 15.5196 19.7071 15.7071C19.5196 15.8946 19.2652 16 19 16H4.455ZM5 7V9H7V7H5ZM9 7V9H11V7H9ZM13 7V9H15V7H13Z"
        fill={color}
      />
    </svg>
  )
}

export default Message
