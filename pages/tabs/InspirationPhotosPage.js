import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { FloatingAction } from 'react-native-floating-action';

import CardItem from './../../cardItem/CardItem';


export default class InspirationPhotosPage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Instiration'
  }

  menuItemChoose(name) {
    switch(name) {
      case 'bt_language':
        this.props.navigation.navigate('ChooseLanguage');
        break;
    }
  }

  render() {
    const actions = [{
    text: 'Language',
    icon: require('./../../images/ImageLanguageButton.png'),
    name: 'bt_language',
    color: 'black',
    position: 1
  }, {
    text: 'Help',
    icon: require('./../../images/ImageHelpButton.png'),
    name: 'bt_help',
    color: 'black',
    position: 2
  }, {
    text: 'Feedback',
    icon: require('./../../images/ImageFeedbackButton.png'),
    name: 'bt_feedback',
    color: 'black',
    position: 3
  }, {
    text: 'About Us',
    icon: require('./../../images/ImageAboutUsButton.png'),
    name: 'bt_about',
    color: 'black',
    position: 4
  }];
    let arr = [
      {key: 'http://www.magnet.co.uk/imagevault/publishedmedia/ertp9j3p9dbb4q2xw9p6/Fusion_Champagne.jpg'},
      {key: 'http://static.capriyo.com/CPM0004866_pdp-1449574558_tazetta-l-shaped-modular-kitchen.jpg'},
      {key: 'http://cdni.condenast.co.uk/639x426/a_c/CNSTMMGLPICT000002518628-house-11jan17-Alexander-James_b_639x426.jpg'},
      {key: 'https://1rul3edyje33mh89fawaqtao-wpengine.netdna-ssl.com/wp-content/uploads/2014/06/2020Design_V10_Kitchen_Wood_Cabinets_Granite_Counter_2020brand_1200w.jpg'},
      {key: 'https://hips.hearstapps.com/hbu.h-cdn.co/assets/cm/15/04/54c0d87a70ace_-_08-hbx-bathroom-with-long-sink-xl.jpg'},
      {key: 'http://facesous.com/wp-content/uploads/2017/06/splendid-ideas-bathroom-design-also-bathroom-design.jpg'}
    ];
    return(
      <View style ={{flex:1}}>
        <ScrollView>
            <CardItem img={arr} />
        </ScrollView>
          <FloatingAction
            buttonColor='black'
            actions={actions}
            onPressItem={
             (name) => {this.menuItemChoose(name)}
            }
          />
      </View>
    );
  }
}
