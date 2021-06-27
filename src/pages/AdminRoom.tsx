import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'

import { NotAuthorized } from './NotAuthorized'
import { DeleteModal } from '../components/DeleteModal'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { LogOutButton } from '../components/LogOutButton'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'
import { database } from '../firebase/firebase'
import { useRoom } from '../hooks/useRoom'
import { useAuth } from '../hooks/useAuth'
import { useAdmin } from '../hooks/useAdmin'

import '../styles/room.scss'


type RoomParams = {
  id: string
}

export const AdminRoom = () => {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const { signOutWithGoogle } = useAuth()
  const roomId = params.id
  const { title, questions } = useRoom(roomId)
  const [isOpen, setIsOpen] = useState(false)
  const { isAdmin } = useAdmin(roomId)

  const goHome = () => {
    history.push('/')
  }

  const handleLogOut = async () => {
    await signOutWithGoogle()
    goHome()
  }

  const handleCheckQuestionAsAnswered = async (questionId: string, isAnswered: boolean) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: !isAnswered
    })
  }
  const handleHighLightQuestion = async (questionId: string, isHighlighted: boolean) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: !isHighlighted
    })

  }
  
  return (
    <>
    { isAdmin ? 
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask-logo" onClick={goHome} />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => setIsOpen(true)}>Encerrar Sala</Button>
            <DeleteModal 
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  whatIsDoing={'endRoom'}
                  roomId={roomId}
                />
                <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>
        <div className="question-list" >
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <button
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}
                >
                  <img src={checkImg} alt="check" />
                </button>
                {!question.isAnswered && (
                  <button
                    type="button"
                    onClick={() => handleHighLightQuestion(question.id, question.isHighlighted)}
                  ><img src={answerImg} alt="answer" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                >
                  <DeleteModal 
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  whatIsDoing={'deleteQuestion'}
                  roomId={roomId}
                  questionId={question.id}
                />  
                  <img src={deleteImg} alt="delete" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div> : <NotAuthorized />}
    </>
  )
}