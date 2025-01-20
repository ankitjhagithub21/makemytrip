import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState:{
     isLoggedIn:false,
     user:null,
     currPlace:null
  },
  
  reducers: {
   
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setCurrPlace: (state, action) => {
      state.currPlace = action.payload
    },
  },
})


export const { setIsLoggedIn,setUser,setCurrPlace } = userSlice.actions

export default userSlice.reducer