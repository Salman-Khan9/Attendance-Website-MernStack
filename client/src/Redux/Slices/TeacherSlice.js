import { createSlice } from '@reduxjs/toolkit'
const initialState = {
teacher:{}
}

const TeacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    set_teacher(state,action){
        state.teacher = action.payload
    },
    del_teacher(state){
        state.teacher = []
    }

  }
});

export const {set_teacher,del_teacher} = TeacherSlice.actions
export const selectteacher = (state)=>state.teacher.teacher
export const selectdel_teacher = (state)=>state.teacher.teacher
export default TeacherSlice.reducer