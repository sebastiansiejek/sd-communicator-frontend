import WebNotification from 'inc/WebNotification'
import socketIOClient from 'socket.io-client'
import { IMessage, IMessages } from 'types/types'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'

const useChat = (roomId: string, userName: string) => {
  const [messages, setMessage] = useState<IMessages>([])
  const socketRef = useRef<any>()

  useEffect(() => {
    socketRef.current = socketIOClient(
      process.env.REACT_APP_SOCKETIO_SERVER_URL,
      {
        query: { roomId }
      }
    ).on('connect_error', () => {
      toast.error('ERROR: Server is down')
    })

    if (roomId) {
      socketRef.current.emit('msgToServer', {
        senderId: socketRef.current.id
      })

      socketRef.current.on('msgToClient', (message: IMessage) => {
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.senderId === socketRef.current.id
        }

        if (!incomingMessage.ownedByCurrentUser && incomingMessage.body) {
          new WebNotification({ displayIfDocummentIsHidden: true }).display(
            `You receive new message in "${roomId}" room`
          )
        }

        setMessage((messages) => [...messages, incomingMessage])
      })
    }

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId])

  const sendMessage = (message: string) => {
    socketRef.current.emit('msgToServer', {
      body: message,
      userName: userName,
      senderId: socketRef.current.id
    })
  }

  const leaveRoom = () => {
    socketRef.current.emit('leaveRoom')
  }

  return { messages, sendMessage, leaveRoom }
}

export default useChat
