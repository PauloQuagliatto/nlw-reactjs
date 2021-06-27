import { useHistory } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'

export const NotAuthorized = () => {
  const history = useHistory()
  
  const goHome = () => {
    history.push('/')
  }

  return(
  <div>
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask-logo" onClick={goHome} />
          <div>
          </div>
        </div>
      </header>

      <main>
        <div className="room-warning">
          <div>
          <h1>Você não está autorizado a entrar nesta sala</h1>
          </div>
          <div>
          <button onClick={goHome}>Página Inicial</button>
          </div>
        </div>
      </main>
    </div>
  </div>
)}