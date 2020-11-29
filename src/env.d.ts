declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number
    REACT_APP_SOCKETIO_SERVER_URL: string
  }
}
