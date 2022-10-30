import './Aside.scss'
import { useAppSelector } from '../../app/hooks'
import { authSys } from '../../features/auth/authSlice'
import LogPage from './LogPage/LogPage'
import AsideUser from './AsideUser/AsideUser'

const Aside = () => {

  const user = useAppSelector(authSys)

  return (
    <aside className="asideMenu">
      {user.logged?<AsideUser/>:<LogPage/>}
    </aside>
  )
}

export default Aside