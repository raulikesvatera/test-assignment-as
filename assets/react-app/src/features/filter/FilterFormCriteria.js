import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "./filterSlice";

const FilterFormCriteria = ({item, index}) => {

    const stateFilter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const optionsConditionTypesByField= {
        Amount: ['More', 'Less', 'Equal'],
        Title: ['Equal', 'Starts with'],
        Date: ['From', 'To']
    }

    const valueTypeByField = {
        Amount: 'number',
        Title: 'text',
        Date: 'date'
    }

    const handleFieldChange = (e) => {
        updateFromData(e.target.name, e.target.value)
    }

    const updateFromData = (name, value) => {
        const newFormData = {
            ...stateFilter.formData,
            filterCriteriaCollection: [...stateFilter.formData.filterCriteriaCollection]

        };
        newFormData.filterCriteriaCollection[index] = {
            ...newFormData.filterCriteriaCollection[index],
            [name]: value
        }

        dispatch(setFormData(newFormData));
    }

    const handleRemoveCriteria = (index) => {

        const newCriteriaList = stateFilter.formData.filterCriteriaCollection.filter((_, i) => i !== index);

        const newFormData = {
            ...stateFilter.formData,
            filterCriteriaCollection: newCriteriaList
        }
        dispatch(setFormData(newFormData));
    }

    return (
        <tr>
            <td className={'pb-2 pr-1'}>
                <input type="hidden" name="id" id="id" value={item.id || ''} />
                <div className={'select'}>
                    <select
                        name="field"
                        value={item.field}
                        onChange={e => handleFieldChange(e)}
                        required
                    >
                        <option value="Amount">Amount</option>
                        <option value="Title">Title</option>
                        <option value="Date">Date</option>
                    </select>
                </div>
            </td>

            <td className={'pb-2 pr-1'}>
                <div className={'select'}>
                    <select
                        name='condition_type'
                        value={item.condition_type}
                        onChange={e => handleFieldChange(e)}
                        required
                    >
                        {(optionsConditionTypesByField[item.field] || [] ).map(option => (
                            <option value={option} key={option}>{option}</option>
                        ))}

                    </select>
                </div>
            </td>

            <td className={'pb-2 pr-1'}>
                {item.field === 'Date' ? (
                    <input
                        className={'input'}
                        name="value"
                        value={item.value}
                        type="date"
                        onChange={e => handleFieldChange(e)}
                        required
                        pattern="\d{4}-\d{2}-\d{2}"
                    />
                ) : (
                    <input
                        className={'input'}
                        name="value"
                        value={item.value}
                        type={valueTypeByField[item.field] || 'text'}
                        onChange={e => handleFieldChange(e)}
                        required
                    />
                )}
            </td>

            <td className={'pb-2 has-text-right'}>
                <button className={'button is-danger'} onClick={(e) => {e.preventDefault(); handleRemoveCriteria(index);} }> -</button>
            </td>
        </tr>
    );
};

export default FilterFormCriteria;
