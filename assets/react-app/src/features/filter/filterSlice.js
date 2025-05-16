import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from "../../service/apiClient";
import { getCookieValue, setCookieValue } from "../../utils/cookieUtils";
import Notification from "../../utils/Notification";

export const saveFilterAsync = createAsyncThunk(
    'filter/saveFilterAsync',
    async (_, { getState, rejectWithValue}) => {
        const state = getState();
        const formData = state.filter.formData;

        try {
            if (formData.id) {
                const response = await apiClient.put('/filter/update', formData);
                return response.data;
            } else {
                const response = await apiClient.post('/filter/create', formData);
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({
                errors: [{ message: 'An unexpected error occurred' }]
            });
        }
    }
);

export const retrieveFiltersAsync = createAsyncThunk(
    'filter/retrieveFiltersAsync',
    async () => {
        const response = await apiClient.get('/filter/retrieve');
        return response.data;
    }
);

export const deleteFilterAsync = createAsyncThunk(
    'filter/deleteFilterAsync',
    async (id) => {
        await apiClient.delete('/filter/delete/' + id);
        return id;
    }
);

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        formData: {
            name: '',
            selection: '',
            filterCriteriaCollection: []
        },
        isModalDialogMode: getCookieValue('isModalDialogMode'),
        formIsVisible: false,
        filters: []
    },
    reducers: {
        updateFormData: (state, action) => {
            const { field, value } = action.payload;
            state.formData[field] = value;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        resetFormData: (state) => {
            state.formData = {
                name: '',
                selection: '',
                filterCriteriaCollection: []
            };
        },
        setIsModalDialogMode: (state, action) => {
            state.isModalDialogMode = action.payload;
            setCookieValue('isModalDialogMode', action.payload);
        },
        setFormIsVisible: (state, action) => {
            state.formIsVisible = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveFilterAsync.fulfilled, (state, action) => {

            const transformedPayload = {
                ...action.payload,
                filterCriteriaCollection: Object.values(action.payload.filterCriteriaCollection)
            };

            const existingFilterIndex = state.filters.findIndex(filter => filter.id === transformedPayload.id);

            if (existingFilterIndex >= 0) {
                state.filters[existingFilterIndex] = transformedPayload;
            } else {
                state.filters = [...state.filters, transformedPayload];
            }

        });

        builder.addCase(saveFilterAsync.rejected, (state, action) => {

            if (action.payload?.errors) {
                action.payload.errors.forEach(error => {
                    Notification.warning(error.message)
                });
            }
            state.status = 'failed';
            state.error = action.payload?.errors || 'An error occurred';
        });

        builder.addCase(retrieveFiltersAsync.fulfilled, (state, action) => {

            state.filters = action.payload;
        });
        builder.addCase(deleteFilterAsync.fulfilled, (state, action) => {

            state.filters = state.filters.filter(filter => filter.id !== action.payload);

        });
    }
});

export const { updateFormData, setFilters, setFormData, resetFormData, setIsModalDialogMode, setFormIsVisible } = filterSlice.actions;
export default filterSlice.reducer;
