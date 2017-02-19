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
  Image
} from 'react-native';

import ImageCarousel from './components/Carousel';

export default class ImgurApp extends Component {
  render() {
    return (
        <View style={styles.container}>
            <ImageCarousel />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    empty: {
        flex: 1
    }
});

AppRegistry.registerComponent('ImgurApp', () => ImgurApp);
