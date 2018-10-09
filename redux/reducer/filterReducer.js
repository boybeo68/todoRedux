const FilterReducer = (state='ShowAll', action) =>{
    if (action.type === 'FILTER_ShowAll') return 'ShowAll';
    if (action.type === 'FILTER_DONE') return 'Done';
    if (action.type === 'FILTER_NOT_DONE') return 'Not_Done';
    return state
};
export default FilterReducer