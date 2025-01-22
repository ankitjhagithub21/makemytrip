import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState:{
     isLoggedIn:false,
     user:null,
     isLoading:true
     
  },
  
  reducers: {
   
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
      
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
   
  },
})


export const { setIsLoggedIn,setUser,setIsLoading} = userSlice.actions

export default userSlice.reducer