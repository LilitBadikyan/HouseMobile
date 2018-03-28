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

import DrawerLayout from 'react-native-drawer-layout';
const NetworkService = require('./../networking/Service');

export default class ShopPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.shopName}`,
  });

  constructor() {
    super();
    this.state = {
      img: [],
    }
  }

  componentDidMount() {
    let shop_name = this.props.navigation.state.params.shopName;
    console.log('shopName------ ', shop_name);
    NetworkService.makeAPIPostRequest('http://d482f8cd.ngrok.io/api/items/shop', {body: {shop_name: shop_name}}).then(data => {
      console.log('DATA....', data);
      let img = data.map(item => {
        return {
          uri: item.image_url,
          key: item._id,
        }
      });
      console.log('IMG', img);
      this.setState({img: img})
    }).catch(err => {
      console.log('errrrooorrr', err);
    })
  }

  render() {
    arr = [
      {key: 'Kitchen'},
      {key: 'Bathroom'},
      {key: 'Dining room'},
      {key: 'Living room'},
      {key: 'Office'},
      {key: 'Kids furniture'},
    ];

    let navigationView = (
      <ScrollView>
        <View style={styles.categoryContainer}>
          <FlatList
          data={arr}
          renderItem={({item}) =>
          <TouchableOpacity>
            <Text style={styles.textStyle}>{item.key}</Text>
          </TouchableOpacity>}
          />
        </View>
      </ScrollView>
);
    return(
      <DrawerLayout
        ref={'drawer'}
        drawerWidth={responsiveWidth(50)}
        drawerPosition={DrawerLayout.positions.Right}
        renderNavigationView={() => navigationView}>

        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}> Choose Category </Text>
              <TouchableOpacity onPress={() => this.refs['drawer'].openDrawer()}>
                <Image style={styles.headerImage} source={{uri: 'http://mic2017.upf.edu/wp-content/themes/giornalismo/images/mobile-nav-icon.png'}}/>
              </TouchableOpacity>
          </View>

          <FlatList
            numColumns={2}
            data={this.state.img}
            renderItem={({item}) => <TouchableOpacity onPress={() => this.props.navigation.navigate('ItemPage', {uri: item.uri})}>
                        <View style={styles.container}>
                          <Image style={styles.image} source={{uri: item.uri}}/>
                          <Text style={styles.text}> 5000 </Text>
                        </View>
                      </TouchableOpacity>}
          />

        </View>
      </DrawerLayout>
    );
  }
}



const styles = StyleSheet.create({
  categoryContainer: {
    width: responsiveWidth(50),
    height: responsiveHeight(100),
    backgroundColor: 'black',
    alignItems: 'flex-end'
  },
  container: {
    width: responsiveWidth(48),
    height: responsiveHeight(40),
    margin: responsiveWidth(1),
  },
  textStyle: {
    fontSize: responsiveFontSize(3),
    color: 'grey',
    marginBottom: responsiveHeight(3),
  },
  headerContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(8),
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: responsiveFontSize(3),
    color: 'white'
  },
  headerImage: {
    resizeMode: 'stretch',
    height: responsiveHeight(5),
    width: responsiveWidth(10)
  },
  image: {
    width: responsiveWidth(49),
    height: responsiveHeight(35),
  },
  text: {
    fontSize: responsiveFontSize(3),
    color: 'black'
  }
})
