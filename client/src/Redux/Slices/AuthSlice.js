import { createSlice } from '@reduxjs/toolkit'

const initialState = {
logstatus : false,
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set_logstatus(state,action){
     state.logstatus = action.payload
    }
  }
});

export const {set_logstatus} = AuthSlice.actions
export const selectloggedstatus = (state)=>state.auth.logstatus

export default AuthSlice.reducer