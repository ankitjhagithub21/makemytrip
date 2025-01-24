import { createSlice } from '@reduxjs/toolkit'


export const placeSlice = createSlice({
  name: 'place',
  initialState:{
     places:[],
     currPlace:null,
     isLoading:true,
     searchTerm:'',
  },
  
  reducers: {
   
    setPlaces: (state, action) => {
      state.places = action.payload
    },

    setCurrPlace: (state, action) => {
      state.currPlace = action.payload
    },
    setIsLoading:(state,action) => {
      state.isLoading = action.payload
    },
   
    likeUnlike:(state,action) => {
      state.places = state.places.map((place) => place._id == action.payload._id ? action.payload.place : place);
    },
    setSearchTerm:(state,action) => {
      state.searchTerm = action.payload
    },

    
  },
})


export const { setPlaces,setCurrPlace,setIsLoading,likeUnlike,setSearchTerm } = placeSlice.actions

export default placeSlice.reducer