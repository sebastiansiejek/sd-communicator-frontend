import React from 'react'
import styled from 'styled-components'

interface Props {}

const MainStyled = styled.div``

const Main: React.FC<Props> = ({ children }) => {
  return <MainStyled>{children}</MainStyled>
}

export default Main
