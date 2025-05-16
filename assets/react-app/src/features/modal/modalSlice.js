import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        componentName: null,
        title: '',
    },
    reducers: {
        modalOpen: (state, action) => {
            state.isOpen = true;
            state.componentName = action.payload.componentName;
            state.title = action.payload.title;
        },
        modalClose: state => {
            state.isOpen = false;
            state.componentName = null;
        }
    }
});

export const { modalOpen, modalClose}  = modalSlice.actions;
export default modalSlice.reducer;
