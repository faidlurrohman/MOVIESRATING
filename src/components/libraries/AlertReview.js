import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  deleteReviewUser,
  setShowDeleteReview,
} from '../../redux/actions/ReviewActions';
import {connect} from 'react-redux';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class AlerReview extends Component {
  render() {
    const {userToken} = this.props.auth;
    const {user} = this.props.profile;
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.3)"
          barStyle="dark-content"
        />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
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
                Are you sure want to delete this review ?
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
                onPress={() => this.props.setShowDeleteReview(false)}>
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
                onPress={() =>
                  this.props.deleteReviewUser(
                    userToken,
                    this.props.reviewId,
                    user._id,
                  )
                }>
                <Text
                  style={{
                    letterSpacing: 1,
                    color: '#FDFBFC',
                    fontFamily: 'Poppins-Bold',
                    fontSize: widthScreen / 30,
                  }}>
                  DELETE
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
  deleteReviewUser,
  setShowDeleteReview,
})(AlerReview);
