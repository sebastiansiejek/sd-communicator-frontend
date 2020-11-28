import React from 'react'
import styled from 'styled-components'
import { IMessages } from '../../../types/types'
import ChatBubble from '../../atoms/ChatBubble'

interface Props {
  messages: IMessages
}

const ChatBubblesStyles = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.black[700]};

  > *:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`

const ChatBubbles: React.FC<Props> = ({ messages }) => {
  return (
    <>
      {messages.length > 0 && (
        <ChatBubblesStyles>
          {messages.map(({ body, ownedByCurrentUser }, key) => (
            <ChatBubble key={body + key} isSender={ownedByCurrentUser}>
              {body}
            </ChatBubble>
          ))}
        </ChatBubblesStyles>
      )}
    </>
  )
}

export default ChatBubbles
