import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        contentComponentName: null,
        footerComponentName: null,
        title: '',
    },
    reducers: {
        modalOpen: (state, action) => {
            state.isOpen = true;
            state.contentComponentName = action.payload.contentComponentName;
            state.footerComponentName = action.payload.footerComponentName;
            state.title = action.payload.title;
        },
        modalClose: state => {
            state.isOpen = false;
            state.contentComponentName = null;
            state.footerComponentName = null;
        }
    }
});

export const { modalOpen, modalClose}  = modalSlice.actions;
export default modalSlice.reducer;
