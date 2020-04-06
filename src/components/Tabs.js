import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Routes from '../Routes';
import {
  setLoadingOpen,
  setModalLogin,
  setModalProfile,
  setCredential,
} from '../redux/actions/AuthActions';
import {setShowSearch} from '../redux/actions/SearchActions';
import {connect} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginModal from './auth/LoginModal';
import ProfileModal from './auth/ProfileModal';
import Search from './search/Search';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.setLoadingOpen(true);
    this.props.setCredential();
    setTimeout(() => {
      this._loading();
    }, 3000);
  };

  _loading = () => {
    this.props.setLoadingOpen(false);
  };

  render() {
    const {loadingOpen, modalLogin, modalProfile, userToken} = this.props.auth;
    const {showSearch} = this.props.search;

    if (loadingOpen === true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            height: heightScreen,
          }}>
          <ActivityIndicator size={50} color="#FF0B5B" style={{opacity: 0.7}} />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#FDFBFC" barStyle="dark-content" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FDFBFC',
            paddingHorizontal: widthScreen / 25,
            height: heightScreen / 12,
          }}>
          <View
            style={{
              flex: 0,
              alignItems: 'center',
              margin: 0,
              padding: 0,
            }}>
            {/* <TouchableOpacity onPress={() => this._goingHome()}> */}
            <Text
              style={{
                color: '#3A3435',
                fontFamily: 'Teko-Bold',
                fontSize: widthScreen / 14,
              }}>
              <FontAwesome5
                name="play"
                size={widthScreen / 16}
                color="#FF0B5B"
              />{' '}
              MilanTV
            </Text>
            {/* </TouchableOpacity> */}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => this.props.setShowSearch(true)}>
              <FontAwesome5
                name="search"
                size={widthScreen / 18}
                color="#3A3435"
              />
            </TouchableOpacity>
            {userToken !== null ? (
              <TouchableOpacity
                onPress={() => this.props.setModalProfile(true)}>
                <FontAwesome5
                  name="user-circle"
                  size={widthScreen / 14}
                  color="#FF0B5B"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.props.setModalLogin(true)}>
                <FontAwesome5
                  name="user-circle"
                  size={widthScreen / 14}
                  color="#3A3435"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Routes />
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalLogin}
          onRequestClose={() => this.props.setModalLogin(false)}>
          <LoginModal />
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalProfile}
          onRequestClose={() => this.props.setModalProfile(false)}>
          <ProfileModal />
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={showSearch}
          onRequestClose={() => this.props.setShowSearch(false)}>
          <Search />
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
  setLoadingOpen,
  setModalLogin,
  setModalProfile,
  setCredential,
  setShowSearch,
})(Tabs);
