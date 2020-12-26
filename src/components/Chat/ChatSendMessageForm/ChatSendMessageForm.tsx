import Button from 'components/atoms/Button'
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
  height: 4rem;
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
      <Button type="submit">SEND</Button>
    </ChatSendMessageFormStyled>
  )
}

export default ChatSendMessageForm
