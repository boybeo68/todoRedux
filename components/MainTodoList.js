import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, TextInput, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import {Container, Content, Header, Button, Icon, Fab} from 'native-base'
import TodoItem from './TodoItem'
import {AddTodo, GetData, DeleteAll, DoneAll} from '../redux/actionCreator'
import PopupDialogComponents from './PopupDialog'

const width = Dimensions.get('window').width;

class MainTodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            name: '',
        };
    }
    deleteAll = async () =>{
      await  this.props.DeleteAll();
        this._storeData(this.props.defaultTodoList)
    };

    _storeData = async (todos) => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            alert(error)
        }
    };
    addTodo = async () => {
        await this.props.AddTodo(this.state.name);
        this._storeData(this.props.defaultTodoList)
    };

    componentWillMount() {
        AsyncStorage.getItem('todos').then(value => {
            if (value !== null) {
                let initialStore = JSON.parse(value);
                this.props.GetData(initialStore);
            } else {

            }
        });
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
                                           this.addTodo();
                                           this.state.name = '';
                                       }
                                   }}
                                   onChangeText={text => this.setState({name: text})}/>
                    </View>

                    <FlatList data={this.props.defaultTodoList}
                              renderItem={({item, index}) => <TodoItem popupDialogComponent={this.popupDialogComponent}
                                                                       todo={item}/>}
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
                        this.deleteAll();
                    }}>
                        <Icon name="md-trash"/>
                    </Button>
                    <Button style={{backgroundColor: '#DD5144'}} onPress={() => {
                        this.props.DoneAll()
                    }}>
                        <Icon name="md-done-all"/>
                    </Button>
                </Fab>
                <PopupDialogComponents ref={(popupDialogComponent) => {
                    this.popupDialogComponent = popupDialogComponent;
                }}/>
            </Container>
        );
    }

}

function initMapStateToProps(state) {
    return {
        defaultTodoList: state.defaultTodoList
    }
}

export default connect(initMapStateToProps, {AddTodo, GetData, DeleteAll,DoneAll})(MainTodoList)
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