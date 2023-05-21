import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    city: "Obninsk",
    id: "5c37c7bfa486a842f133b83328b5bcb8"
};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        }
    }
}
);


export const { setCity, setId } = masterSlice.actions;

export default masterSlice.reducer