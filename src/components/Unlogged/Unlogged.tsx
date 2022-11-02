import { faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Unlogged.scss'

const Unlogged = () => {
  return (
    <section className="Unlogged">
        <FontAwesomeIcon icon={faEyeSlash}/>
        <h2>Lo sentimos...</h2>
        <p>Para poder ver los post primero tienes que iniciar sesión</p>
        <p>(No te será muy complicado)</p>
    </section>
  )
}

export default Unlogged