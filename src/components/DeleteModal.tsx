import Modal from 'react-modal'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { database } from '../firebase/firebase'

const ModalDiv = styled.div`
  margin-top: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ModalH1 = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  color: #29292e;
`
const ButtonDiv = styled.div`
  width: 30%;
  margin-top: 150px;
  display: flex;
  justify-content: space-between;
`

const DeleteModalButton = styled.button`
  height: 50px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  background: #f01f1f;
  color: #fff;
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`
const CancelModalButton = styled.button`
  height: 50px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  background: #fff;
   color: #835afd;
  padding: 0 32px;
  border: 1px solid #835afd;
  
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: background 0.2s,  color 0.2s;

  &:hover {
    color: #fff;
    background: #835afd;
  }
`


type DeleteModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  whatIsDoing: string
  roomId: string
  questionId?: string
}

export const DeleteModal = ({ isOpen, setIsOpen, whatIsDoing, roomId, questionId = '' }: DeleteModalProps) => {
  const history = useHistory()

  const handleCloseModal = () => {
    setIsOpen(false)
    console.log(isOpen)
  }

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date()
    })
    handleCloseModal()
    history.push('/')
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que quer deletar esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
    handleCloseModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(82, 80, 80, 0.3)'
        },
        content: {
          borderRadius: '8px',
          background: '#fff',
          overflow: 'none',
          outline: 'none',
          padding: '20px'
        }
      }}
    >
      {whatIsDoing === 'deleteQuestion' ?
        (<ModalDiv>
          <ModalH1>Você Realmente deseja excluir essa pergunta?</ModalH1>
          <ButtonDiv>
            <CancelModalButton onClick={handleCloseModal}>Cancel</CancelModalButton>
            <DeleteModalButton onClick={() => handleDeleteQuestion(questionId)}>Deletar</DeleteModalButton>
          </ButtonDiv>
        </ModalDiv>) : (
          <ModalDiv>
            <ModalH1>Você realmente deseja encerrar esta sala?</ModalH1>
            <ButtonDiv>
              <CancelModalButton onClick={handleCloseModal}>Cancel</CancelModalButton>
              <DeleteModalButton onClick={handleEndRoom}>Encerrar</DeleteModalButton>
            </ButtonDiv>
          </ModalDiv>
        )
      }
    </Modal>
  )
}