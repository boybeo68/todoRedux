import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, Dimensions, FlatList, TextInput, TouchableOpacity,AsyncStorage } from 'react-native';
import {connect} from 'react-redux'
import {Container, Content, Header, Left, Right, Body, Button, Icon, Fab, Footer} from 'native-base'
import TodoItem from './TodoItem'
import {AddTodo,getData} from '../redux/actionCreator'
import PopupDialog, {SlideAnimation, DialogTitle} from 'react-native-popup-dialog';
// import realm from '../database/allSchemas'

// import styles from './styles';

const width = Dimensions.get('window').width;

class MainTodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            name: '',
            nameEdit: ''
        };
    }

    _storeData = async (todos) => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            alert(error)
        }
    };

    componentWillMount(){
        
    }
    render() {
        return (
            <Container>
                <Header transparent>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#46529D',
                        height: 40,
                        width
                    }}>
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
                            Todo List
                        </Text>
                    </View>
                </Header>
                <Content>
                    <View>
                        <TextInput style={styles.inputText} placeholder='Input todo ' autoCorrect={false}
                                   underlineColorAndroid="transparent" placeholderTextColor='#8DA1D4'
                                   value={this.state.name}
                                   onSubmitEditing={() => {
                                       if (this.state.name.trim().length < 1) {
                                           alert('Please insert to do')
                                       } else {
                                           this.props.AddTodo(this.state.name);
                                           this.state.name = '';
                                           this._storeData(this.props.defaultTodoList)
                                       }
                                   }}
                                   onChangeText={text => this.setState({name: text})}/>
                    </View>

                    <FlatList data={this.props.defaultTodoList} renderItem={({item, index}) => <TodoItem PopupDialog={this.popupDialog} todo={item}/>}
                              keyExtractor={item => item.id.toString()}>
                    </FlatList>
                </Content>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: '#5067FF'}}
                    position="bottomRight"
                    onPress={() => this.setState({active: !this.state.active})}>
                    <Icon name="ios-settings" style={{color: '#fff'}}/>
                    <Button style={{backgroundColor: '#34A34F'}}>
                        <Icon name="ios-search"/>
                    </Button>
                    <Button style={{backgroundColor: '#3B5998'}} onPress={() => {
                        this.popupDialog.show();
                    }}>
                        <Icon name="md-trash"/>
                    </Button>
                    <Button style={{backgroundColor: '#DD5144'}} onPress={() => {
                        if (this.state.name.trim().length < 1) {
                            alert('Please insert to do')
                        } else {
                            this.props.AddTodo(this.state.name);
                            this.state.name = ''
                        }
                    }}>
                        <Icon name="ios-add"/>
                    </Button>
                </Fab>
                <PopupDialog
                    width={0.7} height={0.4}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog;
                    }}
                >
                    <Header transparent>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#46529D',
                            height: 40,
                            borderRadius: 5
                        }}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
                                Edit Todo
                            </Text>
                        </View>
                    </Header>
                    <Content>
                        <TextInput style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#5067FF',
                            padding: 10,
                            marginHorizontal: 10
                        }} placeholder='Edit todo ' autoCorrect={false}
                                   underlineColorAndroid="transparent" placeholderTextColor='#8DA1D4'
                                   value={this.state.name}
                                   onChangeText={text => this.setState({nameEdit: text})}/>
                        <View style={{ flexDirection: 'row', justifyContent:'space-around', margin: 10}}>
                            <Button success style={{width:70, justifyContent:'center', borderRadius:5}} ><Text style={{color:'#fff'}}>Edit</Text></Button>
                            <Button danger style={{width:70, justifyContent:'center',borderRadius:5}} ><Text style={{color:'#fff'}}
                                onPress={()=>{
                                    this.popupDialog.dismiss(() => {
                                        console.log('Called Cancel, dismiss popup')
                                    });
                                }}
                            >Cancel</Text></Button>
                        </View>
                    </Content>
                </PopupDialog>
            </Container>
        );
    }
}

function initMapStateToProps(state) {
    return {
        defaultTodoList: state.defaultTodoList
    }
}

export default connect(initMapStateToProps, {AddTodo,getData})(MainTodoList)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#5067FF',
        width: width - 30,
        padding: 10,
        marginHorizontal: 10
    }
});