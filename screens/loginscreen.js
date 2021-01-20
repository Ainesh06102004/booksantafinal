import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
//import Santalogo from '../components/logo';

export default class Loginscreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            pass: '',
            showmodal: false,
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: ''
        }
    }

    userSignUp = (email, password, confirmpass) => {
        if (password === confirmpass) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                db.collection("Users").add({
                    firstName: this.state.firstName,
                    lastname: this.state.lastName,
                    email: this.state.email,
                    address: this.state.address,
                    contact: this.state.contact,
                    
                })
                return (
                    Alert.alert('User registered successfully', '', [
                        {
                            text: 'OK', onPress: () => this.setState({ showmodal: false })
                        }
                    ])
                )

            })
        } else {
            return Alert.alert("Passwords do not match")
        }
    }
    checkuser = async (email, pass) => {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                this.props.navigation.navigate('AppDrawer');
                //Alert.alert("successfully logged in!!");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
    }


    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.showmodal}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text
                                style={styles.modalTitle}
                            >Registration</Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"First Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Last Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        lastName: text
                                    })
                                }}
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
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Email"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({
                                        email: text
                                    })
                                }}
                            /><TextInput
                                style={styles.formTextInput}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        pass: text
                                    })
                                }}
                            /><TextInput
                                style={styles.formTextInput}
                                placeholder={"Confrim Password"}
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        confirmPassword: text
                                    })
                                }}
                            />
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() =>
                                        this.userSignUp(this.state.email, this.state.pass, this.state.confirmPassword)
                                    }
                                >
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => this.setState({ showmodal: false })}
                                >
                                    <Text style={{ color: '#ff5722' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render() {

        return (
            <View>
                <View>
                    {

                        this.showModal()

                    }

                </View>
                <View>

                    <TextInput
                        style={{
                            width: 280,
                            height: 35,
                            borderColor: 'black',
                            borderWidth: 2,
                            alignSelf: 'center',
                            marginTop: 280,
                            borderRadius: 15,
                            textAlign: 'center',
                        }}
                        placeholder={'Email'}
                        onChangeText={(text) => {
                            this.setState({
                                email: text
                            })
                        }}
                    />
                    <TextInput
                        style={{
                            width: 280,
                            height: 35,
                            borderColor: 'black',
                            borderWidth: 2,
                            alignSelf: 'center',
                            marginTop: 20,
                            borderRadius: 15,
                            textAlign: 'center',
                        }}
                        placeholder={'Password'}
                        onChangeText={(text) => {
                            this.setState({
                                pass: text
                            })
                        }}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            width: 80,
                            height: 30,
                            alignSelf: 'center',
                            marginTop: 30,
                            borderRadius: 15,
                        }}
                        onPress={() => {
                            this.checkuser(this.state.email, this.state.pass);
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                marginTop: 5,
                            }}>
                            Login
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            width: 80,
                            height: 30,
                            alignSelf: 'center',
                            marginTop: 30,
                            borderRadius: 15,
                        }}
                        onPress={() => {
                            this.setState({ showmodal: true })
                        }
                        }>
                        <Text
                            style={{
                                color: 'white',
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                marginTop: 5,
                            }}>
                            Register
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: '#ff3d00'
    },
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    KeyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: '#ff5722',
        margin: 50
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffff",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30
    },
    registerButtonText: {
        color: '#ff5722',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },

    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20
    }
})