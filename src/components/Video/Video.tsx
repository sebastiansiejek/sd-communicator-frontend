import React, { useEffect, createRef } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const VideoStyled = styled.video``

const Video: React.FC = () => {
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
            videoRef.current?.play()
          }
        }
      })
      .catch((error) => {
        console.warn(error)
        toast.error(error)
      })
  })

  return <VideoStyled ref={videoRef} />
}

export default Video
