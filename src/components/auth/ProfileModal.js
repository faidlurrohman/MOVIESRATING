import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {
  setModalProfile,
  setAlertSignout,
} from '../../redux/actions/AuthActions';
import {
  getUser,
  uploadImage,
  setEditModal,
} from '../../redux/actions/ProfileActions';
import {setAddMovie} from '../../redux/actions/MovieActions';
import {
  setShowUserReview,
  getAllUserReview,
} from '../../redux/actions/ReviewActions';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import EditModal from './EditModal';
import AddMovie from '../movies/AddMovie';
import AlertSignout from '../libraries/AlertSignout';
import UserReview from '../review/UserReview';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class ProfileModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    await this.props.getUser(this.props.auth.userToken);
  };

  _imagePicker = token => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('Cancelled');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else {
        this.props.uploadImage(token, response);
      }
    });
  };

  render() {
    const {userToken, alertSignout} = this.props.auth;
    const {showUserReview} = this.props.review;
    const {addMovie} = this.props.movie;
    const {user, userLoading, imageLoading, editModal} = this.props.profile;
    if (userLoading === true) {
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
      <View style={{flex: 1, backgroundColor: '#FDFBFC'}}>
        <View
          style={{
            height: heightScreen / 12,
            backgroundColor: '#FDFBFC',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: widthScreen / 20,
          }}>
          <View style={{flex: 0}}>
            <TouchableOpacity onPress={() => this.props.setModalProfile(false)}>
              <MaterialIcons
                name="arrow-back"
                size={widthScreen / 12}
                color="#3A3435"
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {imageLoading === true ? (
                <View style={{paddingVertical: heightScreen / 35}}>
                  <ActivityIndicator
                    size={50}
                    color="#FF0B5B"
                    style={{opacity: 0.7}}
                  />
                </View>
              ) : (
                <Image
                  style={{
                    borderColor: '#EDEEEE',
                    borderWidth: 2,
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                  }}
                  source={
                    user.image !== undefined
                      ? {
                          uri: user.image,
                        }
                      : require('../../image/placeholder.png')
                  }
                />
              )}
            </View>
            <View
              style={{
                borderColor: '#EDEEEE',
                borderWidth: 2,
                position: 'absolute',
                transform: [{translateX: -50}, {translateY: -50}],
                // top: heightScreen / 3.5,
                // left: widthScreen / 1.5,
                top: '58%',
                left: '68%',
                backgroundColor: '#FF0B5B',
                borderRadius: 100,
                padding: 5,
              }}>
              <TouchableOpacity onPress={() => this._imagePicker(userToken)}>
                <MaterialIcons
                  name="edit"
                  size={widthScreen / 16}
                  color="#FDFBFC"
                />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text
                style={{
                  color: '#FF0B5B',
                  fontSize: widthScreen / 16,
                  letterSpacing: 1,
                  fontFamily: 'Poppins-Regular',
                }}>
                {user.fullname}
              </Text>
            </View>
            <View style={{alignItems: 'center', marginBottom: 15}}>
              <Text
                style={{
                  color: '#3A3435',
                  fontSize: widthScreen / 28,
                  fontFamily: 'Poppins-Regular',
                }}>
                {user.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          <View style={{padding: 25}}>
            {user.isAdmin === true ? (
              <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() => this.props.setAddMovie(true)}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0, justifyContent: 'center'}}>
                    <MaterialCommunityIcons
                      name="library-movie"
                      size={widthScreen / 12}
                      color="#FF0B5B"
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      paddingHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        color: '#FF0B5B',
                        fontSize: widthScreen / 22,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Add Movie
                    </Text>
                    <Text
                      style={{
                        color: '#3A3435',
                        fontSize: widthScreen / 30,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Create new entry of movies
                    </Text>
                  </View>
                  <View style={{flex: 0, justifyContent: 'center'}}>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={widthScreen / 14}
                      color="#FF0B5B"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={() => this.props.setEditModal(true)}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0, justifyContent: 'center'}}>
                  <MaterialIcons
                    name="person-pin"
                    size={widthScreen / 12}
                    color="#FF0B5B"
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      color: '#FF0B5B',
                      fontSize: widthScreen / 22,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Your Data
                  </Text>
                  <Text
                    style={{
                      color: '#3A3435',
                      fontSize: widthScreen / 30,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Update and modify your profile
                  </Text>
                </View>
                <View style={{flex: 0, justifyContent: 'center'}}>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={widthScreen / 14}
                    color="#FF0B5B"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.getAllUserReview(user._id)}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0, justifyContent: 'center'}}>
                  <MaterialCommunityIcons
                    name="comment-processing"
                    size={widthScreen / 12}
                    color="#FF0B5B"
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      color: '#FF0B5B',
                      fontSize: widthScreen / 22,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Your Reviews
                  </Text>
                  <Text
                    style={{
                      color: '#3A3435',
                      fontSize: widthScreen / 30,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Update and modify your review
                  </Text>
                </View>
                <View style={{flex: 0, justifyContent: 'center'}}>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={widthScreen / 14}
                    color="#FF0B5B"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          <View style={{padding: 25}}>
            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={() => this.props.setAlertSignout(true)}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0, justifyContent: 'center'}}>
                  <MaterialCommunityIcons
                    name="logout-variant"
                    size={widthScreen / 12}
                    color="#FF0B5B"
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      color: '#FF0B5B',
                      fontSize: widthScreen / 22,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Sign Out
                  </Text>
                </View>
                <View style={{flex: 0, justifyContent: 'center'}}>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={widthScreen / 14}
                    color="#FF0B5B"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          transparent={true}
          animationType="slide"
          visible={addMovie}
          onRequestClose={() => this.props.setAddMovie(false)}>
          <AddMovie />
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={editModal}
          onRequestClose={() => this.props.setEditModal(false)}>
          <EditModal />
        </Modal>
        <Modal
          transparent={true}
          animationType="fade"
          visible={alertSignout}
          onRequestClose={() => this.props.setAlertSignout(false)}>
          <AlertSignout />
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={showUserReview}
          onRequestClose={() => this.props.setShowUserReview(false)}>
          <UserReview />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  movie: state.movie,
  review: state.review,
});

export default connect(mapStateToProps, {
  getUser,
  setModalProfile,
  uploadImage,
  setEditModal,
  setAddMovie,
  setAlertSignout,
  setShowUserReview,
  getAllUserReview,
})(ProfileModal);
