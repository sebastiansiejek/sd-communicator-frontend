import ButtonStyled from 'components/atoms/Button/Button'
import Input from 'components/atoms/Input'
import React, { useState } from 'react'
import styled from 'styled-components'
import { IStore } from 'store/store'
import { nanoid } from 'nanoid'
import { setRoomId } from 'store/slices/userSlice'
import { useDispatch, connect } from 'react-redux'
import { useForm } from 'react-hook-form'

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
  const [generatedId, setGeneratedId] = useState('')
  const dispatch = useDispatch()

  return (
    <>
      {!roomId && (
        <>
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
              defaultValue={generatedId}
              required
            />
            <ButtonStyled type="submit">Join/create</ButtonStyled>
          </ChatRoomFormStyled>
          <ButtonStyled
            style={{
              marginTop: '.8rem'
            }}
            onClick={() => {
              setGeneratedId(nanoid())
            }}
          >
            Generate unique room id
          </ButtonStyled>
        </>
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
