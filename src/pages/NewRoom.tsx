import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { database } from '../firebase/firebase'

export const NewRoom = () => {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault()

    if(newRoom.trim() === '') return

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
     title: newRoom,
     authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
        <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom} >
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar na sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}