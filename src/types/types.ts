export type IMessage = {
  body: string
  nickname: string
  senderId: string
  ownedByCurrentUser: boolean
}

export type IMessages = Array<IMessage>
