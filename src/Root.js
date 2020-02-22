import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { getRootNavigator } from './navigator';

export default class Root extends Component {
  constructor(props) {
    super(props);
    // console.disableYellowBox = true;
  }

  render() {
    const RootNavigator = getRootNavigator();
    return <RootNavigator />;
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
