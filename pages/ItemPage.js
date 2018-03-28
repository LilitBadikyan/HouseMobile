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
  FlatList
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PhotoView from 'react-native-photo-view';
import Swiper from 'react-native-swiper';

export default class ItemPage extends Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: 'black'},
    headerTintColor: 'white'
}
  render() {

    const { params } = this.props.navigation.state;
    let img = params.uri;
    console.log('esi itempagei imgna, piti poxancvi tab3in ---', img);
    return(
      <View style={styles.container}>
        <Swiper>
          <Image style={styles.imageContainer} source={{uri: img}}/>
          <Image style={styles.imageContainer} source={{uri: img}}/>
          <Image style={styles.imageContainer} source={{uri: img}}/>
        </Swiper>

        <View style={{flexDirection: 'column',
        justifyContent: 'space-between',}}>
          <Text style={styles.text}> More Info </Text>
          <Text>  Size assembled: Width: 149 cm, Length: 205 cm, Height: 50 cm
                  Size unassembled: Width: 62 cm, Length: 203 cm, Height: 15 cm
                  Material: Particle board/deco veneer
                  Colour: Alder
                  Assembly status: Self assembly
                  Nice to know: Excl. mattresses, Fits box, spring and foam mattresses
                  Weight: 69 kg
                  Number of parcels: 2
                  Further information: Incl. base
                  Quality rating: PLUS </Text>
          <Text style={[styles.text, {alignSelf: 'flex-end'}]}> {params.price} </Text>
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Tab3", {uri: img})}>
          <View style={styles.buttonView}>
            <Text style={{color: 'grey', fontSize: responsiveFontSize(3)}}> Try in my room </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(45),
  },
  text: {
    fontSize: responsiveFontSize(3),
    color: 'black'
  },
  buttonView: {
    width: responsiveWidth(100),
    height: responsiveHeight(9),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
