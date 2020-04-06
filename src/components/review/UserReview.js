import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  setShowUserReview,
  setShowDeleteReview,
  setShowEditReview,
  getMoreUserReview,
} from '../../redux/actions/ReviewActions';
import {connect} from 'react-redux';
import AlertReview from '../libraries/AlertReview';
import EditReview from './EditReview';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class UserReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idReviewSend: '',
      idEdit: '',
      rateEdit: 0,
      reviewEdit: '',
    };
  }

  _openDelete = id => {
    this.setState({idReviewSend: id});
    this.props.setShowDeleteReview(true);
  };

  _openEdit = (id, rate, review) => {
    this.setState({
      idEdit: id,
      rateEdit: rate,
      reviewEdit: review,
    });
    this.props.setShowEditReview(true);
  };

  render() {
    const {user} = this.props.profile;
    const {
      userReviews,
      loadingUserReview,
      showMoreUserReview,
      pageUserReview,
      loadingMoreUserReview,
      deleteReview,
      editReview,
    } = this.props.review;
    if (loadingUserReview === true) {
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
              onPress={() => this.props.setShowUserReview(false)}>
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
              {`${user.fullname} Reviews`}
            </Text>
          </View>
        </View>
        {userReviews.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              loadingMoreUserReview === true ? (
                <View
                  style={{
                    marginTop: heightScreen / 20,
                    marginBottom: heightScreen / 25,
                  }}>
                  <ActivityIndicator
                    size={heightScreen / 25}
                    color="#FF0B5B"
                    style={{opacity: 0.7}}
                  />
                </View>
              ) : showMoreUserReview === true ? (
                <View
                  style={{
                    marginTop: heightScreen / 20,
                    marginBottom: heightScreen / 25,
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      this.props.getMoreUserReview(user._id, pageUserReview)
                    }>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#FF0B5B',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: heightScreen / 55,
                        letterSpacing: 1,
                      }}>
                      Load More
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    marginBottom: 25,
                  }}
                />
              )
            }
            data={userReviews}
            renderItem={({item}) => (
              <View style={{flex: 1}}>
                <View
                  style={{
                    paddingHorizontal: widthScreen / 20,
                    paddingTop: heightScreen / 50,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: heightScreen / 80,
                      marginBottom: heightScreen / 80,
                    }}>
                    <View
                      style={{
                        flex: 0,
                        justifyContent: 'center',
                        marginRight: widthScreen / 20,
                      }}>
                      <Image
                        source={
                          item.owner.image !== undefined
                            ? {
                                uri: item.owner.image,
                              }
                            : require('../../image/placeholder.png')
                        }
                        style={{
                          width: widthScreen / 8,
                          height: heightScreen / 14,
                          borderRadius: 100,
                          borderColor: '#EDEEEE',
                          borderWidth: 2,
                        }}
                      />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: '#3A3435',
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: widthScreen / 34,
                          letterSpacing: 1,
                        }}>
                        {item.owner.fullname}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: '#3A3435',
                          fontFamily: 'Poppins-Regular',
                          fontSize: widthScreen / 34,
                          letterSpacing: 1,
                        }}>
                        {`Movie: ${item.movie}`}
                      </Text>
                    </View>
                    <View style={{flex: 0, justifyContent: 'center'}}>
                      <Text
                        style={{
                          color: '#FE9006',
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: widthScreen / 32,
                          letterSpacing: 1,
                        }}>
                        <Fontisto
                          name="star"
                          size={widthScreen / 36}
                          color="#FE9006"
                        />
                        {` ${item.rating}`}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          color: '#AAAEB4',
                          fontFamily: 'Poppins-Regular',
                          fontSize: widthScreen / 32,
                        }}>
                        {item.review}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => this._openDelete(item._id)}>
                        <Text
                          style={{
                            letterSpacing: 1,
                            color: '#FF0B5B',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: widthScreen / 32,
                            marginRight: widthScreen / 30,
                          }}>
                          DELETE
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this._openEdit(item._id, item.rating, item.review)
                        }>
                        <Text
                          style={{
                            letterSpacing: 1,
                            color: '#06C258',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: widthScreen / 32,
                          }}>
                          EDIT
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    borderColor: '#EDEEEE',
                    borderWidth: 2,
                    marginTop: heightScreen / 50,
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
        <Modal
          transparent={true}
          animationType="fade"
          visible={deleteReview}
          onRequestClose={() => this.props.setShowDeleteReview(false)}>
          <AlertReview reviewId={this.state.idReviewSend} />
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={editReview}
          onRequestClose={() => this.props.setShowEditReview(false)}>
          <EditReview
            idEdit={this.state.idEdit}
            rateEdit={this.state.rateEdit}
            reviewEdit={this.state.reviewEdit}
          />
        </Modal>
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
  setShowUserReview,
  setShowDeleteReview,
  setShowEditReview,
  getMoreUserReview,
})(UserReview);
