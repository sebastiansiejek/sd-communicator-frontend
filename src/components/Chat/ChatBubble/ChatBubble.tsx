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
      background: ${({ theme }) => theme.colors.gray[500]};
      align-self: flex-end;
      text-align: right;
      border-radius: 20px 0px 20px 20px;
    `}

  ${({ isSender }) =>
    !isSender &&
    css`
      background: ${({ theme }) => theme.colors.green[500]};
      border-radius: 0px 20px 20px 20px;
    `}
`

const ChatBubble: React.FC<IProps> = ({ children, isSender }) => {
  return <ChatBubbleStyled isSender={isSender}>{children}</ChatBubbleStyled>
}

export default ChatBubble
