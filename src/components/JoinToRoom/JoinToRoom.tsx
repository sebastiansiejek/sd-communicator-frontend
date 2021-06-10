import ButtonStyled from 'components/atoms/Button/Button'
import Input from 'components/atoms/Input'
import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import { setUserName, setRoomId } from 'store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

interface IInputs {
  room_id: string
  user_name: string
}

const ChatRoomFormStyled = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`

const JoinToRoom: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const { handleSubmit, register, reset } = useForm()
  const [getInputValue, setInputValue] = useState('')
  const roomIdFromGet = queryString.parse(window.location.search)?.roomId

  useEffect(() => {
    roomIdFromGet && setInputValue(`${roomIdFromGet}`)
  }, [roomIdFromGet])

  return (
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
      <Input placeholder="Nickname" name="user_name" ref={register} required />
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
  )
}

export default JoinToRoom
