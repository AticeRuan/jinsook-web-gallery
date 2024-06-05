const Heading = ({ text, color = '#CE88BA' }) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <p className="text-[1.3rem] md:text-[2rem] font-bold capitalize">
        {text}
      </p>
      <div
        className="w-[5rem] h-[3px] rounded"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  )
}

export default Heading
