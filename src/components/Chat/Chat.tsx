import React from 'react'
import useChat from '../../hooks/useChat'
import { useForm } from 'react-hook-form'
import ChatBubbles from '../molecules/ChatBubbles'

type Inputs = {
  message: string
}

const Chat: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<Inputs>()
  const { messages, sendMessage } = useChat('test')

  return (
    <>
      <h1>Chat</h1>
      <ChatBubbles messages={messages} />
      <form
        onSubmit={handleSubmit((data: Inputs) => {
          sendMessage(data.message)
          reset({
            message: ''
          })
        })}
      >
        <input type="text" name="message" ref={register} required />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default Chat
