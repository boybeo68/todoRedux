const showPopupReducer = (state= false , action) =>{
    if (action.type==='showPopup') {
        return !state
    }
    return state
};
export default showPopupReducer