import React from 'react';
import { useFilterForm } from "./hooks/useFilterForm";

const FilterForm = () => {

    const { closeForm, handleSubmitForm } = useFilterForm();

    return (
        <div className={'buttons is-justify-content-flex-end'}>
            <button className={'button'} onClick={() => closeForm()}>Close</button>
            <button className={'button is-primary '} onClick={handleSubmitForm}>Save</button>
        </div>
    );
};

export default FilterForm;
