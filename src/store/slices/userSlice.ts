import { createSlice, Dispatch } from '@reduxjs/toolkit'

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

export const setRoomId = (payload: string) => async (dispatch: Dispatch) => {
  const { setRoomId } = slice.actions

  try {
    dispatch(setRoomId(payload))
  } catch (e) {
    return console.error(e)
  }
}

export default slice.reducer
