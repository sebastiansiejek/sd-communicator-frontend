import React from 'react'

type IProps = {
  socket: SocketIOClient.Emitter
}

const Connect: React.FC<IProps> = ({ socket }) => {
  return (
    <button
      onClick={() => {
        console.log(socket)
      }}
    >
      Join to room
    </button>
  )
}

export default Connect
