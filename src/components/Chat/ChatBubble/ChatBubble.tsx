import React from 'react'
import styled, { css } from 'styled-components'

type IProps = {
  isSender: boolean
}

const ChatBubbleStyled = styled.div<IProps>`
  padding: 1rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.normal};
  width: max-content;
  max-width: 90%;

  ${({ isSender }) =>
    isSender &&
    css`
      background-color: ${({ theme }) => theme.colors.blue[600]};
    `}

  ${({ isSender }) =>
    !isSender &&
    css`
      background-color: ${({ theme }) => theme.colors.yellow[500]};
      align-self: flex-end;
      text-align: right;
    `}
`

const ChatBubble: React.FC<IProps> = ({ children, isSender }) => {
  return <ChatBubbleStyled isSender={isSender}>{children}</ChatBubbleStyled>
}

export default ChatBubble
