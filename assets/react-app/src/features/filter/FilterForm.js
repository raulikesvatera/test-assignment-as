import React from 'react';
import FilterFormCriteria from "./FilterFormCriteria";
import { updateFormData, saveFilterAsync, setFormData } from "./filterSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useFilterForm } from "./hooks/useFilterForm";
import Notification from "../../utils/Notification";

import './filter.css';

const FilterForm = () => {

    const dispatch = useDispatch();
    const stateFilter = useSelector(state => state.filter);

    const { isModalDialogModeToggle, closeForm } = useFilterForm();

    const handleAddCriteria = (e) => {
        e.preventDefault();
        const newFormData = {
            ...stateFilter.formData,
            filterCriteriaCollection: [
                ...stateFilter.formData.filterCriteriaCollection,
                {
                    field: 'Amount',
                    condition_type: 'Equal',
                    value: ''
                }
            ]
        }
        dispatch(setFormData(newFormData))
    }

    const handleSubmitForm = (event) => {

        event.preventDefault();

        const form = event.target.closest('form');

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

    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <div className={'field is-horizontal'}>
                    <div className={'field-label is-normal'}>
                        <label className={'label'} htmlFor="filter-form-modal-dialog-mode" >Modal Dialog Mode</label>
                    </div>
                    <div className={'field-body'}>
                        <input type="checkbox" name="filter_form_modal_dialog_mode" id='filter-form-modal-dialog-mode' onChange={isModalDialogModeToggle} checked={stateFilter.isModalDialogMode}/>
                    </div>
                </div>
                <input type="hidden" name="id" id="id" value={stateFilter.formData.id || ''}/>
                <div className={'field is-horizontal'}>
                    <div className={'field-label is-normal'}>
                        <label className={'label'} htmlFor={'filter_name'}>Filter name</label>
                    </div>
                    <div className={'field-body'}>
                        <input className={'input'} type="text" name="name" id="name"
                           value={stateFilter.formData.name || ''}
                           onChange={(e) => dispatch(updateFormData({field: 'name', value: e.target.value}))}
                           required
                        />
                    </div>
                </div>
                <div className={'field is-horizontal'}>
                    <div className={'field-label is-normal'}>
                        <label className={'label'}>Criteria</label>
                    </div>
                    <div className={'field-body'}>
                        <table style={{width: '100%'}}>
                            <tbody>
                                {stateFilter.formData.filterCriteriaCollection.map((item, index) => (
                                    <FilterFormCriteria key={index} item={item} index={index}/>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={'field is-horizontal'}>
                    <div className={'field-label is-normal'}>
                        <label className={'label'}></label>
                    </div>
                    <div className={'field-body'}>
                        <button className={'button is-primary'} onClick={handleAddCriteria}>+ ADD ROW</button>
                    </div>
                </div>
                <br/>
                <div className={'field is-horizontal'}>
                    <div className={'field-label is-normal'}>
                        <label className={'label'}>Selection</label>
                    </div>
                    <div className={'field-body'}>
                        <div className={'radios'}>
                            <label className={'radio'}>
                                <input
                                    type="radio"
                                    name="selection"
                                    value="Selection 1"
                                    checked={stateFilter.formData.selection === 'Selection 1'}
                                    onChange={(e) => dispatch(updateFormData({field: 'selection', value: e.target.value}))}
                                    required
                                />
                                &nbsp;Selection 1
                            </label>

                            <label className={'radio'}>
                                <input
                                    type="radio"
                                    name="selection"
                                    value="Selection 2"
                                    checked={stateFilter.formData.selection === 'Selection 2'}
                                    onChange={(e) => dispatch(updateFormData({field: 'selection', value: e.target.value}))}
                                    required
                                />
                                &nbsp;Selection 2
                            </label>

                            <label className={'radio'}>
                                <input
                                    type="radio"
                                    name="selection"
                                    value="Selection 3"
                                    checked={stateFilter.formData.selection === 'Selection 3'}
                                    onChange={(e) => dispatch(updateFormData({field: 'selection', value: e.target.value}))}
                                    required
                                />
                                &nbsp;Selection 3
                            </label>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={'buttons is-justify-content-flex-end\n'}>
                    <button className={'button'} onClick={() => closeForm()}>Close</button>
                    <button className={'button is-primary '} type="submit">Save</button>
                </div>
            </form>
        </div>
    );
};

export default FilterForm;
