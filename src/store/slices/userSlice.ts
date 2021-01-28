import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  roomId: '',
  userName: ''
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    }
  }
})

export const { setRoomId, setUserName } = slice.actions

export default slice.reducer
