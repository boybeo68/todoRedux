import reduce from './reducer/reducer'
import {AsyncStorage} from 'react-native'
import {createStore} from 'redux'
AsyncStorage.getItem('todos').then(value => {
    if(value && value.length){
        let initialStore = JSON.parse(value);
       const  store = createStore(reduce,initialStore);

    }else{
        const store = createStore(reduce);
    }
});
