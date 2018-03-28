import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import InspirationPhotosPage from './../pages/tabs/InspirationPhotosPage';
import ShopsListPage from './../pages/tabs/ShopsListPage';
import HomePage from './../pages/tabs/HomePage';

import EditPhotoPage from './../pages/EditPhotoPage';
import ShopPage from './../pages/ShopPage';
import ItemPage from './../pages/ItemPage';
import RegistrationPage from './../pages/RegistrationPage';
import ChooseLanguage from './../pages/ChooseLanguage';

export const Tabs = TabNavigator({
  Tab1: {screen: InspirationPhotosPage},
  Tab2: {screen: ShopsListPage},
  Tab3: {screen: HomePage}
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'grey',
    indicatorStyle: {
      backgroundColor: 'white'
    },
    style: {
      backgroundColor: '#090909'
    }
  },
});

const MainNavigation = StackNavigator({
  Tabs: {screen: Tabs, navigationOptions: {
    header: null
  }},
  EditPhotoPage: {screen: EditPhotoPage, navigationOptions: {
    headerTitle: 'Edit Photo',
    headerTintColor: 'white',
    headerStyle: {
      width: responsiveWidth(100),
      height: responsiveHeight(5),
      backgroundColor: 'black',
    },
    headerTitleStyle: {
      color: '#DCDCDC',
      fontSize: responsiveFontSize(3),
      fontWeight: 'normal'
    }
  }},
  ShopPage: {screen: ShopPage, navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      width: responsiveWidth(100),
      height: responsiveHeight(4),
      backgroundColor: 'black',
    },
    headerTitleStyle: {
      color: '#DCDCDC',
      fontSize: responsiveFontSize(3),
      fontWeight: 'normal'
    }
  }},
  ItemPage: {screen: ItemPage, navigationOptions: {
    headerTitle: 'smth',
    headerTintColor: 'white',
    headerStyle: {
      width: responsiveWidth(100),
      height: responsiveHeight(5),
      backgroundColor: 'black',
    },
    headerTitleStyle: {
      color: '#DCDCDC',
      fontSize: responsiveFontSize(3),
      fontWeight: 'normal'
    }
  }},
  RegistrationPage: {screen: RegistrationPage, navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      width: responsiveWidth(100),
      height: responsiveHeight(5),
      backgroundColor: 'black',
    },
  }},
  ChooseLanguage: {screen: ChooseLanguage, navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      width: responsiveWidth(100),
      height: responsiveHeight(5),
      backgroundColor: 'black',
    },
  }},
});



export default MainNavigation;
