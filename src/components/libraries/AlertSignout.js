import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  setModalProfile,
  deleteCredential,
  setAlertSignout,
} from '../../redux/actions/AuthActions';
import {connect} from 'react-redux';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class AlertSignout extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FDFBFC'}}>
        <StatusBar backgroundColor="#FDFBFC" barStyle="dark-content" />
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <View
            style={{
              backgroundColor: '#FDFBFC',
              marginTop: heightScreen / 20,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: widthScreen / 1.5,
                  height: heightScreen / 3.5,
                  resizeMode: 'stretch',
                }}
                source={require('../../image/glints.png')}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: '#FDFBFC',
              height: heightScreen / 4,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: widthScreen / 20,
                marginBottom: heightScreen / 50,
              }}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#3A3435',
                  fontSize: widthScreen / 28,
                  fontFamily: 'Poppins-Bold',
                  paddingVertical: heightScreen / 50,
                  textDecorationLine: 'underline',
                }}>
                THE POWER OF TEAM D BATCH 5
              </Text>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#3A3435',
                  fontSize: widthScreen / 28,
                  fontFamily: 'Poppins-Bold',
                  paddingVertical: heightScreen / 50,
                }}>
                {`"CHOI, RICKY, BIANCA, ERNEST, FAID"`}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            borderColor: '#EDEEEE',
            borderWidth: 2,
          }}
        />
        <View style={{flex: 0, justifyContent: 'flex-end'}}>
          <View
            style={{
              backgroundColor: '#FDFBFC',
              height: heightScreen / 4,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: widthScreen / 20,
                marginBottom: heightScreen / 50,
              }}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#3A3435',
                  fontSize: widthScreen / 28,
                  fontFamily: 'Poppins-Regular',
                  paddingVertical: heightScreen / 50,
                }}>
                Are you sure want to sign out?
              </Text>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingHorizontal: widthScreen / 20,
              }}>
              <TouchableOpacity
                style={{
                  width: widthScreen / 3,
                  backgroundColor: '#AAAEB4',
                  padding: heightScreen / 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => this.props.setAlertSignout(false)}>
                <Text
                  style={{
                    letterSpacing: 1,
                    color: '#FDFBFC',
                    fontFamily: 'Poppins-Bold',
                    fontSize: widthScreen / 30,
                  }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: widthScreen / 3,
                  backgroundColor: '#FF0B5B',
                  padding: heightScreen / 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => this.props.deleteCredential()}>
                <Text
                  style={{
                    letterSpacing: 1,
                    color: '#FDFBFC',
                    fontFamily: 'Poppins-Bold',
                    fontSize: widthScreen / 30,
                  }}>
                  SIGN OUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  setModalProfile,
  deleteCredential,
  setAlertSignout,
})(AlertSignout);
