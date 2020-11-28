import Input from 'components/atoms/Input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, connect } from 'react-redux'
import { setRoomId } from 'store/slices/userSlice'
import { IStore } from 'store/store'
import styled from 'styled-components'

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
  const dispatch = useDispatch()

  return (
    <>
      {!roomId && (
        <ChatRoomFormStyled
          onSubmit={handleSubmit(({ room_id }: IInputs) => {
            dispatch(setRoomId(room_id))
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
            required
          />
          <button type="submit">Join/create</button>
        </ChatRoomFormStyled>
      )}
      {roomId && (
        <p>
          Your room id: <strong>{roomId}</strong>
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
