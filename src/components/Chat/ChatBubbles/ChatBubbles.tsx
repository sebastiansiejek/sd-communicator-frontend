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
  height: 38rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.white[600]};
  border-radius: ${({ theme }) => theme.radius.small};
  overflow-y: auto;
  width: 100%;

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
            ({ body, ownedByCurrentUser, userName }, key) =>
              body && (
                <ChatBubble
                  key={body + key}
                  body={body}
                  userName={userName}
                  isSender={ownedByCurrentUser}
                ></ChatBubble>
              )
          )}
        </ChatBubblesStyles>
      )}
    </>
  )
}

export default ChatBubbles
