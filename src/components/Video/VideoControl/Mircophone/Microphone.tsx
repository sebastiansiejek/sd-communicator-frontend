import React from 'react'
import { BiMicrophoneOff, BiMicrophone } from 'react-icons/bi'
import { connect, useDispatch } from 'react-redux'
import { IStore } from 'store/store'
import { setMute } from 'store/slices/videoSlice'

interface IMicrophone {
  isMuted: boolean
}

const Microphone: React.FC<IMicrophone> = ({ isMuted }) => {
  const dispatch = useDispatch()

  return (
    <>
      {isMuted ? (
        <BiMicrophoneOff onClick={() => dispatch(setMute(false))} />
      ) : (
        <BiMicrophone onClick={() => dispatch(setMute(true))} />
      )}
    </>
  )
}

export default connect((state: IStore) => {
  return {
    isMuted: state.video.muted
  }
})(Microphone)
