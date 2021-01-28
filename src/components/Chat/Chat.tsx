import useChat from 'hooks/useChat'
import React from 'react'
import styled from 'styled-components'
import ChatBubbles from './ChatBubbles'
import ChatForm from './ChatSendMessageForm'
import { connect } from 'react-redux'
import { IStore } from 'store/store'
import ChatRoom from './ChatRoom'

const ChatStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 96.8rem;
`

interface IProps {
  roomId: string
  nickname: string
}

const Chat: React.FC<IProps> = ({ roomId, nickname }) => {
  const { messages, sendMessage, leaveRoom } = useChat(roomId, nickname)

  return (
    <ChatStyled>
      <ChatRoom leaveRoom={leaveRoom} />
      {roomId && nickname && (
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
    roomId: state.user.roomId,
    nickname: state.user.nickname
  }
})(Chat)
