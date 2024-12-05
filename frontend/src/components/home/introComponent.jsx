const IntroComponent = ({ imgUrl, heading, desc }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-[200px]">
      <img
        src={imgUrl}
        alt={heading}
        className="w-[100px] object-cover "
        width={130}
        height={130}
      />
      <p className="text-[1rem]font-heading font-[800]">{heading}</p>
      <div className="text-[.75rem] font-body text-center">{desc}</div>
    </div>
  )
}

export default IntroComponent
