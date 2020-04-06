import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FloatingTextInput from '../../components/libraries/FloatingTextInput';

import {
  setModalLogin,
  setModalRegister,
  setLoginLoading,
  setModalProfile,
  loginUser,
} from '../../redux/actions/AuthActions';
import {connect} from 'react-redux';
import RegisterModal from './RegisterModal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {hidePassword: true, usernameOrEmail: '', password: ''};
  }

  _setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  render() {
    const {modalRegister, loginLoading} = this.props.auth;
    if (loginLoading === true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            height: heightScreen,
            backgroundColor: '#FDFBFC',
          }}>
          <ActivityIndicator size={50} color="#FF0B5B" style={{opacity: 0.7}} />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FDFBFC',
          height: heightScreen,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#FDFBFC',
        }}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              position: 'absolute',
              top: 15,
              left: 15,
            }}>
            <TouchableOpacity onPress={() => this.props.setModalLogin(false)}>
              <MaterialIcons
                name="arrow-back"
                size={widthScreen / 12}
                color="#3A3435"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0,
              alignItems: 'center',
              marginTop: heightScreen / 15,
              marginBottom: heightScreen / 50,
            }}>
            <FontAwesome5 size={widthScreen / 5} name="play" color="#FF0B5B" />
            <Text
              style={{
                color: '#3A3435',
                fontSize: widthScreen / 10,
                fontFamily: 'Teko-Bold',
                letterSpacing: 2,
                marginTop: 10,
              }}>
              MilanTV
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: widthScreen / 15,
            }}>
            <FloatingTextInput
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
              onBlur={this.onBlur}
              selectionColor="#FF0B5B"
              autoCapitalize="none"
              onChangeText={value => this.setState({usernameOrEmail: value})}>
              Email or username
            </FloatingTextInput>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: widthScreen / 15,
              paddingTop: widthScreen / 50,
              paddingBottom: widthScreen / 14,
            }}>
            <FloatingTextInput
              secureTextEntry={this.state.hidePassword}
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
              onBlur={this.onBlur}
              selectionColor="#FF0B5B"
              autoCapitalize="none"
              onChangeText={value => this.setState({password: value})}>
              Password
            </FloatingTextInput>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                position: 'absolute',
                bottom: 45,
                right: widthScreen / 10,
              }}
              onPress={this._setPasswordVisibility}>
              <MaterialCommunityIcons
                name={this.state.hidePassword === false ? 'eye' : 'eye-off'}
                size={20}
                color="#3A3435"
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignSelf: 'center'}}>
            <TouchableOpacity
              disabled={
                this.state.usernameOrEmail !== '' && this.state.password !== ''
                  ? null
                  : true
              }
              style={{
                backgroundColor:
                  this.state.usernameOrEmail !== '' &&
                  this.state.password !== ''
                    ? '#FF0B5B'
                    : '#EDEEEE',
                paddingHorizontal: 18,
                paddingTop: 8,
                paddingBottom: 6,
                borderRadius: 100,
              }}
              onPress={() =>
                this.props.loginUser(
                  this.state.usernameOrEmail,
                  this.state.password,
                )
              }>
              <Text
                style={{
                  color:
                    this.state.usernameOrEmail !== '' &&
                    this.state.password !== ''
                      ? '#EDEEEE'
                      : '#3A3435',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 18,
                  letterSpacing: 1,
                }}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: '#3A3435',
                fontSize: widthScreen / 28,
                fontFamily: 'Poppins-Light',
              }}>
              Don't have an account?
            </Text>
            <Text
              style={{
                color: '#FF0B5B',
                fontSize: widthScreen / 28,
                fontFamily: 'Poppins-Light',
              }}
              onPress={() => this.props.setModalRegister(true)}>
              {' '}
              Sign up!
            </Text>
          </View>
        </ScrollView>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalRegister}
          onRequestClose={() => this.props.setModalRegister(false)}>
          <RegisterModal />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setModalLogin,
  setModalRegister,
  setLoginLoading,
  setModalProfile,
  loginUser,
})(LoginModal);

const styles = StyleSheet.create({});
