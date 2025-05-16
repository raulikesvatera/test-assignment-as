import React from 'react';
import FilterList from "./FilterList";
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../modal/Modal';
import { resetFormData } from "./filterSlice";
import FilterForm from "./FilterForm";
import FilterFormButtons from "./FilterFormButtons";
import { useFilterForm } from "./hooks/useFilterForm";

const Filter = () => {

    const dispatch = useDispatch();
    const stateFilter = useSelector(state => state.filter);
    const { openForm } = useFilterForm();

    const openFilterForm = () => {
        dispatch(resetFormData());
        openForm();
    }

    return (
        <div>
            <button className={'button is-primary mb-5'} onClick={() => openFilterForm()}>Add filter</button>
            { !stateFilter.isModalDialogMode && stateFilter.formIsVisible &&
                <div className={'box'}>
                    <FilterForm></FilterForm>
                    <FilterFormButtons></FilterFormButtons>
                </div>
            }
            <div className={'box'}>
                <FilterList></FilterList>
            </div>
            <Modal></Modal>
        </div>
    );
};

export default Filter;
