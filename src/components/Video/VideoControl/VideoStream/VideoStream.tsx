import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { IStore } from 'store/store'
import { BiVideo, BiVideoOff } from 'react-icons/bi'
import { setPlay } from 'store/slices/videoSlice'

interface IVideoStream {
  isPlay: boolean
}

const VideoStream: React.FC<IVideoStream> = ({ isPlay }) => {
  const dispatch = useDispatch()

  return (
    <>
      {isPlay ? (
        <BiVideoOff onClick={() => dispatch(setPlay(false))} cursor="pointer" />
      ) : (
        <BiVideo onClick={() => dispatch(setPlay(true))} cursor="pointer" />
      )}
    </>
  )
}

export default connect((state: IStore) => {
  return {
    isPlay: state.video.play
  }
})(VideoStream)
