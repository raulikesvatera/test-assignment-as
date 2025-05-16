import { useSelector } from 'react-redux';
import { modalOpen, modalClose } from "../../modal/modalSlice";
import { useDispatch } from 'react-redux';
import { setIsModalDialogMode, setFormIsVisible } from "../filterSlice";

export const useFilterForm = () => {
    const stateFilter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const openForm = () => {

        dispatch(setFormIsVisible(true));

        if (stateFilter.isModalDialogMode) {
            dispatch(modalOpen({componentName: 'features/filter/FilterForm', title: 'Filter form'}));
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
            dispatch(modalOpen({componentName: 'features/filter/FilterForm', title: 'Filter form'}));
        }
    }

    return { openForm, closeForm, isModalDialogModeToggle };

};
