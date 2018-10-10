import React from 'react';
import {Provider} from 'react-redux'
import reduce from './redux/reducer/reducer'
import MainTodoList from './components/MainTodoList'
import {createStore} from 'redux'


export default class App extends React.Component {
  render() {
    return (
        <Provider store={store} >
            <MainTodoList/>
        </Provider>
    );
  }
}
let store=createStore(reduce);
