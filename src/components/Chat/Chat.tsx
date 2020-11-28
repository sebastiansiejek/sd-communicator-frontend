import useChat from 'hooks/useChat'
import React from 'react'
import styled from 'styled-components'
import ChatBubbles from './ChatBubbles'
import ChatForm from './ChatSendMessageForm'
import { connect } from 'react-redux'
import { IStore } from 'store/store'

const ChatStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface IProps {
  roomId: string
}

const Chat: React.FC<IProps> = ({ roomId }) => {
  const { messages, sendMessage } = useChat(roomId)

  return (
    <ChatStyled>
      {roomId && (
        <>
          <ChatBubbles messages={messages} />
          <ChatForm sendMessage={sendMessage} />
        </>
      )}
    </ChatStyled>
  )
}

export default connect((state: IStore) => {
  return {
    roomId: state.user.roomId
  }
})(Chat)
