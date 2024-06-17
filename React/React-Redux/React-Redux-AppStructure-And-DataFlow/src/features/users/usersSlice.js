import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk('users/fetchUsers', async function (){
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, function(state, action){
            return action.payload;
        });
    }
});

function selectAllUsers(state) { return state.users };
function selectUserById(state, userId) { state.users.find(user => user.id === userId) };
const usersReducer = usersSlice.reducer;

export { usersReducer, selectAllUsers, selectUserById, fetchUsers };