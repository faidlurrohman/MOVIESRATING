import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  getMovie,
  getMoreMovie,
  getDetail,
  setDetailMovie,
} from '../../redux/actions/MovieActions';
import {connect} from 'react-redux';
import DetailMovie from '../movies/DetailMovie';
import {NavigationEvents} from 'react-navigation';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthList: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    };
  }

  // componentDidMount = async () => {
  // await this.props.getMovie();
  //   this.didFocusListener = this.props.navigation.addListener(
  //     'didFocus',
  //     () => {
  //       console.log('did focus');
  //     },
  //   );
  // };

  render() {
    const {monthList} = this.state;
    const {
      loadingMovie,
      movies,
      showMore,
      loadingMore,
      pageMovie,
      detailMovie,
    } = this.props.movie;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EDEEEE',
        }}>
        {loadingMovie === true ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <ActivityIndicator
              size={50}
              color="#FF0B5B"
              style={{opacity: 0.7}}
            />
          </View>
        ) : movies.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              loadingMore === true ? (
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
              ) : showMore === true ? (
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
                    onPress={() => this.props.getMoreMovie(pageMovie)}>
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
            data={movies}
            renderItem={({item}) => (
              <View
                style={{
                  zIndex: 1,
                  height: heightScreen / 3.5,
                  flexDirection: 'row',
                  margin: 15,
                  marginBottom: 1,
                  elevation: 3,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 9,
                    borderRadius: 10,
                    width: widthScreen / 1.09,
                    height: heightScreen / 4.5,
                    backgroundColor: '#FDFBFC',
                    elevation: 3,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 0,
                      width: widthScreen / 2.5,
                    }}
                  />
                  <View
                    style={{
                      zIndex: 10,
                      flex: 1,
                      flexDirection: 'column',
                      paddingTop: 10,
                      marginHorizontal: 5,
                      // justifyContent: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'right',
                          fontSize: heightScreen / 45,
                          color: '#FE9006',
                          letterSpacing: 1,
                          fontFamily: 'Poppins-Bold',
                          marginRight: 10,
                        }}>
                        <Fontisto
                          name="star"
                          size={heightScreen / 50}
                          color="#FE9006"
                        />{' '}
                        {item.overall_rating !== undefined
                          ? item.overall_rating.toFixed(1)
                          : `0`}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.props.getDetail(item._id)}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{
                            fontSize: heightScreen / 45,
                            color: '#3A3435',
                            letterSpacing: 1,
                            fontFamily: 'Poppins-Bold',
                          }}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#FF0B5B',
                          letterSpacing: 1,
                          fontWeight: 'bold',
                          fontFamily: 'Poppins-Thin',
                          fontSize: heightScreen / 48,
                          marginTop: 2,
                          marginBottom: 5,
                        }}>
                        {`${
                          monthList[new Date(item.releaseDate).getMonth()]
                        } ${new Date(item.releaseDate).getDate()}, ${new Date(
                          item.releaseDate,
                        ).getFullYear()}`}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column', marginRight: 10}}>
                      <Text
                        style={{
                          letterSpacing: 1,
                          color: '#AAAEB4',
                          letterSpacing: 1,
                          fontWeight: 'bold',
                          fontFamily: 'Poppins-Thin',
                          fontSize: heightScreen / 48,
                          marginBottom: 5,
                        }}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    zIndex: 10,
                    flex: 0,
                    elevation: 3,
                    justifyContent: 'flex-end',
                    padding: 15,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FDFBFC',
                      elevation: 3,
                      borderRadius: widthScreen / 50,
                    }}
                    activeOpacity={0.9}
                    onPress={() => this.props.getDetail(item._id)}>
                    <Image
                      source={
                        item.image !== undefined
                          ? {
                              uri: item.image,
                            }
                          : require('../../image/poster.png')
                      }
                      style={{
                        width: widthScreen / 3,
                        height: heightScreen / 4,
                        resizeMode: 'stretch',
                        borderRadius: widthScreen / 25,
                        padding: 5,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
        <Modal
          transparent={true}
          animationType="slide"
          visible={detailMovie}
          onRequestClose={() => this.props.setDetailMovie(false)}>
          <DetailMovie />
        </Modal>
        <NavigationEvents
          onDidFocus={async () => {
            await this.props.getMovie();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
});

export default connect(mapStateToProps, {
  setDetailMovie,
  getMovie,
  getMoreMovie,
  getDetail,
})(Home);
