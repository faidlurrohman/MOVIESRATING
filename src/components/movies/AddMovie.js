import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {addMovie, setAddMovie} from '../../redux/actions/MovieActions';
import {connect} from 'react-redux';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerVisible: false,
      addTitle: '',
      addSynopsis: '',
      addPoster: '',
      showNamePoster: '',
      addDate: new Date(),
      addDirector: '',
      addSong: '',
      category: [
        {
          id: 0,
          name: 'Real',
        },
        {
          id: 1,
          name: 'Anime',
        },
      ],
      addCategory: '',
      addBudget: '',
    };
  }

  _addImage = () => {
    const options = {
      title: 'Select Poster',
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
        // console.log(response);
        this.setState({addPoster: response, showNamePoster: response.fileName});
      }
    });
  };

  _showDatePicker = () => {
    this.setState({
      datePickerVisible: true,
    });
  };

  _selectedCategory = name => {
    this.setState({addCategory: name});
  };

  render() {
    const optionsDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const {
      datePickerVisible,
      addTitle,
      addSynopsis,
      addPoster,
      showNamePoster,
      addDate,
      addDirector,
      addSong,
      category,
      addCategory,
      addBudget,
    } = this.state;
    const {userToken} = this.props.auth;
    const {loadingAdd} = this.props.movie;
    if (loadingAdd === true) {
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
            <TouchableOpacity onPress={() => this.props.setAddMovie(false)}>
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
              Add Movie Data
            </Text>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          {/* title */}
          <View
            style={{
              flex: 0,
              // marginTop: heightScreen / 20,
              padding: widthScreen / 20,
            }}>
            <Text
              style={{
                letterSpacing: 1,
                color: '#3A3435',
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
                marginBottom: heightScreen / 50,
              }}>
              Title Movie
            </Text>
            <TextInput
              style={{
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 14,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              selectionColor="#3A3435"
              autoCapitalize="words"
              onChangeText={value => this.setState({addTitle: value})}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* poster */}
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
              Poster Movie
            </Text>
            <TouchableOpacity
              style={{
                width: widthScreen / 1.1,
                backgroundColor: '#EDEEEE',
                padding: heightScreen / 50,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 1,
                borderRadius: 5,
              }}
              onPress={() => this._addImage()}>
              <Text
                numberOfLines={1}
                style={{
                  textAlign: 'center',
                  letterSpacing: 1,
                  color: '#FF0B5B',
                  fontFamily: 'Poppins-Regular',
                  fontSize: widthScreen / 30,
                }}>
                {showNamePoster !== '' ? showNamePoster : `Add Poster`}
              </Text>
            </TouchableOpacity>
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
              Synopsis Movie
            </Text>
            <TextInput
              style={{
                textAlignVertical: 'top',
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 5,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              multiline={true}
              selectionColor="#3A3435"
              autoCapitalize="sentences"
              onChangeText={value => this.setState({addSynopsis: value})}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* release */}
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
              Release Movie
            </Text>
            <TouchableOpacity
              style={{
                width: widthScreen / 1.1,
                backgroundColor: '#EDEEEE',
                padding: heightScreen / 50,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 1,
                borderRadius: 5,
              }}
              onPress={this._showDatePicker}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#FF0B5B',
                  fontFamily: 'Poppins-Regular',
                  fontSize: widthScreen / 30,
                }}>
                {addDate.toLocaleDateString('en-US', optionsDate)}
              </Text>
            </TouchableOpacity>
            {/* datetimepicker */}
            {datePickerVisible === true ? (
              <DateTimePicker
                value={addDate}
                mode="date"
                display="spinner"
                visible={datePickerVisible}
                onChange={(event, value) => {
                  if (value !== undefined) {
                    this.setState({
                      datePickerVisible: false,
                      addDate: value,
                    });
                  } else {
                    this.setState({
                      datePickerVisible: false,
                    });
                  }
                }}
              />
            ) : null}
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* director */}
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
              Director Movie
            </Text>
            <TextInput
              style={{
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 14,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              selectionColor="#3A3435"
              autoCapitalize="words"
              onChangeText={value => this.setState({addDirector: value})}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* song */}
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
              Featured Song Movie
            </Text>
            <TextInput
              style={{
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 14,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              selectionColor="#3A3435"
              autoCapitalize="words"
              onChangeText={value => this.setState({addSong: value})}
            />
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
              Category Movie
            </Text>
            <View
              style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              {category.map(res => {
                return (
                  <TouchableOpacity
                    key={res.id}
                    style={{
                      backgroundColor:
                        res.name === addCategory ? '#FF0B5B' : '#EDEEEE',
                      borderRadius: 5,
                      elevation: 1,
                      padding: widthScreen / 45,
                      height: heightScreen / 14,
                      marginBottom: heightScreen / 100,
                      marginRight: widthScreen / 30,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                    onPress={() => {
                      this._selectedCategory(res.name);
                    }}>
                    <Text
                      style={{
                        color: res.name === addCategory ? '#EDEEEE' : '#3A3435',
                        fontSize: widthScreen / 30,
                        fontFamily: 'Poppins-Regular',
                        paddingHorizontal: widthScreen / 20,
                      }}>
                      {res.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderColor: '#EDEEEE',
              borderWidth: 2,
            }}
          />
          {/* budget */}
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
              Budget Movie
            </Text>
            <TextInput
              style={{
                color: '#FF0B5B',
                paddingHorizontal: widthScreen / 20,
                height: heightScreen / 14,
                backgroundColor: '#EDEEEE',
                borderRadius: 5,
                elevation: 1,
                fontSize: widthScreen / 30,
                fontFamily: 'Poppins-Regular',
              }}
              selectionColor="#3A3435"
              keyboardType={'numeric'}
              onChangeText={value => this.setState({addBudget: value})}
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
              disabled={
                addTitle !== '' &&
                addSynopsis !== '' &&
                addDirector !== '' &&
                addSong !== '' &&
                addBudget !== '' &&
                addCategory !== ''
                  ? false
                  : true
              }
              style={{
                width: widthScreen / 1.1,
                backgroundColor:
                  addTitle !== '' &&
                  addSynopsis !== '' &&
                  addDirector !== '' &&
                  addSong !== '' &&
                  addBudget !== '' &&
                  addCategory !== ''
                    ? '#FF0B5B'
                    : '#AAAEB4',
                padding: heightScreen / 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() =>
                this.props.addMovie(
                  addTitle,
                  addPoster,
                  addSynopsis,
                  addDate,
                  addDirector,
                  addSong,
                  addCategory,
                  addBudget,
                  userToken,
                )
              }>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#FDFBFC',
                  fontFamily: 'Poppins-Bold',
                  fontSize: widthScreen / 30,
                }}>
                ADD MOVIE
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
  setAddMovie,
  addMovie,
})(AddMovie);
