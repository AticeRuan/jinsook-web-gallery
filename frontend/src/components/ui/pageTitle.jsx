const PageTitle = ({ heading, desc }) => {
  return (
    <div className="flex flex-col items-start justify-center px-20 xl:px-2 w-full gap-4">
      <p className="md:text-[3rem] font-heading font-bold uppercase text-[2rem]">
        {heading}
      </p>
      <div className="text-[1rem] font-heading font-[500] w-fit">{desc}</div>
    </div>
  )
}

export default PageTitle
