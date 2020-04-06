import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ReviewMovie from './ReviewMovie';
import {
  sendRate,
  setDetailMovie,
  setReviewMovie,
  setShowDelete,
  setShowEdit,
  getEditMovie,
} from '../../redux/actions/MovieActions';
import {
  setShowRateReview,
  getAllReviewMovieId,
} from '../../redux/actions/ReviewActions';
import AlertDelete from '../libraries/AlertDelete';
import EditMovie from './EditMovie';
import RateReview from '../review/RateReview';
import {getUser} from '../../redux/actions/ProfileActions';

import {setModalLogin} from '../../redux/actions/AuthActions';
import {connect} from 'react-redux';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starView: 5,
      getHeighSynopsis: 0,
      showSynopsis: 4,
      showTextSynopsis: 'More',
      getHeighReview: 0,
      showReview: 6,
      showTextReview: 'More',
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

  componentDidMount = async () => {
    if (this.props.auth.userToken !== null) {
      await this.props.getUser(this.props.auth.userToken);
    }
  };

  _getSynopsis = e => {
    if ((e.nativeEvent.layout.height | 0) >= 90) {
      this.setState({
        getHeighSynopsis: e.nativeEvent.layout.height | 0,
      });
    }
  };

  _getReview = e => {
    if ((e.nativeEvent.layout.height | 0) >= 110) {
      this.setState({getHeighReview: e.nativeEvent.layout.height | 0});
    }
  };

  _viewSynopsis = () => {
    if (this.state.showSynopsis === 0) {
      this.setState({showSynopsis: 4, showTextSynopsis: 'More'});
    } else {
      this.setState({showSynopsis: 0, showTextSynopsis: 'Less'});
    }
  };

  _viewReview = () => {
    if (this.state.showReview === 0) {
      this.setState({showReview: 6, showTextReview: 'More'});
    } else {
      this.setState({showReview: 0, showTextReview: 'Less'});
    }
  };

  render() {
    const {userToken} = this.props.auth;
    const {user} = this.props.profile;
    const {showRateReview} = this.props.review;
    const {showDelete, loadingDelete, showEdit} = this.props.movie;
    const {
      details,
      detailReview,
      reviewMovie,
      detailLoading,
    } = this.props.movie;
    const {
      starView,
      getHeighSynopsis,
      showSynopsis,
      showTextSynopsis,
      getHeighReview,
      showReview,
      showTextReview,
      monthList,
    } = this.state;
    let fixFull = [];
    let fixLess = [];

    if (details.overall_rating !== undefined) {
      const mapFullStar = new Array(details.overall_rating | 0);
      const mapLessStar = new Array(starView - (details.overall_rating | 0));
      for (let i = 0; i < mapFullStar.length; i++) {
        fixFull.push(
          <Fontisto
            key={i}
            name="star"
            size={widthScreen / 30}
            color="#FE9006"
          />,
        );
      }
      for (let i = 0; i < mapLessStar.length; i++) {
        fixLess.push(
          <Fontisto
            key={i}
            name="star"
            size={heightScreen / 50}
            color="#AAAEB4"
          />,
        );
      }
    } else {
      for (let i = 0; i < starView; i++) {
        fixLess.push(
          <Fontisto
            key={i}
            name="star"
            size={heightScreen / 50}
            color="#AAAEB4"
          />,
        );
      }
    }

    if (detailLoading === true || loadingDelete === true) {
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
            elevation: 3,
            height: heightScreen / 12,
            backgroundColor: '#FDFBFC',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: widthScreen / 20,
          }}>
          <View style={{flex: 0}}>
            <TouchableOpacity onPress={() => this.props.setDetailMovie(false)}>
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
              {details.title}
            </Text>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={{padding: widthScreen / 20}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 0, justifyContent: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FDFBFC',
                    elevation: 3,
                    borderRadius:
                      details.image !== undefined
                        ? widthScreen / 50
                        : widthScreen / 50,
                  }}
                  activeOpacity={1}>
                  <Image
                    source={
                      details.image !== undefined
                        ? {
                            uri: details.image,
                          }
                        : require('../../image/poster.png')
                    }
                    style={{
                      width: widthScreen / 3,
                      height: heightScreen / 4,
                      resizeMode: 'stretch',
                      borderRadius:
                        details.image !== undefined
                          ? widthScreen / 25
                          : widthScreen / 50,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  padding: widthScreen / 20,
                  // margin: 15,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: widthScreen / 24,
                      color:
                        details.overall_rating !== undefined
                          ? '#FE9006'
                          : '#AAAEB4',
                      letterSpacing: 1,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    {fixFull}
                    {fixLess}
                    {details.overall_rating !== undefined
                      ? `  ${details.overall_rating.toFixed(1)}`
                      : `  0`}
                  </Text>
                </View>
                <Text
                  numberOfLines={3}
                  style={{
                    color: '#3A3435',
                    fontSize: widthScreen / 24,
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  {details.title}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: widthScreen / 30,
                      color: '#FF0B5B',
                      letterSpacing: 1,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    {`${
                      monthList[new Date(details.releaseDate).getMonth()]
                    } ${new Date(details.releaseDate).getDate()}, ${new Date(
                      details.releaseDate,
                    ).getFullYear()}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* category */}
          <View
            style={{
              padding: widthScreen / 20,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={{flex: 0, flexDirection: 'column'}}>
                <View>
                  <Text
                    style={{
                      color: '#AAAEB4',
                      fontFamily: 'Poppins-Regular',
                      fontSize: widthScreen / 30,
                    }}>
                    Category
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#3A3435',
                      fontFamily: 'Poppins-Bold',
                      fontSize: widthScreen / 30,
                    }}>
                    {details.category}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo
                  name="dots-three-vertical"
                  size={widthScreen / 32}
                  color="#AAAEB4"
                />
              </View>
              <View style={{flex: 0, flexDirection: 'column'}}>
                <View>
                  <Text
                    style={{
                      color: '#AAAEB4',
                      fontFamily: 'Poppins-Regular',
                      fontSize: widthScreen / 30,
                    }}>
                    Rating
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#3A3435',
                      fontFamily: 'Poppins-Bold',
                      fontSize: widthScreen / 30,
                    }}>
                    {details.rating.length >= 1
                      ? `+ ${details.rating.reduce((total, value) => {
                          return `${(total += value)}`;
                        })}`
                      : `+ 0`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo
                  name="dots-three-vertical"
                  size={widthScreen / 32}
                  color="#AAAEB4"
                />
              </View>
              <View style={{flex: 0, flexDirection: 'column'}}>
                <View>
                  <Text
                    style={{
                      color: '#AAAEB4',
                      fontFamily: 'Poppins-Regular',
                      fontSize: widthScreen / 30,
                    }}>
                    Review
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#3A3435',
                      fontFamily: 'Poppins-Bold',
                      fontSize: widthScreen / 30,
                    }}>
                    {`+ ${details.rater.length}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* synopsis */}
          <View
            style={{
              padding: widthScreen / 20,
            }}>
            <View>
              <Text
                style={{
                  color: '#3A3435',
                  fontFamily: 'Poppins-Bold',
                  fontSize: widthScreen / 25,
                }}>
                Synopsis
              </Text>
              <View
                style={{
                  flex: 1,
                  marginTop: heightScreen / 100,
                }}>
                <Text
                  numberOfLines={getHeighSynopsis >= 90 ? showSynopsis : null}
                  onLayout={e => this._getSynopsis(e)}
                  style={{
                    textAlign: 'justify',
                    color: '#AAAEB4',
                    fontFamily: 'Poppins-Regular',
                    fontSize: widthScreen / 30,
                  }}>
                  {details.synopsis === '' ? `None` : details.synopsis}
                </Text>
              </View>
              {getHeighSynopsis >= 90 ? (
                <View
                  style={{
                    flex: 1,
                    marginTop: heightScreen / 100,
                  }}>
                  <TouchableOpacity onPress={() => this._viewSynopsis()}>
                    <Text
                      style={{
                        color: '#FF0B5B',
                        fontFamily: 'Poppins-Bold',
                        fontSize: widthScreen / 30,
                      }}>
                      Show {showTextSynopsis}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* details movies */}
          <View
            style={{
              padding: widthScreen / 20,
            }}>
            <View>
              <Text
                style={{
                  color: '#3A3435',
                  fontFamily: 'Poppins-Bold',
                  fontSize: widthScreen / 25,
                }}>
                Details Movie
              </Text>
              <View
                style={{
                  flex: 1,
                  marginTop: heightScreen / 100,
                }}>
                <View style={{flex: 0, flexDirection: 'column'}}>
                  <View>
                    <Text
                      style={{
                        color: '#AAAEB4',
                        fontFamily: 'Poppins-Regular',
                        fontSize: widthScreen / 30,
                      }}>
                      Director :
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#3A3435',
                        fontFamily: 'Poppins-Regular',
                        fontSize: widthScreen / 30,
                      }}>
                      {details.director === '' ? `None` : details.director}
                    </Text>
                  </View>
                </View>
                <View style={{flex: 0, flexDirection: 'column'}}>
                  <View>
                    <Text
                      style={{
                        color: '#AAAEB4',
                        fontFamily: 'Poppins-Regular',
                        fontSize: widthScreen / 30,
                        marginTop: heightScreen / 100,
                      }}>
                      Bugdet :
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#3A3435',
                        fontFamily: 'Poppins-Regular',
                        fontSize: widthScreen / 30,
                      }}>
                      {details.budget === '' ? `None` : `${details.budget} $`}
                    </Text>
                  </View>
                </View>
                <View style={{flex: 0, flexDirection: 'column'}}>
                  <View>
                    <Text
                      style={{
                        color: '#AAAEB4',
                        fontFamily: 'Poppins-Regular',
                        fontSize: widthScreen / 30,
                        marginTop: heightScreen / 100,
                      }}>
                      Featured Song :
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#3A3435',
                        fontFamily: 'Poppins-Regular',
                        fontSize: widthScreen / 30,
                      }}>
                      {details.featuredSong === ''
                        ? `None`
                        : details.featuredSong}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {user.isAdmin === true ? (
            <View
              style={{
                alignItems: 'center',
                borderColor: '#EDEEEE',
                borderWidth: 2,
              }}
            />
          ) : null}
          {/* edit delete */}
          {user.isAdmin === true ? (
            <View
              style={{
                padding: widthScreen / 20,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: widthScreen / 2.5,
                      backgroundColor: '#AAAEB4',
                      padding: heightScreen / 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => this.props.setShowDelete(true)}>
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={heightScreen / 30}
                      color="#FDFBFC"
                    />
                    <Text
                      style={{
                        color: '#FDFBFC',
                        fontFamily: 'Poppins-Bold',
                        fontSize: widthScreen / 30,
                      }}>
                      {`  Delete Movie`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: widthScreen / 2.5,
                      backgroundColor: '#06C258',
                      padding: heightScreen / 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => this.props.getEditMovie(details._id)}>
                    <MaterialCommunityIcons
                      name="file-document-edit"
                      size={heightScreen / 30}
                      color="#FDFBFC"
                    />
                    <Text
                      style={{
                        color: '#FDFBFC',
                        fontFamily: 'Poppins-Bold',
                        fontSize: widthScreen / 30,
                      }}>
                      {`  Edit Movie`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* watchlist */}
          <View
            style={{
              padding: widthScreen / 20,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                }}>
                {userToken === null ? (
                  <TouchableOpacity
                    style={{
                      width: widthScreen / 1.1,
                      backgroundColor: '#AAAEB4',
                      padding: heightScreen / 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => this.props.setModalLogin(true)}>
                    <MaterialCommunityIcons
                      name="comment-plus"
                      size={heightScreen / 30}
                      color="#FDFBFC"
                    />
                    <Text
                      style={{
                        color: '#FDFBFC',
                        fontFamily: 'Poppins-Bold',
                        fontSize: widthScreen / 30,
                      }}>
                      {`  Add to Watchlist`}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      width: widthScreen / 1.1,
                      backgroundColor: '#AAAEB4',
                      padding: heightScreen / 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <MaterialCommunityIcons
                      name="comment-plus"
                      size={heightScreen / 30}
                      color="#FDFBFC"
                    />
                    <Text
                      style={{
                        color: '#FDFBFC',
                        fontFamily: 'Poppins-Bold',
                        fontSize: widthScreen / 30,
                      }}>
                      {`  Add to Watchlist`}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* review */}
          <View
            style={{
              padding: widthScreen / 20,
            }}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: '#3A3435',
                      fontFamily: 'Poppins-Bold',
                      fontSize: widthScreen / 25,
                    }}>
                    Reviews
                  </Text>
                </View>
                {details.rater.length > 1 ? (
                  <View style={{flex: 0}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.getAllReviewMovieId(details.title)
                      }>
                      <Text
                        style={{
                          color: '#FF0B5B',
                          fontFamily: 'Poppins-Bold',
                          fontSize: widthScreen / 30,
                        }}>
                        See All
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                {detailReview.docs.length >= 1 ? (
                  detailReview.docs.slice(0, 1).map(res => {
                    return (
                      <View key={res._id}>
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
                                res.owner.image !== undefined
                                  ? {
                                      uri: res.owner.image,
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
                              {res.owner.fullname}
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
                              {`Movie: ${res.movie}`}
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
                              {` ${res.rating}`}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <View style={{flex: 1}}>
                            <Text
                              numberOfLines={
                                getHeighReview >= 110 ? showReview : null
                              }
                              onLayout={e => this._getReview(e)}
                              style={{
                                color: '#AAAEB4',
                                fontFamily: 'Poppins-Regular',
                                fontSize: widthScreen / 32,
                              }}>
                              {res.review}
                            </Text>
                          </View>
                          {getHeighReview >= 110 ? (
                            <View
                              style={{
                                flex: 1,
                                marginTop: heightScreen / 100,
                              }}>
                              <TouchableOpacity onPress={this._viewReview}>
                                <Text
                                  style={{
                                    color: '#FF0B5B',
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: widthScreen / 30,
                                  }}>
                                  Show {showTextReview}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginTop: heightScreen / 80,
                    }}>
                    <Text
                      style={{
                        color: '#AAAEB4',
                        fontFamily: 'Poppins-Regular',
                        fontSize: widthScreen / 32,
                      }}>
                      Does't have any review yet!
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* add review */}
          <View
            style={{
              padding: widthScreen / 20,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                }}>
                {userToken === null ? (
                  <TouchableOpacity
                    style={{
                      width: widthScreen / 1.1,
                      backgroundColor: '#AAAEB4',
                      padding: heightScreen / 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => this.props.setModalLogin(true)}>
                    <MaterialCommunityIcons
                      name="comment-processing"
                      size={heightScreen / 30}
                      color="#FDFBFC"
                    />
                    <Text
                      style={{
                        color: '#FDFBFC',
                        fontFamily: 'Poppins-Bold',
                        fontSize: widthScreen / 30,
                      }}>
                      {`  Add Review`}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={
                      details.rater.includes(user._id) === true ? true : null
                    }
                    style={{
                      width: widthScreen / 1.1,
                      backgroundColor:
                        details.rater.includes(user._id) === true
                          ? '#FF0B5B'
                          : '#AAAEB4',
                      padding: heightScreen / 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => this.props.setReviewMovie(true)}>
                    <MaterialCommunityIcons
                      name={
                        details.rater.includes(user._id) === true
                          ? 'comment-check'
                          : 'comment-processing'
                      }
                      size={heightScreen / 30}
                      color="#FDFBFC"
                    />
                    <Text
                      style={{
                        color: '#FDFBFC',
                        fontFamily: 'Poppins-Bold',
                        fontSize: widthScreen / 30,
                      }}>
                      {details.rater.includes(user._id) === true
                        ? `  Already Review This Movie`
                        : `  Add Review`}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
          transparent={true}
          animationType="slide"
          visible={reviewMovie}
          onRequestClose={() => this.props.setReviewMovie(false)}>
          <ReviewMovie movieTitle={details.title} movieId={details._id} />
        </Modal>
        <Modal
          transparent={true}
          animationType="fade"
          visible={showDelete}
          onRequestClose={() => this.props.setShowDelete(false)}>
          <AlertDelete movieId={details._id} />
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={showEdit}
          onRequestClose={() => this.props.setShowEdit(false)}>
          <EditMovie />
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={showRateReview}
          onRequestClose={() => this.props.setShowRateReview(false)}>
          <RateReview />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
  auth: state.auth,
  profile: state.profile,
  review: state.review,
});

export default connect(mapStateToProps, {
  setModalLogin,
  setDetailMovie,
  setReviewMovie,
  sendRate,
  getUser,
  setShowDelete,
  setShowEdit,
  getEditMovie,
  setShowRateReview,
  getAllReviewMovieId,
})(DetailMovie);
