import { useSelector } from 'react-redux';
import { modalOpen, modalClose } from "../../modal/modalSlice";
import { useDispatch } from 'react-redux';
import {setIsModalDialogMode, setFormIsVisible, saveFilterAsync} from "../filterSlice";
import Notification from "../../../utils/Notification";

export const useFilterForm = () => {
    const stateFilter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const openForm = () => {

        dispatch(setFormIsVisible(true));

        if (stateFilter.isModalDialogMode) {
            dispatch(modalOpen({
                contentComponentName: 'features/filter/FilterForm',
                footerComponentName: 'features/filter/FilterFormButtons',
                title: 'Filter form'
            }));
        }
    }

    const closeForm = () => {
        dispatch(setFormIsVisible(false));
        dispatch(modalClose());
    }

    const isModalDialogModeToggle = () => {
        dispatch(setIsModalDialogMode(!stateFilter.isModalDialogMode));

        if (stateFilter.isModalDialogMode) {
            dispatch(modalClose());
        } else {
            dispatch(modalOpen({
                contentComponentName: 'features/filter/FilterForm',
                footerComponentName: 'features/filter/FilterFormButtons',
                title: 'Filter form'
            }));
        }
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();

        const form = document.getElementById('filter-form');

        if (!(stateFilter.formData.filterCriteriaCollection.length > 0)) {
            Notification.warning('Please add at least one criteria');
            return;
        }

        if (form.checkValidity()) {
            dispatch(saveFilterAsync());
            closeForm();
        } else {
            form.reportValidity();
        }
    }

    return { openForm, closeForm, isModalDialogModeToggle, handleSubmitForm };

};
