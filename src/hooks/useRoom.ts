import { useEffect, useState } from "react"

import { useAuth } from './useAuth'
import { database } from "../firebase/firebase"

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  },
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  },
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likes: Record<string, {
    authorId: string
  }>
}>

export const useRoom = (roomId: string) => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          author: value.author,
          content: value.content,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)

      setIsAdmin(databaseRoom.authorId === user?.id)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return { questions, title, isAdmin }
}