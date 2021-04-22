import React from 'react'
import styled from 'styled-components'

interface Props {}

const MainStyled = styled.div`
  display: flex;
  height: 100vh;
`

const Main: React.FC<Props> = ({ children }) => {
  return <MainStyled>{children}</MainStyled>
}

export default Main
