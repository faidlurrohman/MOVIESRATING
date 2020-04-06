import React, {Component} from 'react';
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import Tabs from './src/components/Tabs';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}
