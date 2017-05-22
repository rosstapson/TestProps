/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NetInfo,
  Alert
} from 'react-native';

import isNetworkConnected from './isNetworkConnected';

export default class TestProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true
    }
  }
  componentDidMount() {
    NetInfo.addEventListener(
      'change',
      this.handleConnectivityChange
    );
    // If user is not using the networkHOC, no harm in the below call. handleFirstConnectivityChange will fire
    // as soon as the component mounts, setting the right connectivity, hence re-rendering child components
    const isConnected = isNetworkConnected();
    if (isConnected !== this.state.isConnected) {
      this.setState({  // eslint-disable-line react/no-did-mount-set-state
        isConnected,
      });
    }
  }
  componentWillUnmount() {
    NetInfo.removeEventListener(
      'change',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = (isConnected) => {
    Alert.alert(isConnected);
    if (isConnected !== this.state.isConnected) {
      this.setState({
        isConnected,
      });
    }
  };
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Is network connected:
          {this.state.isConnected}
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TestProps', () => TestProps);
