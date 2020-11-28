import useChat from 'hooks/useChat'
import React from 'react'
import styled from 'styled-components'
import ChatBubbles from './ChatBubbles'
import ChatForm from './ChatSendMessageForm'
import ChatRoom from 'components/Chat/ChatRoom'

const ChatStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Chat: React.FC = () => {
  const { messages, sendMessage } = useChat('test')

  return (
    <ChatStyled>
      <ChatRoom />
      <ChatBubbles messages={messages} />
      <ChatForm sendMessage={sendMessage} />
    </ChatStyled>
  )
}

export default Chat
