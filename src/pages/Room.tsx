import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { database } from '../firebase/firebase'
import { useAuth } from '../hooks/useAuth'

import '../styles/room.scss'

type RoomParams = {
  id: string
}

export const Room = () => {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const [newQuestion, setNewQuestion] = useState('')

  const handleSendQuestion = async (e: FormEvent) => {
    e.preventDefault()
    
    if(newQuestion.trim() === '') return

    if(!user) throw new Error('You must be logged in')

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswers: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)
  }

 return(
   <div id="page-room">
     <header>
       <div className="content">
         <img src={logoImg} alt="letmeask-logo"/>
        <RoomCode code={roomId} />
       </div>
     </header>

     <main>
       <div className="room-title">
         <h1>Sala</h1>
         <span>Perguntas</span>
       </div>
       <form onSubmit={handleSendQuestion}>
         <textarea 
          placeholder="O que você quer perguntar?"
          onChange={e => setNewQuestion(e.target.value)}
          value={newQuestion}
        />
        <div className="form-footer">
          <span>Para enviar sua pergunta, <button>faça seu login</button></span>
          <Button type="submit" disabled={!user} >Enviar Pergunta</Button>
        </div>
       </form>
     </main>
   </div>
 ) 
}