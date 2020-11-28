import React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  roomId?: string
}

const ChatRoom: React.FC<Props> = ({ roomId }) => {
  const { handleSubmit, register, reset } = useForm()

  return (
    <>
      {!roomId && (
        <form
          onSubmit={handleSubmit(() => {
            reset({
              room_id: ''
            })
          })}
        >
          <input
            name="room_id"
            type="text"
            ref={register}
            placeholder="Room id"
            required
          />
          <button type="submit">Join/create</button>
        </form>
      )}
    </>
  )
}

export default ChatRoom
