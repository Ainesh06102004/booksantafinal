import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class Settingscreen extends React.Component {
    constructor() {
        super();
        this.state = {
            currentuser: firebase.auth().currentUser.email,
            firstname: '',
            lastname: '',
            address: '',
            contact: '',
            docId: ''
        }
    }
    getdetails = () => {
        db.collection('Users').where('email', '==', this.state.currentuser).get().
            then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        firstname: doc.data().firstName,
                        lastname: doc.data().lastname,
                        address: doc.data().address,
                        contact: doc.data().contact,
                        docId: doc.id
                    })
                });
            });
        

    }

    updatedetails=()=>{
        db.collection("Users").doc(this.state.docId).update({
            "firstName": this.state.firstname,
            "lastname": this.state.lastname,
            "address": this.state.address,
            "contact": this.state.contact,
            
        })
        Alert.alert('Profile updated successfully!');
    }

    componentDidMount() {
        this.getdetails();
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.formTextInput}
                    placeholder={"First Name"}
                    maxLength={8}
                    onChangeText={(text) => {
                        this.setState({
                            firstname: text
                        })
                    }}
                    value = {this.state.firstname}
                />
                <TextInput
                    style={styles.formTextInput}
                    placeholder={"Last Name"}
                    maxLength={8}
                    onChangeText={(text) => {
                        this.setState({
                            lastname: text
                        })
                    }}
                    value = {this.state.lastname}
                />
                <TextInput
                    style={styles.formTextInput}
                    placeholder={"Contact"}
                    maxLength={10}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        this.setState({
                            contact: text
                        })
                    }}
                    value = {this.state.contact}
                />
                <TextInput
                    style={styles.formTextInput}
                    placeholder={"Address"}
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({
                            address: text
                        })
                    }}
                    value = {this.state.address}
                />
                <TouchableOpacity
                style={{alignSelf: 'center', marginTop: 20}}
                onPress={()=>{
                    this.updatedetails();
                }}
                >
                    <Text>Update</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 60,
        padding: 10
    },
})