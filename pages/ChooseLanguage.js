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
  CheckBox
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class ChooseLanguage extends Component {
  
  render() {
    return(
      <View style={styles.container}>

        <TouchableOpacity style={styles.buttonContainer} >
          <Text style={styles.text}> English </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} >
          <Text style={styles.text}> Русский </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} >
          <Text style={styles.text}> Հայերեն </Text>
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
  buttonContainer: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    justifyContent: 'center',
  },
  text: {
    fontSize: responsiveFontSize(3),
  }
})
