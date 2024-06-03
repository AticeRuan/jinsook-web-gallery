const PageTitle = ({ heading, desc }) => {
  return (
    <div className="flex flex-col items-start justify-center px-20 xl:px-2 w-full gap-4">
      <p className="text-[3rem] font-heading font-bold uppercase">{heading}</p>
      <p className="text-[1rem] font-heading font-[500]">{desc}</p>
    </div>
  )
}

export default PageTitle
