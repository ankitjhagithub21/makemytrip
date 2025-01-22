import { createSlice } from '@reduxjs/toolkit'


export const placeSlice = createSlice({
  name: 'place',
  initialState:{
     
     currPlace:null
  },
  
  reducers: {
   
    setCurrPlace: (state, action) => {
      state.currPlace = action.payload
    },
  },
})


export const { setplaces,setCurrPlace } = placeSlice.actions

export default placeSlice.reducer