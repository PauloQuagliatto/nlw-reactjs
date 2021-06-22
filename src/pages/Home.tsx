import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'

export const Home = () => {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()

  const handleCreateRoom = async () => {
    if(!user){
      await signInWithGoogle()
    }
    
    history.push('rooms/new')
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
          <form action="submit">
            <input
              type="text"
              placeholder="Digite o código da sala"
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