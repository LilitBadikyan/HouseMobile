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
  Modal
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PhotoView from 'react-native-photo-view';

export default class CardItem extends Component {
  constructor(){
    super();
    this.state = {
      modalVisible: false,
      modalImage: 'https://cdn.elegantthemes.com/blog/wp-content/uploads/2014/12/LazyLoadingHeader.png',
    }
  }

  getPictures() {
   if(this.props !== null && this.props.img !== null) {
        return this.props.img;
      } else {
        return null;
      }
  }
  setModalVisible(visible, link) {
   this.setState({modalVisible: visible});
   this.setState({modalImage: link});
 }

  render() {
    let img = this.getPictures();
    return(
      <View>
       <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
          >
          <View style={{backgroundColor:'rgba(255,255,255,0.8)'}}>
           <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
              <PhotoView
              source={{uri: this.state.modalImage}}
              minimumZoomScale={1}
              maximumZoomScale={4}
              style={styles.modalImg} />
           </TouchableOpacity>
           </View>
        </Modal>
      </View>

      <FlatList
        numColumns={2}
        data={img}
        renderItem={({item}) => <TouchableOpacity onPress={() => this.setModalVisible(true, item.key)}>
            <Image style={styles.container} source={{uri: item.key}} />
          </TouchableOpacity>}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(48),
    height: responsiveHeight(48),
    paddingTop: responsiveHeight(13),
    margin: responsiveWidth(1)
  },
  modalImg: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    justifyContent: 'center',
    alignItems: 'center'
  }

})
