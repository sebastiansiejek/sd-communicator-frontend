import ButtonStyled from 'components/atoms/Button/Button'
import Input from 'components/atoms/Input'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import copy from 'copy-to-clipboard'
import { IStore } from 'store/store'
import { nanoid } from 'nanoid'
import { setRoomId } from 'store/slices/userSlice'
import { useDispatch, connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props {
  roomId?: string
}

interface IInputs {
  room_id: string
}

const ChatRoomFormStyled = styled.form`
  display: flex;

  Input{
    width:100%;
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(16, 27, 79, 0.15);
    border: none;
  }
  button {
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
    border: none;
    color: ${({ theme }) => theme.colors.black[700]};
    font-weight: bold;
    margin-left: 0.8rem;
    background: #4D68C1;
    box-shadow: 0px 5px 15px rgba(16, 27, 79, 0.15);
    border-radius: 10px;
    width:15rem;

    &:hover {
      background: #1FCA74;
      color: ${({ theme }) => theme.colors.white[600]};
    }
  }
  p{
    height:100rem;
  }
`

const ChatRoom: React.FC<Props> = ({ roomId }) => {
  const { handleSubmit, register, reset } = useForm()
  const [getInputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const roomIdFromGet = queryString.parse(window.location.search)?.roomId

  useEffect(() => {
    roomIdFromGet && setInputValue(`${roomIdFromGet}`)
  }, [roomIdFromGet])

  return (
    <>
      {!roomId && (
        <>
          <ChatRoomFormStyled
            onSubmit={handleSubmit(({ room_id }: IInputs) => {
              dispatch(setRoomId(room_id))
              window.history.replaceState(
                null,
                'null',
                `?${queryString.stringify({
                  roomId: room_id
                })}`
              )
              reset({
                room_id: ''
              })
            })}
          >
            <Input
              name="room_id"
              type="text"
              ref={register}
              placeholder="Room id"
              value={getInputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <ButtonStyled type="submit">Join/create</ButtonStyled>
          </ChatRoomFormStyled>
          <ButtonStyled
            style={{
              marginTop: '.8rem'
            }}
            onClick={() => setInputValue(nanoid())}
          >
            Generate unique room id
          </ButtonStyled>
        </>
      )}
      {roomId && (
        <p id="chat-header">
          Your room id: <strong id="room-id">{roomId}</strong>{''}
          <div id="copy-link">
            <button 
              onClick={() => {
                copy(window.location.href)
                toast.success('Coped URL to clipboard')
              }}
            >
              COPY LINK
          </button>
          </div>
        </p>
      )}
    </>
  )
}

export default connect((state: IStore) => {
  return {
    roomId: state.user.roomId
  }
})(ChatRoom)
