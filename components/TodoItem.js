import React, {Component} from 'react';

import {View, Text, StyleSheet, Alert, TouchableOpacity, AsyncStorage} from 'react-native';
import {SwipeRow, Icon, Button} from 'native-base'
import {deleteTodo, editTodo, doneTdodo} from '../redux/actionCreator'
import {connect} from 'react-redux'

// import styles from './styles';

class TodoItem extends Component {
    showDelete = (id) => {
        Alert.alert(
            'Alert',
            'Are you sure you want to delete ?',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'Yes', onPress: () => {
                        this.deleItem(id);

                    }
                },
            ],
            {cancelable: true}
        );
    };
    deleItem= async (id)=>{
       await this.props.deleteTodo(id);
        this._storeData(this.props.defaultTodoList)
    };
    showEditModal = (popupDialogComponent,id,name) => {
        // todo sử dụng refs với redux
        popupDialogComponent.getWrappedInstance().editDialogComponent(id,name);
    };
    _storeData = async (todos) => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            alert(error)
        }
    };

    render() {
        const {todo, popupDialogComponent} = this.props;
        const textDecorationLine = todo.done ? 'line-through' : 'none';
        const color = todo.done ? 'red' : '#fff';
        return (
            <SwipeRow
                rightOpenValue={-75}
                body={
                    <View style={styles.todoItem}>
                        <TouchableOpacity onPress={() => {
                            this.props.doneTdodo(todo.id)
                        }}>
                            <Text style={{color, fontSize: 15, textDecorationLine}}>{todo.name}</Text>
                        </TouchableOpacity>
                    </View>
                }
                right={
                    <View style={{height: 50, justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                        <Button style={{marginBottom: 5}} small rounded danger onPress={() => this.showDelete(todo.id)}>
                            <Icon active name="trash"/>
                        </Button>
                        <Button small rounded primary
                                onPress={() => this.showEditModal(popupDialogComponent, todo.id, todo.name)}>
                            <Icon active name="ios-build-outline"/>
                        </Button>
                    </View>
                }
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        defaultTodoList: state.defaultTodoList
    }
}

export default connect(mapStateToProps, {deleteTodo, editTodo, doneTdodo, })(TodoItem);
const styles = StyleSheet.create({
    todoItem: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#8DA1D4',
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    }
});