import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const NetworkService = require('./../networking/Service');

export default class RegistrationPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  signIn() {
    NetworkService.makeAPIPostRequest('http://192.168.6.135:3003/api/users/signin/',
        {body: {username: this.state.username,
                password: this.state.password}
        }).then(data => {
                if (data.message) {
                  Alert.alert('' + data.message);
                  return;
                }
                console.log('data========= ', data);

                AsyncStorage.setItem("user_key", data.key).then((data) => {});
                AsyncStorage.setItem("user_id", data._id).then((data) => {});
                //this.props.navigation.navigate('Tab3')
                console.log('2rd fetchy');
                NetworkService.makeAPIGetRequest('http://192.168.6.135:3003/api/photos/userphotos/?user_key=' + data.key).then(photos => {
                  console.log('2rd fetchi mej mtaaaavvv,,,,', photos);
                  let photos_arr = JSON.stringify(photos);
                  console.log('photos-array...................', photos_arr);
                  AsyncStorage.setItem("localImages", photos_arr).then(data =>{});
                  this.props.navigation.navigate('Tab3');
                })




              }).catch(err => {
                console.log('err', err);
                return err;
              })
  }

  async signUp() {
    NetworkService.makeAPIPostRequest('http://192.168.6.135:3003/api/users',
        {body: {username: this.state.username,
                password: this.state.password}
        }).then(data => {
                if (data.message !== 'success') {
                  Alert.alert('' + data.message);
                  return;
                }
                console.log('data========= ', data);
                AsyncStorage.setItem("user", {key: data.key, id: data._id}).then((data) => {});
                this.props.navigation.navigate('Tab3')
                }).catch(err => {
                  console.log('error', err)
                  return err;
                });
  }

  render(){

    return(
      <Image style={styles.backgroundImageContainer} source={{uri: 'https://i.pinimg.com/564x/13/1d/92/131d92bb84cbe9dd520a0e14b13eeeae.jpg'}}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TextInput style={styles.input}
            placeholder='Username'
            onChangeText={(username) => this.setState({username})}
            />
          <TextInput style={styles.input}
            placeholder='Password'
            secureTextEntry
            onChangeText={(password) => this.setState({password})}/>

            <KeyboardAvoidingView style={styles.buttonContainer} behavior="padding">
              <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
                <Text style={styles.buttonText}> Sign Up </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => this.signIn()}>
                <Text style={styles.buttonText}> Sign In </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>

        </KeyboardAvoidingView>
      </Image>
    );
  }
}
const styles = StyleSheet.create({
  backgroundImageContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(100)
  },
  container: {
    justifyContent: 'center',
    marginTop: responsiveHeight(20)
  },
  input: {
    backgroundColor: 'rgba(225,225,225,0.9)',
    marginBottom: responsiveHeight(2),
    color: '#455A64',
    margin: responsiveWidth(5),
    borderRadius: 10
 },
   button: {
    backgroundColor: 'black',
    width: responsiveWidth(29),
    height: responsiveHeight(5),
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    margin: responsiveWidth(5),
    height: responsiveHeight(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    textAlign: 'center',
    color: '#B0BEC5',
   }
})
