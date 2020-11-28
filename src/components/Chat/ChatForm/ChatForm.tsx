import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

type IInputs = {
  message: string
}

type IProps = {
  sendMessage: (arg0: string) => void
}

const ChatFormStyled = styled.form`
  display: flex;
  margin-top: 1.6rem;

  textarea {
    resize: none;
    padding: 1.2rem;
    border-radius: ${({ theme }) => theme.radius.normal};
    border: 1px solid ${({ theme }) => theme.colors.black[700]};
  }

  button {
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
    border: 1px solid ${({ theme }) => theme.colors.black[700]};
    outline: none;
    box-shadow: none;
    background: ${({ theme }) => theme.colors.white[600]};
    color: ${({ theme }) => theme.colors.black[700]};
    font-weight: bold;
    margin-left: 0.8rem;
    border-radius: 100%;

    &:hover {
      background: ${({ theme }) => theme.colors.black[700]};
      color: ${({ theme }) => theme.colors.white[600]};
    }
  }
`

const ChatForm: React.FC<IProps> = ({ sendMessage }) => {
  const { handleSubmit, register, reset } = useForm<IInputs>()

  return (
    <ChatFormStyled
      onSubmit={handleSubmit((data: IInputs) => {
        sendMessage(data.message)
        reset({
          message: ''
        })
      })}
    >
      <textarea name="message" ref={register} required />
      <button type="submit">SEND</button>
    </ChatFormStyled>
  )
}

export default ChatForm
