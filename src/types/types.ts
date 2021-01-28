export type IMessage = {
  body: string
  userName: string
  senderId: string
  ownedByCurrentUser: boolean
}

export type IMessages = Array<IMessage>
