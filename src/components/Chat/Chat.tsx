import ChatBubbles from './ChatBubbles'
import ChatForm from './ChatSendMessageForm'
import React from 'react'
import RoomDetails from '../RoomDetails'
import Video from 'components/Video'
import styled from 'styled-components'
import useChat from 'hooks/useChat'
import { IStore } from 'store/store'
import { connect } from 'react-redux'

const StyledMessageChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 2rem;
`

const StyledVideoChat = styled.div`
  width: 70%;
  border: 2px solid lightgray;
`

interface IProps {
  roomId: string
  nickname: string
}

const Chat: React.FC<IProps> = ({ roomId, nickname }) => {
  const { messages, sendMessage, leaveRoom } = useChat(roomId, nickname)

  return (
    <>
      {roomId && nickname && (
        <>
          <StyledVideoChat>
            <Video />
          </StyledVideoChat>
          <StyledMessageChat>
            <RoomDetails leaveRoom={leaveRoom} />
            <ChatBubbles messages={messages} />
            <ChatForm sendMessage={sendMessage} />
          </StyledMessageChat>
        </>
      )}
    </>
  )
}

export default connect((state: IStore) => {
  return {
    roomId: state.user.roomId,
    nickname: state.user.nickname
  }
})(Chat)
