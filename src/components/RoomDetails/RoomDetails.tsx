import ButtonStyled from 'components/atoms/Button/Button'
import React from 'react'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import { IStore } from 'store/store'
import { setRoomId } from 'store/slices/userSlice'
import { useDispatch, connect } from 'react-redux'
import { toast } from 'react-toastify'

interface Props {
  roomId: string
  nickname: string
  leaveRoom: () => void
}

const ChatRoomStyled = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`

const ChatRoom: React.FC<Props> = ({ roomId, leaveRoom, nickname }) => {
  const dispatch = useDispatch()

  return (
    <ChatRoomStyled>
      {roomId && (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <table>
              <tbody>
                <tr>
                  <td>Your nickname:</td>
                  <td>
                    <strong>{nickname}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Your room id:</td>
                  <td>
                    <strong id="room-id">{roomId}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonStyled
              onClick={() => {
                copy(window.location.href)
                toast.success('Coped URL to clipboard')
              }}
            >
              COPY LINK
            </ButtonStyled>
            <ButtonStyled
              style={{ marginLeft: '1.5rem' }}
              themeType="danger"
              onClick={() => {
                leaveRoom()
                dispatch(setRoomId(''))
              }}
            >
              leave room
            </ButtonStyled>
          </div>
        </div>
      )}
    </ChatRoomStyled>
  )
}

export default connect((state: IStore) => {
  return {
    roomId: state.user.roomId,
    nickname: state.user.nickname
  }
})(ChatRoom)
