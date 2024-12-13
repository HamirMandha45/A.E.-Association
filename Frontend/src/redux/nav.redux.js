// import 
import {createSlice} from '@reduxjs/toolkit'

const navSlice = createSlice({
    name:'activeNav',
    initialState:{
        value:'',
    },
    reducers:{
        setActive:(state,action)=>{
            // console.log('hello')
            console.log(action.payload)
            state.value = action.payload
        },
    },
})

export const {setActive} = navSlice.actions


export const navReducer = navSlice.reducer;