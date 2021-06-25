import { useHistory } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'

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
        <div className="room-title">
          <h1>Você não está autorizado a entrar nesta sala</h1>
          <Button isOutlined={false} onClick={goHome}>Voltar à Página Inicial</Button>
        </div>
      </main>
    </div>
  </div>
)}