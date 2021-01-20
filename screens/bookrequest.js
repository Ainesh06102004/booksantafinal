import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Header, Icon } from 'react-native-elements';



export default class Bookrequest extends React.Component {
    constructor() {
        super();
        this.state = {
            currentuser: firebase.auth().currentUser.email,
            bookname: '',
            reason: ''
        }
    }
    createuniqueId(){
        return Math.random().toString(32).substring(7);
    }

    addRequest = (name, reason)=>{
        var id = this.createuniqueId();
        db.collection('Requests').add({
            user: this.state.currentuser,
            bookname: name,
            reason: reason,
            requestId: id
        });
        this.setState({
            bookname: '',
            reason: ''
        })
        Alert.alert("Book request submitted!!");
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    containerStyle={{backgroundColor: 'black', height: 50}}
                    leftComponent={<Icon color = 'white'
                        name="bars" type="font-awesome" onPress={() => {
                        this.props.navigation.toggleDrawer()
                    }} />}
                    rightComponent={{}}
                    centerComponent={{ text: 'Request Books!', style: { color: 'white', marginTop: 5 } }}
                />
                <TextInput
                    placeholder='Name'
                    onChangeText={(text) => {
                        this.setState({
                            bookname: text
                        })
                    }}
                    value={this.state.bookname}
                    style={{
                        width: "75%",
                        height: 35,
                        alignSelf: 'center',
                        borderColor: 'black',
                        borderRadius:25,
                        borderWidth: 2,
                        marginTop: 220,
                        padding: 10
                    }}
                />

                <TextInput
                    placeholder='Why do you want this book?'
                    onChangeText={(text) => {
                        this.setState({
                            reason: text
                        })
                    }}
                    value={this.state.reason}
                    multiline={true}
                    style={{
                        width: "75%",
                        height: 35,
                        alignSelf: 'center',
                        borderColor: 'black',
                        borderRadius: 25,
                        borderWidth: 2,
                        marginTop: 20,
                        padding: 10
                    }} />
                <TouchableOpacity 
                style={{alignSelf: 'center', backgroundColor: 'black', marginTop: 30, height:30, width:90, borderRadius: 30}}
                onPress = {()=>{this.addRequest(this.state.bookname, this.state.reason)}}>
                    <Text style ={{alignSelf: "center", color: 'white', marginTop: 3}}>Request</Text>
                </TouchableOpacity>

            </View>
        )
    }
}