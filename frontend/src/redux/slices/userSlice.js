import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState:{
     user:null,
     isLoading:true
     
  },
  
  reducers: {
   
    
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
   
  },
})


export const { setUser,setIsLoading} = userSlice.actions

export default userSlice.reducer