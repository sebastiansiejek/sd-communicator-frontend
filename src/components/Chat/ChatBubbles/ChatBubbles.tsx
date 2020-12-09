import React from 'react'
import styled from 'styled-components'
import { IMessages } from 'types/types'
import ChatBubble from 'components/Chat/ChatBubble/ChatBubble'

interface Props {
  messages: IMessages
}

const ChatBubblesStyles = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.black[700]};
  border-radius: ${({ theme }) => theme.radius.small};
  max-height: 80%;
  overflow-y: auto;

  > *:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`

const ChatBubbles: React.FC<Props> = ({ messages }) => {
  return (
    <>
      {messages.length > 0 && (
        <ChatBubblesStyles>
          {messages.map(
            ({ body, ownedByCurrentUser }, key) =>
              body && (
                <ChatBubble key={body + key} isSender={ownedByCurrentUser}>
                  {body}
                </ChatBubble>
              )
          )}
        </ChatBubblesStyles>
      )}
    </>
  )
}

export default ChatBubbles