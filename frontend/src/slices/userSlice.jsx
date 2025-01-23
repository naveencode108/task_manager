import {createSlice} from '@reduxjs/toolkit';

const initialState={
    token:localStorage.getItem('token')?localStorage.getItem('token'):null,
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }
});


export const {setToken,setUser}=userSlice.actions;

export default userSlice.reducer;