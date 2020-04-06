import {Dimensions} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import Home from './components/app/Home';
import Reviews from './components/app/Reviews';
import Category from './components/app/Category';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

// tab navigation
const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const CategoryNavigator = createStackNavigator({
  Category: {
    screen: Category,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const ReviewsNavigator = createStackNavigator({
  Reviews: {
    screen: Reviews,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeNavigator,
    Category: CategoryNavigator,
    Reviews: ReviewsNavigator,
  },
  {
    // swipeEnabled: false,
    // animationEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
      labelStyle: {
        width: widthScreen / 3,
        flex: 0,
        letterSpacing: 1,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Thin',
      },
      pressColor: '#FDFBFC',
      activeTintColor: '#FDFBFC',
      inactiveTintColor: '#FDFBFC',
      scrollEnabled: true,
      indicatorStyle: {
        backgroundColor: '#FDFBFC',
      },
      showLabel: true,
      style: {
        backgroundColor: '#FF0B5B',
      },
      tabStyle: {
        height: heightScreen / 12,
        justifyContent: 'center',
        width: widthScreen / 3,
      },
    },
  },
);

export default createAppContainer(TabNavigator);
