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
            state.value = action.payload
        },
    },
})

const togleSlice = createSlice({
    name:'togle',
    initialState:{
        togle:false,
    },
    reducers:{
        togleNav:state=>{
            state.togle=!state.togle;
        }
    }
})

export const {setActive} = navSlice.actions
export const {togleNav} = togleSlice.actions

export const navReducer = navSlice.reducer;
export const togle = togleSlice.reducer;