import React from 'react'
import Microphone from './Mircophone'
import styled from 'styled-components'
import VideoStream from './VideoStream'

const StyledVideoBar = styled.div`
  position: absolute;
  bottom: 5%;
  background: darkgray;
  padding: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`

const VideoControl: React.FC = () => {
  return (
    <StyledVideoBar>
      <Microphone />
      <VideoStream />
    </StyledVideoBar>
  )
}

export default VideoControl
