import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'

import { database } from '../firebase/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'



export const Home = () => {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  const handleCreateRoom = async () => {
    if(!user){
      await signInWithGoogle()
    }
    
    history.push('rooms/new')
  }

const handleJoinRoom = async (e: FormEvent) => {
  e.preventDefault()

  if(roomCode.trim() === '') return

  const roomRef = await database.ref(`rooms/${roomCode}`).get()

  if(!roomRef.exists()) return alert('Room does not exist!')
  if(roomRef.val().closedAt) return alert('Room already closed.')
  
  history.push(`/rooms/${roomCode}`)
}

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração Perguntas e Respostas" />
        <strong>Crie Salas de Q&amp;A ao vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Let Me Ask Logo" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleImg} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator"> ou entre em uma sala </div>
          <form onSubmit={handleJoinRoom} >
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={e => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}