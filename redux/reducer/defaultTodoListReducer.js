import {AsyncStorage} from 'react-native'

const defaultTodoList = [
    // {id: 1, name: 'hoàn thành relam', done: false},
    // {id: 2, name: 'Nhanh hơn ông anh Lâm', done: false},
];

const defaultTodoListReducer = (state = defaultTodoList, action) => {

    switch (action.type) {
        case 'DoneAll':
            return state.map(item=>{
               return {...item, done:true}
            });
        case 'DeleteAll':
            return state.filter(item=>{
                return item.done !== true;
            });
        case 'GetData' :
            return [...state, ...action.data];
        case 'AddTodo' :
            return [{
                id: state.length + 1,
                name: action.name,
                done: false,
            }, ...state];
        case 'editTodo':
            return state.map(item => {
                if (item.id !== action.id) {
                    return item
                }
                return {...item, name: action.name}
            });
        case 'deleteTodo':
            return state.filter(item => {
                return item.id !== action.id
            });
        case 'doneTdodo':
            return state.map(item => {
                if (item.id !== action.id) {
                    return item
                }
                return {...item, done: !item.done}
            });
    }
    return state
};
export default defaultTodoListReducer