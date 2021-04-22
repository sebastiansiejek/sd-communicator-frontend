import React from 'react'
import Microphone from './Mircophone'
import styled from 'styled-components'

const StyledVideoBar = styled.div`
  position: absolute;
  bottom: 5%;
  background: darkgray;
  padding: 1rem;
  left: 50%;
  transform: translateX(-50%);
`

const VideoControl: React.FC = () => {
  return (
    <StyledVideoBar>
      <Microphone />
    </StyledVideoBar>
  )
}

export default VideoControl
