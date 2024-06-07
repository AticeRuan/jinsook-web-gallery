import Login from '../components/auth/login'
import DashboardMain from '../components/dashboard/dashboardmain'
import { useArtworksContext } from '../hooks/useArtworksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import useRead from '../hooks/useRead'
import logo from '../assets/logo_white&transparent.png'
import logoBlack from '../assets/logo_black&transparent.png'
import { Link } from 'react-router-dom'
import AdminTag from '../components/ui/adminTag'

const Dashboard = () => {
  const { user, isExpired } = useAuthContext()

  useRead('artworks')
  const { artworks } = useArtworksContext()

  const paintings = artworks?.filter((artwork) => {
    return artwork.category === 'paintings'
  })

  const paintingsThemes = [
    ...new Set(paintings?.map((artwork) => artwork.theme)),
  ]

  const illustrations = artworks?.filter(
    (artwork) => artwork.category === 'illustrations',
  )
  const illustrationsThemes = [
    ...new Set(illustrations?.map((artwork) => artwork.theme)),
  ]
  const books = artworks?.filter(
    (artwork) => artwork.category === 'childrens-books',
  )
  const booksThemes = [...new Set(books?.map((artwork) => artwork.theme))]
  const handcrafts = artworks?.filter(
    (artwork) => artwork.category === 'handcrafts',
  )
  const handcraftsThemes = [
    ...new Set(handcrafts?.map((artwork) => artwork.theme)),
  ]
  const featuredItems = artworks?.filter((artwork) => artwork.featured === true)
  const headers = artworks?.filter((artwork) => artwork.header === true)

  if (!user || isExpired) {
    return (
      <>
        {' '}
        <div className="fixed z-[1] top-[10vh] left-[1rem] lg:left-[10vw] xl:left-[25vw]">
          <span
            className={`rounded-full z-[1] fixed transition-all duration-500 ease-in-out w-[52rem] h-[40rem] rotate-[35deg]   bg-jinsook-blue translate-x-[20rem] translate-y-[20rem]`}
          />
          <span
            className={`w-[42rem] h-[50rem]  rounded-full z-[1] fixed  bg-jinsook-blue translate-y-[20rem] rotate-[35deg]`}
          />
          <span
            className={`w-[42rem] h-[40rem] rounded-full z-[1] fixed  bg-jinsook-blue translate-x-[20rem] `}
          />
          <span
            className={`w-[42rem] h-[40rem] rounded-full   z-[2] fixed  bg-jinsook-blue `}
          />
        </div>
        <div className="w-screen h-screen flex items-center justify-center flex-col bg-jinsook-green  ">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="lg:w-[200px] w-[150px] fixed top-3 left-3 z-10"
            />
          </Link>
          <div>
            <Login />
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="overflow-hidden w-screen h-screen  bg-jinsook-blue flex items-center justify-center relative">
      {' '}
      <div className="fixed z-[1] top-[10vh] left-[1vw] lg:left-[5vw] xl:left-[20vw] ">
        <span
          className={`rounded-full z-[1] fixed transition-all duration-500 ease-in-out w-[52rem] h-[40rem] rotate-[35deg]   bg-jinsook-green translate-x-[30rem] translate-y-[30rem]`}
        />
        <span
          className={`w-[42rem] h-[50rem]  rounded-full z-[1] fixed  bg-jinsook-green translate-y-[30rem] rotate-[35deg]`}
        />
        <span
          className={`w-[42rem] h-[40rem] rounded-full z-[1] fixed  bg-jinsook-green translate-x-[30rem] `}
        />
        <span
          className={`w-[52rem] h-[60rem] rounded-full -translate-y-[10rem] -translate-x-[10rem]  z-[2] fixed  bg-jinsook-green `}
        />
      </div>
      <Link to="/">
        <img
          src={logoBlack}
          alt="logo"
          className="lg:w-[200px] w-[150px] fixed top-3 left-3 z-10"
        />
      </Link>
      <div className=" flex items-center justify-end flex-col w-[90%] xl:w-[80%] 2xl:w-[1200px] h-[90%]">
        {' '}
        <DashboardMain
          user={user}
          data={artworks}
          paintings={paintings}
          illustrations={illustrations}
          headers={headers}
          books={books}
          handcrafts={handcrafts}
          featured={featuredItems}
          paintingsThemes={paintingsThemes}
          illustrationsThemes={illustrationsThemes}
          booksThemes={booksThemes}
          handcraftsThemes={handcraftsThemes}
        />
      </div>
      <AdminTag />
    </div>
  )
}

export default Dashboard
