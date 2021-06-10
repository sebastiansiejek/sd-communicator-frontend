import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import user, { initialState as userState } from './slices/userSlice'
import video, { initialState as videoState } from './slices/videoSlice'

export interface IStore {
  user: typeof userState
  video: typeof videoState
}

export const rootReducer = combineReducers({
  user,
  video
})

export default configureStore({
  reducer: rootReducer
})
