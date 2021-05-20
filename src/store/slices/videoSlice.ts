import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  muted: true,
  play: true
}

const slice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setMute: (state, action) => {
      state.muted = action.payload
    },
    setPlay: (state, action) => {
      state.play = action.payload
    }
  }
})

export const { setMute, setPlay } = slice.actions

export default slice.reducer
