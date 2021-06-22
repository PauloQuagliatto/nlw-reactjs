import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'

export const NewRoom = () => {
  const { user } = useAuth()

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
        <h1>{user?.name}</h1>
        <h2>Criar uma nova sala</h2>
          <form action="submit">
            <input
              type="text"
              placeholder="Digite o código da sala"
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