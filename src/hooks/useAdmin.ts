import { useEffect, useState } from "react"

import { useAuth } from './useAuth'
import { database } from "../firebase/firebase"


export const useAdmin = (roomId: string) => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    const unsubscribe = () => {roomRef.once('value', room => {
      const databaseRoom = room.val()
      setIsAdmin(databaseRoom.authorId === user?.id)
    })}

    return () => {
      unsubscribe()
    }
  }, [roomId, user?.id])

  return { isAdmin }
}