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
        <div>
          Your room id: <strong id="room-id">{roomId}</strong>
          <ButtonStyled
            onClick={() => {
              copy(window.location.href)
              toast.success('Coped URL to clipboard')
            }}
          >
            COPY LINK
          </ButtonStyled>
        </div>
      )}
    </>
  )
}

export default connect((state: IStore) => {
  return {
    roomId: state.user.roomId
  }
})(ChatRoom)
