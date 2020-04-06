import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  ImageBackground,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  setChooseCategory,
  getCategory,
} from '../../redux/actions/SearchActions';
import {connect} from 'react-redux';
import ModalCategory from '../search/ModalCategory';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFirst: 'Anime',
      categorySecond: 'Real',
    };
  }

  render() {
    const {showChooseCategory} = this.props.search;
    const {categoryFirst, categorySecond} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#EDEEEE'}}>
        <View style={{padding: heightScreen / 40}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              this.props.getCategory(categoryFirst, categoryFirst)
            }>
            <ImageBackground
              borderRadius={widthScreen / 50}
              source={require('../../image/anime.jpg')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: heightScreen / 4.5,
              }}>
              <View
                style={{
                  width: '100%',
                  height: heightScreen / 4.5,
                  backgroundColor: '#3A3435',
                  opacity: 0.7,
                  borderRadius: widthScreen / 50,
                }}
              />
              <Text
                style={{
                  opacity: 0.8,
                  position: 'absolute',
                  color: '#FDFBFC',
                  fontSize: widthScreen / 18,
                  fontFamily: 'Teko-Bold',
                  letterSpacing: 4,
                }}>
                ANIME
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              this.props.getCategory(categorySecond, categorySecond)
            }>
            <ImageBackground
              borderRadius={widthScreen / 50}
              source={require('../../image/real.jpg')}
              style={{
                marginVertical: heightScreen / 40,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: heightScreen / 4.5,
              }}>
              <View
                style={{
                  width: '100%',
                  height: heightScreen / 4.5,
                  backgroundColor: '#3A3435',
                  opacity: 0.7,
                  borderRadius: widthScreen / 50,
                }}
              />
              <Text
                style={{
                  opacity: 0.8,
                  position: 'absolute',
                  color: '#FDFBFC',
                  fontSize: widthScreen / 18,
                  fontFamily: 'Teko-Bold',
                  letterSpacing: 4,
                }}>
                REAL
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={showChooseCategory}
          onRequestClose={() => this.props.setChooseCategory(false)}>
          <ModalCategory />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search,
});

export default connect(mapStateToProps, {
  setChooseCategory,
  getCategory,
})(Category);
