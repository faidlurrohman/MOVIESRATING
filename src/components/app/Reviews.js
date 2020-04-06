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
import {
  getAllReview,
  getMoreAllReview,
} from '../../redux/actions/ReviewActions';
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Review extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount = async () => {
  //   await this.props.getAllReview();
  // };

  render() {
    const {
      allReviews,
      showMoreAllReview,
      loadingMoreAllReview,
      pageAllReview,
    } = this.props.review;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FDFBFC',
        }}>
        {allReviews.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              loadingMoreAllReview === true ? (
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
              ) : showMoreAllReview === true ? (
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
                    onPress={() => this.props.getMoreAllReview(pageAllReview)}>
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
            data={allReviews}
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
        <NavigationEvents
          onDidFocus={async () => {
            await this.props.getAllReview();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  review: state.review,
});

export default connect(mapStateToProps, {
  getAllReview,
  getMoreAllReview,
})(Review);
