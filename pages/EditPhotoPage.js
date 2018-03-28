import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import ImageResizer from 'react-native-image-resizer';
import EditButtons from './../cardItem/EditButtons';


export default class EditPhotoPage extends Component {

  constructor() {
    super();
    this.interval;
    this.is_finished = false;
    this.array_of_coordinates = [];
    this.click = 0;
    this.state = {
      modalVisible: false,
      distance: 0,
      item_height: 40,
      item_width: 30,
      movableImage: 'http://pngimg.com/uploads/chair/chair_PNG6908.png',
  }
}

  componentWillMount() {
    console.log('kanchvec componentWillMount');
    this.animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0};

    this.animatedValue.addListener((value) => this._value = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        })
        this.animatedValue.setValue({x: 0, y: 0})
      },
      onPanResponderMove: (e, gestureState) => {
        console.log('MOVE IT MOVE IT_______>', gestureState.y0, gestureState.moveX, gestureState.moveY);
        if(gestureState.moveX < 50 || gestureState.moveX > 300 || gestureState.moveY < 70 || gestureState.moveY > 550) {
           console.log('GESTURESTATE');
           return false;
         }
        Animated.event([
          null, { dx: this.animatedValue.x, dy: this.animatedValue.y},
        ])(e, gestureState);
      },
      onPanResponderRelease: () => {
            this.animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning
          }
    })
    /*let temp = this.getParameters();
    console.log('componentWillMount-um --->', temp.movableImage);
    this.setState({movableImage: temp.movableImage})*/
  }

  getParameters() {
    let result = null;
    if(this.props.navigation.state.params.parameters) {
      result = {  width: this.props.navigation.state.params.parameters.width,
                  height: this.props.navigation.state.params.parameters.height,
                  movableImage: this.props.navigation.state.params.parameters.uri }
      return result;
  } else {
    result = {  width: 0,
                height: 0,
                movableImage: null}
      return result;
    }
  }

  zoomIn() {
    let newHeight = this.state.item_height + 1;
    let newWidth = this.state.item_width + 1;
    this.setState({item_height: newHeight, item_width: newWidth});
  }

  zoomInLong() {
    this.is_finished = true;
    this.interval = setInterval(() => {
    if (this.is_finished == true) {
      let newHeight = this.state.item_height + 1;
      let newWidth = this.state.item_width + 1;
      this.setState({item_height: newHeight, item_width: newWidth});
      }
    }, 200);
  }
  zoomInEnd() {
    this.is_finished = false;
    clearInterval(this.interval);
  }

  zoomOut() {
      let newHeight = this.state.item_height - 1;
      let newWidth = this.state.item_width - 1;
      this.setState({item_height: newHeight, item_width: newWidth});
  }

  zoomOutLong() {
    this.is_finished = true;
    this.interval = setInterval(() => {
    if (this.is_finished == true) {
      let newHeight = this.state.item_height - 1;
      let newWidth = this.state.item_width - 1;
      this.setState({item_height: newHeight, item_width: newWidth});
      }
    }, 200);
  }

  zoomOutEnd() {
    this.is_finished = false;
    clearInterval(this.interval);
  }

  setModalVisible(visible) {
  /* if (this.state.distance == 0) {
     Alert.alert('Please, enter right parameters');
     return;
   }
   if (Number(this.state.distance) == NaN) {
     Alert.alert('Please, enter numbers');
     return;
   }*/
   this.setState({modalVisible: visible});
 }

 calculateHeight() {
   this.setModalVisible(true);
   console.log('calculateHeight distance', this.state.distance);
   let object_height_pixel = 0;
   let image_height_pixel = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height);
   let focal_lenght_mm = 4.8;
   let sensor_height_mm = 5.80;
   let real_height_mm = 800;

   object_height_pixel = (focal_lenght_mm * real_height_mm * image_height_pixel) / (this.state.distance * sensor_height_mm);
   console.log('object_height_pixel====', object_height_pixel);
   //this.setState({item_height: object_height_pixel/4});
   //TODO: convert pixels to dp
 }


  render() {

    let temp = this.getParameters();

    let width = temp.width;
    let height = temp.height;
    console.log('renderum movableIMG------>', this.state.movableImage);
    console.log('dimensions', PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width), PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height), Dimensions.get('window').height);
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform(),
      height: responsiveHeight(this.state.height),
      width: responsiveWidth(this.state.width),
    }
    const { params } = this.props.navigation.state;

    return (
      <View style={{flex: 1}}>
          <Image style={styles.container} source={{uri: 'http://housedecorates.com/wp-content/uploads/2016/01/beautiful-living-room-design-beautiful-living-room-interior-design-with-carpet.jpg'}}>
              <Animated.View style={animatedStyle} {... this.panResponder.panHandlers}>
                  <Image style={{resizeMode: 'contain', height: responsiveHeight(this.state.item_height), width: responsiveWidth(this.state.item_width)}} source={{uri: this.state.movableImage}}/>
              </Animated.View>

          </Image>

          <View style={styles.buttonContainer}>
                <EditButtons logo={require('./../images/ImageShopButton.png')} onPress={() => this.props.navigation.navigate('Tab2')}/>
                <EditButtons logo={require('./../images/ImageSaveButton.png')}/>
                <EditButtons logo={require('./../images/ImageCalculateButton.png')} onPress={() => {this.calculateHeight()}} />
                <EditButtons logo={require('./../images/ImageZoomInButton.png')} onPress={() => {this.zoomIn()}} onPressIn={() => {this.zoomInLong()}} onPressOut={() => {this.zoomInEnd()}}/>
                <EditButtons logo={require('./../images/ImageZoomOutButton.png')} onPress={() => {this.zoomOut()}} onPressIn={() => {this.zoomOutLong()}} onPressOut={() => {this.zoomOutEnd()}}/>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(false)}}
            >
              <View style={styles.modal}>
                <TextInput style={{height: responsiveHeight(15), width: responsiveWidth(50)}}
                  placeholder='DISTANCE MM:'
                  onChangeText={(distance) => this.setState({distance})}/>

                 <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                  <Text> OK </Text>
                 </TouchableOpacity>
              </View>
          </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: responsiveHeight(95),
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -5,
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(225,225,225,0.5)'
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(225,225,225,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    width: responsiveWidth(80),
    height: responsiveHeight(30),
    backgroundColor: '#F4F6F7',
    justifyContent: 'space-between'
  },
  textInput: {
    height: responsiveHeight(6),
    width: responsiveWidth(30),
  },
  textHeader: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    textAlign: 'center'
  },
  button: {
   width: responsiveWidth(20),
   height: responsiveHeight(5),
   justifyContent: 'center',
 },
})
