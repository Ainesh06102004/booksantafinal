import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView, } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Card } from 'react-native-elements';

export default class Detailscreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentuser: firebase.auth().currentUser.email,
            recieverid: this.props.navigation.getParam('details')["user"],
            bookname: this.props.navigation.getParam('details')["bookname"],
            reason: this.props.navigation.getParam('details')["reason"],
            requestId: this.props.navigation.getParam('details')["requestId"],
            recievername: '',
            recievercontact: '',
            recieveraddress: '',
            num: 0 
        }
    }
    getdetails(){
        db.collection('Users').where("email", "==", this.state.recieverid).get().
            then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        recievercontact: doc.data().contact,
                        recieveraddress: doc.data().address
                    })
                });
            });
    }
    getusername(){
        db.collection('Users').where('email', '==', this.state.recieverid).get().
        then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    recievername: doc.data().firstName + " " + doc.data().lastname
                })
            });
        });
    }
    componentDidMount() {
        this.getdetails();
        this.getusername();
    }
   

    render() {
        return (
            <View style ={{flex:1, marginTop:50}}>
                <View style={{ flex: 0.3 }}>
                    <Text style = {{fontSize: 20, alignSelf: 'center'}}>Book Information</Text>
                    <Card
                        title={"Book Information"}
                        titleStyle={{ fontSize: 20 }}
                    >
                        <Card >
                            <Text style={{ fontWeight: 'bold' }}>Name : {this.state.bookname}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Reason : {this.state.reason}</Text>
                        </Card>
                    </Card>
                </View>
                <View style={{ flex: 0.3 }}>
                <Text style = {{fontSize: 20, alignSelf: 'center', marginTop: 50}}>User Information</Text>
                    <Card
                        title={"Reciever Information"}
                        titleStyle={{ fontSize: 20 }}
                    >
        
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Name: {this.state.recievername}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Contact: {this.state.recievercontact}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Address: {this.state.recieveraddress}</Text>
                        </Card>
                    </Card>
                </View>
            </View>
        )
    }
}