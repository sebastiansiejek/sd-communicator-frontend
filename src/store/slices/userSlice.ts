import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  roomId: ''
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload
    }
  }
})

export const { setRoomId } = slice.actions

export default slice.reducer
