import React, {Component} from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    Platform, Image, TextInput
} from "react-native";
import PopupDialog, {SlideAnimation, DialogTitle} from 'react-native-popup-dialog';
import {Button, Container, Content, Header} from "native-base";
import {connect} from 'react-redux'
import {editTodo} from '../redux/actionCreator'
//Database

// import styles from './styles';

  class PopupDialogComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id:0
        };
    }
    showDialogComponent = () => {
        this.popupDialog.show();
    };
    editDialogComponent = (id,name) => {
        this.popupDialog.show();
        this.setState({id,name});
    };

    render() {
        return (
            <PopupDialog
                width={0.7} height={190}
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
                        marginHorizontal: 10,
                        flex:1
                    }} placeholder='Edit todo ' autoCorrect={false}
                               underlineColorAndroid="transparent" placeholderTextColor='#8DA1D4'
                               value={this.state.name} onChangeText={text => this.setState({name: text})}
                               onSubmitEditing={()=>{
                                   this.props.editTodo(this.state.id,this.state.name);
                                   this.popupDialog.dismiss()
                               }}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10, flex:1}}>
                        <Button success style={{width: 70, justifyContent: 'center', borderRadius: 5}} onPress={()=>{
                            this.props.editTodo(this.state.id,this.state.name);
                            this.popupDialog.dismiss()
                        }}><Text
                            style={{color: '#fff'}}>Edit</Text></Button>
                        <Button danger style={{width: 70, justifyContent: 'center', borderRadius: 5}}><Text
                            style={{color: '#fff'}}
                            onPress={() => {
                                this.popupDialog.dismiss(() => {
                                    console.log('Called Cancel, dismiss popup')
                                });
                            }}
                        >Cancel</Text></Button>
                    </View>
                </Content>
            </PopupDialog>
        );
    }
}
export default connect(null,{editTodo},null,{ withRef: true })(PopupDialogComponents)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});