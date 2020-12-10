import Input from 'components/atoms/Input'
import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

type IInputs = {
  message: string
}

type IProps = {
  sendMessage: (arg0: string) => void
}

const ChatSendMessageFormStyled = styled.form`
  display: flex;
  margin-top: 1.6rem;
  width: 100%;
  height:4rem;

  Input {
    width:100%;
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(16, 27, 79, 0.15);
    border: none;
  }

  button {
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
    border: none;
    color: ${({ theme }) => theme.colors.black[700]};
    font-weight: bold;
    margin-left: 0.8rem;
    background: #4D68C1;
    box-shadow: 0px 5px 15px rgba(16, 27, 79, 0.15);
    border-radius: 10px;
    width:10rem;

    &:hover {
      background: #1FCA74;
      color: ${({ theme }) => theme.colors.white[600]};
    }
  }
`

const ChatSendMessageForm: React.FC<IProps> = ({ sendMessage }) => {
  const { handleSubmit, register, reset } = useForm<IInputs>()

  return (
    <ChatSendMessageFormStyled
      onSubmit={handleSubmit((data: IInputs) => {
        sendMessage(data.message)
        reset({
          message: ''
        })
      })}
    >
      <Input name="message" ref={register} required />
      <button type="submit">SEND</button>
    </ChatSendMessageFormStyled>
  )
}

export default ChatSendMessageForm
