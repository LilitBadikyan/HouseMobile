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
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class EditButtons extends Component {
  render() {
    return(
      <TouchableWithoutFeedback style={styles.container} onPressIn={this.props.onPressIn} onPressOut={this.props.onPressOut} onPress={this.props.onPress}>
        <Image style={styles.button} source={this.props.logo} />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100) / 5,
    height: responsiveHeight(10),
    alignItems: 'center'
  },
  button: {
    width: responsiveWidth(100) / 5,
    height: responsiveHeight(8),
    resizeMode: 'contain'
  }
})
