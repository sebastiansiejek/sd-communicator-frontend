import SimplePeer from 'simple-peer'

export type IMessage = {
  body: string
  nickname: string
  senderId: string
  ownedByCurrentUser: boolean
}

export type IUserJoinedToRoom = {
  signalData: any
  nickname: string
  senderId: string
}

export type IMessages = Array<IMessage>

export type IUsers = Array<string>

export type IReceivingReturnedSignal = {
  signal: SimplePeer.Instance
  id: string
}
