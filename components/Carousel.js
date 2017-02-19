
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import { inject, observer } from 'mobx-react/native';

@inject('store')
class TouchableImage extends Component {
    state = {
        width: null
    }

    onPress(event) {
        const { width } = this.state,
              { store } = this.props,
              X = event.nativeEvent.locationX;

        if (X < width/2) {
            store.prevImage();
        }else{
            store.nextImage();
        }
    }

    onImageLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    }

    render() {
        const { image, orientation } = this.props;

        return (
            <TouchableHighlight onPress={this.onPress.bind(this)}
                                style={styles.fullscreen}>
                <Image source={{uri: image.uri}}
                       style={[styles.backgroundImage, styles[orientation.toLowerCase()]]}
                       onLayout={this.onImageLayout.bind(this)}>
                    <Text style={styles.imageLabel}>{image.label}</Text>
                </Image>
            </TouchableHighlight>
        );
    }
}

@inject('store') @observer
class ImageCarousel extends Component {
    render() {
        const { image, store } = this.props;

        return (
            <TouchableImage image={{uri: "https://i.imgur.com/6cFNnJp.jpg",
                                    label: "Its my cake day, why am i happier about this then my real birthday, i will never know. First fav. Post"}}
                            orientation={store.orientation} />
        );
    }
}

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
        width: null,
        height: null
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
        width: null,
        height: null
    },
    portrait: {
        resizeMode: 'contain'
    },
    landscape: {
        resizeMode: 'cover'
    },
    imageLabel: {
        textAlign: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        color: 'white',
        padding: 10
    },
});

export default ImageCarousel;
