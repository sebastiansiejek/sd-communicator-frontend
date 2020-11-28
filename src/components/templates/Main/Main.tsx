import React from 'react'
import styled from 'styled-components'

interface Props {}

const MainStyled = styled.div`
  display: flex;
  padding: 5vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const Main: React.FC<Props> = ({ children }) => {
  return <MainStyled>{children}</MainStyled>
}

export default Main
