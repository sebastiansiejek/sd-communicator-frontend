export type IMessage = {
  body: string
  senderId: string
  ownedByCurrentUser: boolean
}

export type IMessages = Array<IMessage>
