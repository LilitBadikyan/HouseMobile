/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import MainNavigation from './config/router';
import RegistrationPage from './pages/RegistrationPage';
import InspirationPhotosPage from './pages/tabs/InspirationPhotosPage';
import ShopsListPage from './pages/tabs/ShopsListPage';

class HouseProject extends Component {
  render() {
    return <MainNavigation />;
    }
  }

AppRegistry.registerComponent('HouseProject', () => HouseProject);
