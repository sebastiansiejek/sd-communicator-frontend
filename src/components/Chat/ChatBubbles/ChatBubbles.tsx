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
  height: 382.5px;
  width: 926px;
  left: 155px;
  top: 258px;

  padding: 1rem;
  background: ${({ theme }) => theme.colors.white[600]};
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
