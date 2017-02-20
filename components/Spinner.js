
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

import styles from './styles';

const Spinner = () => (
    <View style={[styles.fullscreen, styles.centered]}>
        <Image source={require('./img/heart.gif')}
               style={{width: 100, height: 100}} />
    </View>
);


export default Spinner;
