import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  Alert
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-picker';
import { StackNavigator } from 'react-navigation';
const NetworkService = require('./../../networking/Service');

export default class HomePage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home'
  }

  constructor() {
    super();
    this.source;
    this.arr = [];
    this.state = {
      arrayOfImages: [],
      modalVisible: false,
      user_key: null,
      user_id: null,
    }
  }

  async componentDidMount() {
    AsyncStorage.getItem("localImages").then((value) => {this.setState({"localImages": value});}).done();
    let a = await this.getData();
    this.setState({arrayOfImages: a});
    let api = await this.getAPI();
    let id = await this.getID();
    console.log('componentDidMount-um api', api);
    console.log('componentDidMount-um id', id);
    console.log('componentDidMount-um localImages', this.state.arrayOfImages);
    this.setState({user_key: api});
    this.setState({user_id: id});
  }

 async saveData(tmp) {
    let arr = JSON.stringify(tmp);
    try {
      await AsyncStorage.setItem("localImages", arr);
    } catch (error){
      console.log('lav chi lav chi')
    }
  }

 async getData() {
    let temp = await AsyncStorage.getItem("localImages");
    let result = JSON.parse(temp);
    return result;
 }

 async getAPI() {
   let userAPI = await AsyncStorage.getItem("user_key");
   console.log('getAPI-----', userAPI);
   return userAPI;
 }

 async getID() {
   let user_id = await AsyncStorage.getItem("user_id");
   console.log('getID-----', user_id);
   return user_id;
 }

  showHeader() {
    console.log('SHOW HEADER----> ', this.state.arrayOfImages.length);
    if(this.state.arrayOfImages.length !== 0) {
      return(
        <View style={{margin: responsiveHeight(5)}}>
          <Text style={styles.text}> Welcome Home </Text>
        </View>
      );
    } else {
      return null;
    }
  }

 registration() {
    console.log('registrationum this.state.user_key', this.state.user_key)
    if(this.state.user_key) {
      return(
        <TouchableOpacity onPress = {() => this.signOut()}>
          <Text style={styles.registrationBtn}> SIGN OUT </Text>
        </TouchableOpacity>
      );
    } else {
      return(
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('RegistrationPage')}>
           <Text style={styles.registrationBtn}> SIGN UP </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress = {() => this.props.navigation.navigate('RegistrationPage')}>
           <Text style={styles.registrationBtn}> SIGN IN </Text>
         </TouchableOpacity>
        </View>
      );
    }
  }

  async signOut() {
    console.log('signout clicked', this.state.user_key);
    await AsyncStorage.removeItem("user_key").then(value => {
      console.log('signOut value', value);
      this.setState({user_key: value})
    })
    await AsyncStorage.removeItem("localImages").then(value => {
      console.log('signoutval', value);
      this.setState({arrayOfImages: []})
    })
    await AsyncStorage.removeItem("user_id").then(value => {
      this.setState({user_id: value})
    })
    console.log('===============', this.state.localImages);
    console.log('==========', this.state.user_id);
  }

  selectPhotoTapped() {
    console.log('select photo tapped this.state.user_key ====', this.state.user_key);
      if(this.state.user_key) {
        ImagePicker.showImagePicker((response) => {
          if(response.didCancel) {
            console.log('user cancelled photo picker');
          }
          else if(response.error) {
            console.log('ImagePicker error: ', response.error);
          }
          else if(response.customButton) {
            console.log('user tapped custom button: ', response.cutomButton);
          }
          else {
            let photo = response.data;
            const data = new FormData();
            data.append('name', 'photo');
            data.append('photo', {
              uri: response.uri,
              type: response.type,
              name: 'photo'
            });

            fetch('http://192.168.6.135:3003/api/photos/' + this.state.user_id, {
              method: 'POST',
              body: data
            }).then(response => {
              console.log('image uploaded', response);
              NetworkService.makeAPIGetRequest('http://192.168.6.135:3003/api/photos/').then(photos => {
                console.log('2rd fetchi datan===', photos);
                let arr = photos.map(item => {
                  return {
                    image_url: item.image_url
                  }
                })
                console.log('arrrrrrrrrrrrrrrraaaaaay', arr);
                this.setState({arrayOfImages: arr});
                this.saveData(arr);
              })
            }).catch(err => {
              console.log('lav ban chexav', err)
            })
          }
        });
      } else {
        this.props.navigation.navigate('RegistrationPage');
      }
  }

  deleteImage(id) {
    NetworkService.makeAPIDeleteRequest('http://192.168.6.135:3003/api/photos/' + id).then(data => {
      console.log('delete image dataaaaaaaaaa======== ', data);
      NetworkService.makeAPIGetRequest('http://192.168.6.135:3003/api/photos/').then(data => {
        this.saveData(data).then(data => {})
        this.setState({arrayOfImages: data})
      })
      Alert.alert("Photo has been deleted");
    }).catch(err => {
      console.log('errooooorrrrr', err);
    })
  }

   renderImage() {
    const { params } = this.props.navigation.state;
    let arr = this.state.arrayOfImages;
    if (arr) {
      console.log('ARR ARR ARR=====', arr);
      let result = [];
      for (let ix = 0; ix < arr.length; ++ix) {
        console.log('arr[ix]._image_url.............', arr[ix].image_url);
        let item = <TouchableOpacity key={ix} onLongPress={() => this.deleteImage(arr[ix]._id)} onPress={() => this.props.navigation.navigate('EditPhotoPage', {source: arr[ix], parameters: params})}>
                      <Image style={styles.container} key={arr[ix]._id} source={{uri: arr[ix].image_url}}/>
                    </TouchableOpacity>
        result.push(item);
      }
      return result;
    }
    return null;
  }
  render() {
    let arr = this.renderImage();
    const {state} = this.props.navigation;
    return(
       <Image style={{flex: 1}} source={{uri: 'https://i.pinimg.com/564x/ab/17/ae/ab17ae88571e71cc98b9c24e93969aa6.jpg'}}>


        {this.registration()}

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={this.selectPhotoTapped.bind(this)}>
            <Text style={styles.buttonText}> Upload Image </Text>
          </TouchableOpacity>
        </View>

        {this.showHeader()}

        <View style={{borderColor: 'black'}}>
          <ScrollView horizontal={true}>
            {arr}
          </ScrollView>
        </View>
      </Image>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(50),
    height: responsiveHeight(40),
    margin: responsiveWidth(1),
    flexWrap: 'wrap',
    backgroundColor: 'blue'
  },
  buttonView: {
    alignItems: 'center',
    margin: responsiveHeight(10)
  },
  button: {
    backgroundColor: 'black',
    width: responsiveWidth(40),
    height: responsiveHeight(9),
    justifyContent: 'center',
    borderRadius: 9,
  },
  buttonText: {
    textAlign: 'center',
    color: '#B0BEC5',
  },
  text: {
    fontWeight: 'normal',
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center',
    color: 'black'
  },
  registrationBtn: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    textDecorationLine: 'underline',
    justifyContent: 'flex-end'
  }
})
