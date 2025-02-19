import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import placeReducer from './slices/placeSlice'
import hotelReducer from './slices/hotelSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    place:placeReducer,
    hotel:hotelReducer
  },
})