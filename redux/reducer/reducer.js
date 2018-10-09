import {combineReducers} from 'redux'
import FiterReducer from './filterReducer'
import defaultTodoListReducer from './defaultTodoListReducer'
import showPopupReducer from './showPopupReducer'

const reduce = combineReducers({
    filter: FiterReducer,
    defaultTodoList: defaultTodoListReducer,
    showPopup: showPopupReducer
});
export default reduce