import { configureStore } from "@reduxjs/toolkit";
import auth from "../Slices/AuthSlice";

const store =  configureStore({
    reducer:{
auth:auth
    }
});
export {store}