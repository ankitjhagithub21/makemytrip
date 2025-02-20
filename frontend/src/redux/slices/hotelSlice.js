import { createSlice } from '@reduxjs/toolkit'


export const hotelSlice = createSlice({
  name: 'hotel',
  initialState:{
     hotels:[],
     currHotel:null,
     isLoading:true,
     searchTerm:'',
  },
  
  reducers: {
   
    setHotels: (state, action) => {
      state.hotels = action.payload
    },

    setCurrHotel: (state, action) => {
      state.currHotel = action.payload
    },
    setIsLoading:(state,action) => {
      state.isLoading = action.payload
    },
   
   
    setSearchTerm:(state,action) => {
      state.searchTerm = action.payload
    },

    
  },
})


export const { setHotels,setCurrHotel,setIsLoading,setSearchTerm } = hotelSlice.actions

export default hotelSlice.reducer