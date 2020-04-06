import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import {
  setShowSearch,
  getAllMovies,
  setShowLoadingSearch,
} from '../../redux/actions/SearchActions';
import {getDetail} from '../../redux/actions/MovieActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: [],
      loadingFilter: false,
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

  componentDidMount = () => {
    this.props.getAllMovies();
  };

  _searchTitle = value => {
    if (value !== '') {
      this.setState({loadingFilter: true});
      const getSearch = this.props.search.allMovies.filter(res => {
        const dataMovies = `${res.title.toLowerCase()}`;
        const searchData = value.toLowerCase();

        return dataMovies.indexOf(searchData) > -1;
      });
      setTimeout(() => {
        this.setState({
          loadingFilter: false,
          showData: getSearch,
        });
        // console.log(getSearch);
      }, 1000);
    } else {
      this.setState({showData: []});
      // console.log('null');
    }
  };

  render() {
    const {loadingSearch} = this.props.search;
    const {loadingFilter, showData, monthList} = this.state;

    if (loadingSearch === true) {
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
          backgroundColor: '#EDEEEE',
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
            <TouchableOpacity onPress={() => this.props.setShowSearch(false)}>
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
            <TextInput
              style={{
                color: '#3A3435',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 14,
                backgroundColor: '#FDFBFC',
                fontSize: widthScreen / 28,
                fontFamily: 'Poppins-Regular',
              }}
              autoFocus={true}
              placeholder="Search movie by title"
              selectionColor="#3A3435"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this._searchTitle(value)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FDFBFC',
          }}>
          {loadingFilter === true ? (
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
          ) : (
            <FlatList
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                <View
                  style={{
                    marginBottom: 25,
                  }}
                />
              }
              data={showData}
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
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps, {
  setShowSearch,
  getAllMovies,
  setShowLoadingSearch,
  getDetail,
})(Search);
