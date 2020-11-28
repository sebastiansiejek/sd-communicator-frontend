import { useEffect, useState, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { IMessage, IMessages } from '../types/types'

const useChat = (roomId: string) => {
  const [messages, setMessage] = useState<IMessages>([])
  const socketRef = useRef<any>()

  useEffect(() => {
    socketRef.current = socketIOClient(
      process.env.REACT_APP_SOCKETIO_SERVER_URL,
      {
        query: { roomId }
      }
    )

    socketRef.current.on('msgToClient', (message: IMessage) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id
      }
      setMessage((messages) => [...messages, incomingMessage])
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId])

  const sendMessage = (message: string) => {
    socketRef.current.emit('msgToServer', {
      body: message,
      senderId: socketRef.current.id
    })
  }

  return { messages, sendMessage }
}

export default useChat
