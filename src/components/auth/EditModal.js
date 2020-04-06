import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setEditModal, editProfile} from '../../redux/actions/ProfileActions';
import {connect} from 'react-redux';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: 'reactnativebatch5',
      editFullname: '',
      editUsername: '',
      editPassword: '',
    };
  }

  _onFocusEditPassword = () => {
    this.setState({dummy: ''});
  };

  _onBlurEditPassword = () => {
    if (this.state.editPassword === '') {
      this.setState({dummy: 'reactnativebatch5'});
    }
  };

  render() {
    const {user} = this.props.profile;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FDFBFC',
        }}>
        <View
          style={{
            elevation: 3,
            height: heightScreen / 12,
            backgroundColor: '#FDFBFC',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: widthScreen / 20,
          }}>
          <View style={{flex: 0}}>
            <TouchableOpacity onPress={() => this.props.setEditModal(false)}>
              <MaterialIcons
                name="arrow-back"
                size={widthScreen / 12}
                color="#3A3435"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{
                letterSpacing: 1,
                color: '#3A3435',
                fontFamily: 'Poppins-Bold',
                fontSize: widthScreen / 24,
                marginLeft: widthScreen / 20,
              }}>
              Edit Your Data
            </Text>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 0,
              paddingHorizontal: widthScreen / 20,
              marginBottom: widthScreen / 20,
            }}>
            <Text
              style={{
                letterSpacing: 1,
                color: '#3A3435',
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
                paddingVertical: heightScreen / 50,
              }}>
              Fullname :
            </Text>
            <TextInput
              style={{
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 14,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              selectionColor="#3A3435"
              autoCapitalize="words"
              defaultValue={user.fullname}
              onChangeText={value => this.setState({editFullname: value})}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          <View
            style={{
              flex: 0,
              paddingHorizontal: widthScreen / 20,
              paddingBottom: widthScreen / 20,
            }}>
            <Text
              style={{
                letterSpacing: 1,
                color: '#3A3435',
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
                paddingVertical: heightScreen / 50,
              }}>
              Username :
            </Text>
            <TextInput
              style={{
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 14,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              selectionColor="#3A3435"
              autoCapitalize="none"
              defaultValue={user.username}
              onChangeText={value => this.setState({editUsername: value})}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          <View
            style={{
              flex: 0,
              paddingHorizontal: widthScreen / 20,
              paddingBottom: widthScreen / 20,
            }}>
            <Text
              style={{
                letterSpacing: 1,
                color: '#3A3435',
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
                paddingVertical: heightScreen / 50,
              }}>
              Password :
            </Text>
            <TextInput
              style={{
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 14,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              selectionColor="#3A3435"
              autoCapitalize="none"
              secureTextEntry
              onFocus={this._onFocusEditPassword}
              onBlur={this._onBlurEditPassword}
              defaultValue={this.state.dummy}
              onChangeText={value => this.setState({editPassword: value})}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          <View
            style={{
              flex: 0,
              paddingHorizontal: widthScreen / 20,
              marginTop: heightScreen / 40,
              marginBottom: heightScreen / 40,
            }}>
            <TouchableOpacity
              disabled={
                this.state.editFullname !== '' ||
                this.state.editUsername !== '' ||
                this.state.editPassword !== ''
                  ? null
                  : true
              }
              style={{
                width: widthScreen / 1.1,
                backgroundColor:
                  this.state.editFullname !== '' ||
                  this.state.editUsername !== '' ||
                  this.state.editPassword !== ''
                    ? '#FF0B5B'
                    : '#AAAEB4',
                padding: heightScreen / 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() =>
                this.props.editProfile(
                  this.state.editFullname === ''
                    ? user.fullname
                    : this.state.editFullname,
                  this.state.editUsername === ''
                    ? user.username
                    : this.state.editUsername,
                  this.state.editPassword === ''
                    ? null
                    : this.state.editPassword,
                  this.props.auth.userToken,
                )
              }>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#FDFBFC',
                  fontFamily: 'Poppins-Bold',
                  fontSize: widthScreen / 30,
                }}>
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  editProfile,
  setEditModal,
})(EditModal);
