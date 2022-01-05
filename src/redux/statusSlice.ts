import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from '../models/Status';

const initialState = [] as Status[];

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        visibilityStatus: (state, action: PayloadAction<boolean>) => {
            
        }
    }
})

