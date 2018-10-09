import React, {Component} from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    Platform, Image, TextInput
} from "react-native";
import PopupDialog, {SlideAnimation, DialogTitle} from 'react-native-popup-dialog';
//Database

// import styles from './styles';

export default class PopupDialogComponents extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Show Dialog"
                    onPress={() => {
                        this.popupDialog.show();
                    }}
                />
                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                >
                    <View>
                        <Text>Hello</Text>
                    </View>
                </PopupDialog>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});