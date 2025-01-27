import {createSlice} from '@reduxjs/toolkit';

let initialState={
  alltask:null,
  loading:false
}

const taskSlice=createSlice({
    name:'task',
    initialState,
    reducers:{
        setTask:(state,action)=>{
            state.alltask=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})

export const {setTask,setLoading} = taskSlice.actions;

export default taskSlice.reducer;
