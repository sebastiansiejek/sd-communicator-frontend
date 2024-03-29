import WebNotification from 'inc/WebNotification'
import socketIOClient from 'socket.io-client'
import { IMessage, IMessages } from 'types/types'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import SimplePeer from 'simple-peer'

const useChat = (roomId: string, nickname: string) => {
  const [messages, setMessage] = useState<IMessages>([])
  const socketRef = useRef<any>()

  useEffect(() => {
    if (roomId) {
      socketRef.current = socketIOClient(
        process.env.REACT_APP_SOCKETIO_SERVER_URL,
        {
          query: { roomId }
        }
      ).on('connect_error', () => {
        toast.error('ERROR: Server is down')
      })

      joinToRoom(nickname)

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

      socketRef.current.on('leaveRoom', (response: { message: string }) => {
        toast.error(response.message)
      })
    }

    return () => {
      if (roomId) {
        socketRef.current.disconnect()
        leaveRoom()
      }
    }
  }, [roomId])

  const sendMessage = (message: string) => {
    socketRef.current.emit('msgToServer', {
      body: message,
      nickname: nickname,
      senderId: socketRef.current.id
    })
  }

  const joinToRoom = (nickname: string) => {
    socketRef.current.emit('joinToRoom', {
      nickname,
      senderId: socketRef.current.id
    })
  }

  const leaveRoom = () => {
    socketRef.current.emit('leaveRoom', {
      nickname,
      senderId: socketRef.current.id
    })
  }

  return {
    messages,
    sendMessage,
    leaveRoom,
    joinToRoom,
    socket: socketRef.current
  }
}

export default useChat
