import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState:{
     isLoggedIn:false,
     user:null
  },
  
  reducers: {
   
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})


export const { setIsLoggedIn,setUser } = userSlice.actions

export default userSlice.reducer