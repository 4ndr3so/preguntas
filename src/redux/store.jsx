import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/dataSlice"
export const store =configureStore({
    reducer:{
        dataPreg:dataReducer
    }
})