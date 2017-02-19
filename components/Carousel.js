
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
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

        const uri = image.link.replace('http://', 'https://');

        console.log(toJS(image));

        return (
            <TouchableHighlight onPress={this.onPress.bind(this)}
                                style={styles.fullscreen}>
                <Image source={{uri: uri}}
                       style={[styles.backgroundImage, styles[orientation.toLowerCase()]]}
                       onLayout={this.onImageLayout.bind(this)}>
                    <Text style={styles.imageLabel}>{image.title}</Text>
                </Image>
            </TouchableHighlight>
        );
    }
}

@inject('store') @observer
class ImageCarousel extends Component {
    render() {
        const { store } = this.props;

        if (!store.currentImage) {
            return null;
        }

        return (
            <TouchableImage image={store.currentImage}
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
