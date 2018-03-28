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

export default class ShopsListPage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Shops'
  }
  render() {
    let shops = [
      {key: 'http://www.flexap.am/wp-content/uploads/2015/04/Klaik-logo.jpg', name: 'klaik'},
      {key: 'http://idfabriek.com/wp-content/uploads/2017/08/furniture-design-companies-fair-ideas-decor-furniture-design-companies-photo-on-great-home-decor-inspiration-about-elegant-interior-furniture-photos.jpg', name: 'Decor'},
      {key: 'http://find.am/uploads/files/products/product_9580906_ideal_logo.jpg', name: 'Ideal System'},
      {key: 'https://www.kth.se/blogs/rfranco/files/2014/01/ikea-logo-vector.png', name: 'IKEA'},
    ]
    return(
      <ScrollView>

      <FlatList
        data={shops}
        renderItem={({item}) => <TouchableOpacity onPress={() => this.props.navigation.navigate('ShopPage', {shopName: item.name })}>
            <Image style={styles.container} source={{uri: item.key}} />
          </TouchableOpacity>}
      />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
    margin: responsiveWidth(1),
    resizeMode: 'cover'
  },
})
