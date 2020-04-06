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
import {sendRateReview, setReviewMovie} from '../../redux/actions/MovieActions';
import {connect} from 'react-redux';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class ReviewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorRate: 0,
      rateReview: 0,
      commentReview: '',
    };
  }

  _chooseRate = value => {
    this.setState({rateReview: value, colorRate: value});
  };

  render() {
    const {userToken} = this.props.auth;
    const {rateReview, commentReview} = this.state;
    const {loadingSendReview} = this.props.movie;
    if (loadingSendReview === true) {
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
            <TouchableOpacity onPress={() => this.props.setReviewMovie(false)}>
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
              Add Review
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
                  color={rateReview >= 1 ? '#FE9006' : '#AAAEB4'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._chooseRate(2)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={rateReview >= 2 ? '#FE9006' : '#AAAEB4'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._chooseRate(3)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={rateReview >= 3 ? '#FE9006' : '#AAAEB4'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._chooseRate(4)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={rateReview >= 4 ? '#FE9006' : '#AAAEB4'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._chooseRate(5)}>
                <Fontisto
                  name="star"
                  size={widthScreen / 15}
                  color={rateReview >= 5 ? '#FE9006' : '#AAAEB4'}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                textAlign: 'center',
                letterSpacing: 1,
                color: rateReview !== 0 ? '#FE9006' : '#AAAEB4',
                fontFamily: 'Poppins-Bold',
                fontSize: widthScreen / 30,
              }}>
              YOUR RATE
            </Text>
            <Text
              style={{
                textAlign: 'center',
                letterSpacing: 1,
                color: rateReview !== 0 ? '#FE9006' : '#AAAEB4',
                fontFamily: 'Poppins-Bold',
                fontSize: widthScreen / 10,
              }}>
              {rateReview}
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
              }}
              onChangeText={value => this.setState({commentReview: value})}>
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
              onChangeText={value => this.setState({commentReview: value})}
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
              disabled={rateReview !== 0 && commentReview !== '' ? null : true}
              style={{
                width: widthScreen / 1.1,
                backgroundColor:
                  rateReview !== 0 && commentReview !== ''
                    ? '#FF0B5B'
                    : '#EDEEEE',
                padding: heightScreen / 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() =>
                this.props.sendRateReview(
                  this.props.movieId,
                  this.props.movieTitle,
                  rateReview,
                  commentReview,
                  userToken,
                )
              }>
              <Text
                style={{
                  letterSpacing: 1,
                  color:
                    rateReview !== 0 && commentReview !== ''
                      ? '#EDEEEE'
                      : '#3A3435',
                  fontFamily: 'Poppins-Bold',
                  fontSize: widthScreen / 30,
                }}>
                SUBMIT REVIEW
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
  movie: state.movie,
});

export default connect(mapStateToProps, {
  sendRateReview,
  setReviewMovie,
})(ReviewMovie);
