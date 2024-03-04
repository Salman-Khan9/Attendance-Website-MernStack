import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";
import auth from "../Slices/AuthSlice";
import teacher from "../Slices/TeacherSlice"
const persisConfig = {
key:"root",
storage
}
const persistedReducer = persistReducer(
    persisConfig,
    combineReducers({
        auth,
        teacher
    })
)
const store =  configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store)

export {store}