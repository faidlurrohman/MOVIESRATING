import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  editUserReview,
  setShowEditReview,
} from '../../redux/actions/ReviewActions';
import {connect} from 'react-redux';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class EditReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorRateUser: 0,
      rateReviewUser: 0,
      commentReviewUser: '',
    };
  }

  _chooseRate = value => {
    this.setState({rateReviewUser: value, colorRateUser: value});
  };

  render() {
    const {userToken} = this.props.auth;
    const {user} = this.props.profile;
    const {rateReviewUser, commentReviewUser} = this.state;
    const {loadingEditReview} = this.props.review;
    const {idEdit, rateEdit, reviewEdit} = this.props;
    if (loadingEditReview === true) {
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
            <TouchableOpacity
              onPress={() => this.props.setShowEditReview(false)}>
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
              style={{
                letterSpacing: 1,
                color: '#3A3435',
                fontFamily: 'Poppins-Bold',
                fontSize: widthScreen / 24,
                marginLeft: widthScreen / 20,
              }}>
              Edit Review
            </Text>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          {/* star rating */}
          <View
            style={{
              flex: 0,
              marginTop: heightScreen / 20,
              paddingHorizontal: widthScreen / 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginBottom: heightScreen / 30,
              }}>
              <TouchableOpacity onPress={() => this._chooseRate(1)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={
                    rateReviewUser !== 0
                      ? rateReviewUser >= 1
                        ? '#FE9006'
                        : '#AAAEB4'
                      : rateEdit >= 1
                      ? '#FE9006'
                      : '#AAAEB4'
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._chooseRate(2)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={
                    rateReviewUser !== 0
                      ? rateReviewUser >= 2
                        ? '#FE9006'
                        : '#AAAEB4'
                      : rateEdit >= 2
                      ? '#FE9006'
                      : '#AAAEB4'
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._chooseRate(3)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={
                    rateReviewUser !== 0
                      ? rateReviewUser >= 3
                        ? '#FE9006'
                        : '#AAAEB4'
                      : rateEdit >= 3
                      ? '#FE9006'
                      : '#AAAEB4'
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._chooseRate(4)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={
                    rateReviewUser !== 0
                      ? rateReviewUser >= 4
                        ? '#FE9006'
                        : '#AAAEB4'
                      : rateEdit >= 4
                      ? '#FE9006'
                      : '#AAAEB4'
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._chooseRate(5)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={
                    rateReviewUser !== 0
                      ? rateReviewUser >= 5
                        ? '#FE9006'
                        : '#AAAEB4'
                      : rateEdit >= 5
                      ? '#FE9006'
                      : '#AAAEB4'
                  }
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                textAlign: 'center',
                letterSpacing: 1,
                color:
                  rateReviewUser !== 0
                    ? rateReviewUser !== 0
                      ? '#FE9006'
                      : '#AAAEB4'
                    : rateEdit > 0
                    ? '#FE9006'
                    : '#AAAEB4',
                fontFamily: 'Poppins-Bold',
                fontSize: widthScreen / 30,
              }}>
              YOUR RATE
            </Text>
            <Text
              style={{
                textAlign: 'center',
                letterSpacing: 1,
                color:
                  rateReviewUser !== 0
                    ? rateReviewUser !== 0
                      ? '#FE9006'
                      : '#AAAEB4'
                    : rateEdit > 0
                    ? '#FE9006'
                    : '#AAAEB4',
                fontFamily: 'Poppins-Bold',
                fontSize: widthScreen / 10,
              }}>
              {rateReviewUser !== 0 ? rateReviewUser : rateEdit}
            </Text>
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
              How do you think about this movie?
            </Text>
            <TextInput
              style={{
                textAlignVertical: 'top',
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 3,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              multiline={true}
              selectionColor="#3A3435"
              autoCapitalize="sentences"
              defaultValue={reviewEdit}
              onChangeText={value => this.setState({commentReviewUser: value})}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* button add */}
          <View
            style={{
              flex: 0,
              paddingHorizontal: widthScreen / 20,
              marginTop: heightScreen / 40,
              marginBottom: heightScreen / 40,
            }}>
            <TouchableOpacity
              style={{
                width: widthScreen / 1.1,
                backgroundColor: '#FF0B5B',
                padding: heightScreen / 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() =>
                this.props.editUserReview(
                  userToken,
                  idEdit,
                  rateReviewUser !== 0 ? rateReviewUser : rateEdit,
                  commentReviewUser !== '' ? commentReviewUser : reviewEdit,
                  user._id,
                )
              }>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#EDEEEE',
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
  review: state.review,
});

export default connect(mapStateToProps, {
  editUserReview,
  setShowEditReview,
})(EditReview);
