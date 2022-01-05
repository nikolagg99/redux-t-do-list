import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";
import { stat } from "fs";

const initialState = [] as Todo[];// set wha the state is at the start of the app

const todoSlice = createSlice({// builtinto redux toolkit function which takes an object as a parameter with 3 required fields
    name:'todos',// name tehe generated action types from createSlice
    initialState,// what our state is initially when we first start our app
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                    state.push(action.payload)
            },
            prepare: (description: string ) => ({
                payload: {
                    id: uuidv4(),
                    description,
                    completed: false,
                } as Todo,
            }),
        },
        removeTodo(state, action: PayloadAction<string>){
            const index = state.findIndex((todo) => todo.id === action.payload);
            state.splice(index, 1);
        },
        setTodoStatus(
            state,
            action: PayloadAction<{completed: boolean, id: string}>
        ) {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
    },
});

export const { addTodo, removeTodo, setTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;