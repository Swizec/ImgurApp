
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

const Spinner = () => (
    <View style={styles.flex1}>
        <Image source={require('./img/heart.gif')}
               style={styles.spinner} />
    </View>
);

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        height: 100,
        width: 100
    }
});

export default Spinner;
