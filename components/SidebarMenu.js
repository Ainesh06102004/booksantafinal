import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import { DrawerItems } from 'react-navigation-drawer'
import { Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';


export default class Sidebarmenu extends React.Component {
    constructor() {
        super();
        this.state = {
            image: '#',
            currentuser: firebase.auth().currentUser.email,
        }
    }

    fetchimage = ()=>{
        var ref = firebase.storage().ref().child("profiles/" + this.state.currentuser)
        ref.getDownloadURL().then((url)=>{
            this.setState({
                image: url
            })
        })
    }
    componentDidMount(){
        this.fetchimage();
    }

    uploadImage = async (uri) => {
        var response = await fetch(uri);
        var blob = await response.blob();
        var ref = firebase.storage().ref().child("profiles/" + this.state.currentuser )
        return (ref.put(blob).then(() => {
            
            this.fetchimage();
        }))
    }

    pickImage = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!cancelled) {
            this.uploadImage(uri);
        }
    }
    render() {
        return (<View style={{ flex: 1 }}>
            <SafeAreaView>
                <View
                    style={{

                        alignItems: "center",
                       
                        height: 60,
                        width: 60,
                        marginTop: 40,
                        marginLeft: 15,
                        marginBottom: 20
                        
                    }}
                >
                    <Avatar rounded size="large" showEditButton onPress={() => {
                        this.pickImage();
                    }} 
                    source = {{uri: this.state.image}} 
                    />
                </View>

                <View style={{ marginTop: 20 }}><DrawerItems {...this.props} /></View>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom: 30,
                    marginTop: 470
                }}><TouchableOpacity style={{
                    height: 50,
                    width: "100%",
                    justifyContent: "center",
                    padding: 10,
                    alignSelf: 'center',
                    backgroundColor: 'black'
                }}
                    onPress={() => {
                        this.props.navigation.navigate("Loginscreen");
                        firebase.auth().signOut();
                    }}><Text style={{ alignSelf: 'center', color: 'white' }}>Log Out</Text></TouchableOpacity></View >
                    
            </SafeAreaView>
        </View>);
    }

}