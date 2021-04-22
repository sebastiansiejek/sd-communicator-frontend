import React, { useEffect, createRef } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { IStore } from 'store/store'
import styled from 'styled-components'
import VideoControl from './VideoControl'

interface IVideo {
  isMuted: boolean
}

const StyledVideoContainer = styled.div``

const Video: React.FC<IVideo> = ({ isMuted }) => {
  const videoRef = createRef<HTMLVideoElement>()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: { ideal: 4096 },
          height: { ideal: 2160 }
        }
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = function (e) {
            const { current } = videoRef
            if (current) {
              current.play()

              if (isMuted) current.muted = true
              if (!isMuted) current.muted = false
            }
          }
        }
      })
      .catch((error) => {
        console.warn(error)
        toast.error(error)
      })
  })

  return (
    <StyledVideoContainer>
      <video ref={videoRef} />
      <VideoControl />
    </StyledVideoContainer>
  )
}

export default connect((state: IStore) => {
  return {
    isMuted: state.video.muted
  }
})(Video)
