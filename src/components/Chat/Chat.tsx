import ChatBubbles from './ChatBubbles'
import ChatForm from './ChatSendMessageForm'
import JoinToRoom from 'components/JoinToRoom'
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
  position: relative;
  width: 70%;
  background: #000;
`

const StyledJoinToRoom = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: auto;
`

const StyledChatContent = styled.div`
  display: flex;
  height: 100vh;
`
interface IProps {
  roomId: string
  nickname: string
}

const Chat: React.FC<IProps> = ({ roomId, nickname }) => {
  const { messages, sendMessage, leaveRoom, socket } = useChat(roomId, nickname)

  return (
    <>
      {!roomId && (
        <StyledJoinToRoom>
          <JoinToRoom />
        </StyledJoinToRoom>
      )}
      {roomId && nickname && (
        <StyledChatContent>
          <StyledVideoChat>
            <Video socket={socket} />
          </StyledVideoChat>
          <StyledMessageChat>
            <RoomDetails leaveRoom={leaveRoom} />
            <ChatBubbles messages={messages} />
            <ChatForm sendMessage={sendMessage} />
          </StyledMessageChat>
        </StyledChatContent>
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
