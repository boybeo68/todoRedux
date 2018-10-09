import {AsyncStorage} from 'react-native'
const defaultTodoList = [
    // {id: 1, name: 'hoàn thành relam', done: false},
    // {id: 2, name: 'Nhanh hơn ông anh Lâm', done: false},
];
async function _retrieveData (state) {
    try {
        const value = await AsyncStorage.getItem('todos');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        // Error retrieving data

    }
}
const defaultTodoListReducer = (state = defaultTodoList, action) => {

    switch (action.type) {
        case 'AddTodo' :
            return [{
                id: state.length + 1,
                name: action.name,
                done: false,
            }].concat(state);
        case 'editTodo':
            return state.map(item => {
                if (item.id !== action.id ) {return item}
                return {...item, name: action.name}
            });
        case 'deleteTodo':
           return state.filter(item => {
               return item.id !== action.id
           });
        case 'doneTdodo':
            return state.map(item=>{
                if (item.id !== action.id){
                    return item
                } return {...item, done: !item.done}
            });
        case 'getData':
                _retrieveData(state);
    }
    return state
};
export default defaultTodoListReducer