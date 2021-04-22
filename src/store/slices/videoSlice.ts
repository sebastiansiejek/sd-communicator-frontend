import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  muted: false
}

const slice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setMute: (state, action) => {
      state.muted = action.payload
    }
  }
})

export const { setMute } = slice.actions

export default slice.reducer
