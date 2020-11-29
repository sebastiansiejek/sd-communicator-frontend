import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import user, { initialState as userState } from './slices/userSlice'

export interface IStore {
  user: typeof userState
}

export const rootReducer = combineReducers({
  user
})

export default configureStore({
  reducer: rootReducer
})
