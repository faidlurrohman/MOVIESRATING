import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setShowRateReview} from '../../redux/actions/ReviewActions';
import {connect} from 'react-redux';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class RateReview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      reviews,
      loadingReview,
      loadingMoreReview,
      showMoreReview,
    } = this.props.review;
    if (loadingReview === true) {
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
              onPress={() => this.props.setShowRateReview(false)}>
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
              All Reviews
            </Text>
          </View>
        </View>
        {reviews.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              loadingMoreReview === true ? (
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
              ) : showMoreReview === true ? (
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
                    // onPress={() => this.props.getMoreMovie(pageMovie)}
                  >
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
            data={reviews}
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  review: state.review,
});

export default connect(mapStateToProps, {
  setShowRateReview,
})(RateReview);
