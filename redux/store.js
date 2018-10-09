import reduce from './reducer/reducer'
import {createStore} from 'redux'
 const store = createStore(reduce);
export default store