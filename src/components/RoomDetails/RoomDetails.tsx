import ButtonStyled from 'components/atoms/Button/Button'
import Input from 'components/atoms/Input'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import copy from 'copy-to-clipboard'
import { IStore } from 'store/store'
import { nanoid } from 'nanoid'
import { setRoomId, setUserName } from 'store/slices/userSlice'
import { useDispatch, connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props {
  roomId: string
  nickname: string
  leaveRoom: () => void
}

interface IInputs {
  room_id: string
  user_name: string
}

const ChatRoomStyled = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`

const ChatRoomFormStyled = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`

const ChatRoom: React.FC<Props> = ({ roomId, leaveRoom, nickname }) => {
  const { handleSubmit, register, reset } = useForm()
  const [getInputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const roomIdFromGet = queryString.parse(window.location.search)?.roomId

  useEffect(() => {
    roomIdFromGet && setInputValue(`${roomIdFromGet}`)
  }, [roomIdFromGet])

  return (
    <ChatRoomStyled>
      {!roomId && (
        <>
          <ChatRoomFormStyled
            onSubmit={handleSubmit(({ room_id, user_name }: IInputs) => {
              dispatch(setRoomId(room_id))
              dispatch(setUserName(user_name))
              window.history.replaceState(
                null,
                'null',
                `?${queryString.stringify({
                  roomId: room_id
                })}`
              )
              reset({
                room_id: '',
                user_name: ''
              })
            })}
          >
            <Input
              placeholder="Nickname"
              name="user_name"
              ref={register}
              required
            />
            <div style={{ display: 'flex' }}>
              <Input
                name="room_id"
                type="text"
                ref={register}
                placeholder="Room id"
                value={getInputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              <ButtonStyled
                style={{
                  marginLeft: '1rem'
                }}
                type="button"
                onClick={() => setInputValue(nanoid())}
              >
                generate
              </ButtonStyled>
            </div>
            <ButtonStyled type="submit" style={{ marginTop: '1rem' }}>
              join/create
            </ButtonStyled>
          </ChatRoomFormStyled>
        </>
      )}
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
