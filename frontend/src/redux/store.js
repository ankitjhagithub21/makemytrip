import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import placeReducer from './slices/placeSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    place:placeReducer
  },
})