import React from 'react'
import styled, { css } from 'styled-components'

type IProps = {
  body: string
  userName: string
  isSender: boolean
}

const ChatGroupStyled = styled.div<IProps>`
  display: flex;
  flex-direction: column;

  ${({ isSender }) =>
    !isSender &&
    css`
      align-items: flex-end;
    `}
`

const UserNameStyled = styled.div`
  border-radius: 20px 20px 20px 0;
  background: ${({ theme }) => theme.colors.blue[600]};
  display: inline-flex;
  padding: 0.2rem 0.6rem;
  font-size: 1.2rem;
  color: #fff;
`

const ChatBubbleStyled = styled.div<IProps>`
  padding: 1rem 1.2rem;
  width: max-content;

  ${({ isSender }) =>
    isSender &&
    css`
      background: ${({ theme }) => theme.colors.gray[500]};
      text-align: right;
      border-radius: 20px 0px 20px 20px;
    `}

  ${({ isSender }) =>
    !isSender &&
    css`
      background: ${({ theme }) => theme.colors.green[500]};
      border-radius: 0px 20px 20px 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    `}
`

const ChatBubble: React.FC<IProps> = ({ body, userName, isSender }) => {
  return (
    <ChatGroupStyled body={body} userName={userName} isSender={isSender}>
      <div>
        {!isSender && <UserNameStyled>{userName}</UserNameStyled>}
        <ChatBubbleStyled body={body} userName={userName} isSender={isSender}>
          {body}
        </ChatBubbleStyled>
      </div>
    </ChatGroupStyled>
  )
}

export default ChatBubble
