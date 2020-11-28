import React from 'react'
import styled from 'styled-components'
import useChat from '../../hooks/useChat'
import ChatBubbles from '../molecules/ChatBubbles'
import ChatForm from './ChatForm/ChatForm'

const ChatStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Chat: React.FC = () => {
  const { messages, sendMessage } = useChat('test')

  return (
    <ChatStyled>
      <h1>Chat</h1>
      <ChatBubbles messages={messages} />
      <ChatForm sendMessage={sendMessage} />
    </ChatStyled>
  )
}

export default Chat
