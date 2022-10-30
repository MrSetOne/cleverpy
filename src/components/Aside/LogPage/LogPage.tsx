import {useState} from 'react'
import './LogPage.scss'
import logo from '../../../assets/Logo-Cleverpy.png'
import { useAppDispatch } from '../../../app/hooks'
import { login } from '../../../features/auth/authSlice'

const LogPage = () => {

  const dispatch = useAppDispatch()

  interface data{
    username:string,
    password:string
  }

  const initialData:data = {
    username:"",
    password:""
  }

  const [submitable, setSubmitable] = useState<boolean>(false)
  const [data, setData] = useState<data>(initialData)

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    });
    console.log(data)
    if (data.username && data.password) {
      setSubmitable(true);
    } else {
      setSubmitable(false);
    }
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    dispatch(login(data))
    console.log(data);
  }

  return (
    <div className='logPage'>
      <img src={logo} alt="Cleverpy" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario</label>
        <input 
          type="text"
          name="username"
          placeholder='Tu usuario'
          id="username"
          onChange={handleInputChange}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder='Tu contraseña'
          id="password"
          onChange={handleInputChange}
        />
        <button type="submit" style={{opacity:submitable?1:.7}}>Login</button>
      </form>
    </div>
  )
}

export default LogPage