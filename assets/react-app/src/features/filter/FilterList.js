import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveFiltersAsync, setFormData, deleteFilterAsync } from "./filterSlice";
import { useFilterForm } from "./hooks/useFilterForm";

const FilterList = () => {

    const filters = useSelector(state => state.filter.filters);
    const dispatch = useDispatch();

    const { openForm } = useFilterForm();

    useEffect(() => {
        dispatch(retrieveFiltersAsync());
    }, [])

    const handleEditFilter = (filter) => {
        dispatch(setFormData(filter));
        openForm();
    }

    return (
        <div>
            <table className={'table'}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Selection</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {filters.map(filter => (
                    <tr key={filter.id}>
                        <td>{filter.id}</td>
                        <td>{filter.name}</td>
                        <td>{filter.selection}</td>
                        <td className={'buttons'}>
                            <button className={'button is-primary'} onClick={() => handleEditFilter(filter)}>Edit
                            </button>
                            <button className={'button is-danger'}
                                    onClick={() => dispatch(deleteFilterAsync(filter.id))}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FilterList;
