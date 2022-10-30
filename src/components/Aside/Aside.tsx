import './Aside.scss'
import { useAppSelector } from '../../app/hooks'
import { authSys } from '../../features/auth/authSlice'
import LogPage from './LogPage/LogPage'

const Aside = () => {

  const user = useAppSelector(authSys)
  console.log(user);

  return (
    <aside className="asideMenu">
      {user.logged?null:<LogPage/>}
      {/* <img
        src="https://media-exp1.licdn.com/dms/image/C560BAQGvYmZv8oXNMQ/company-logo_200_200/0/1591628096876?e=2147483647&v=beta&t=-kEkHePpCK_6haQI8kpMTzCGOnsFX4GfWueRHSbVs0Q"
        alt="Imagen de perfil"
      />
      <textarea name="" id="" ></textarea>
      <button>Publicar</button> */}
    </aside>
  )
}

export default Aside