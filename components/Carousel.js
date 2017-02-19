
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

class TouchableImage extends Component {
    state = {
        width: null
    }

    onPress() {

    }

    onImageLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    }

    render() {
        const { image } = this.props;

        return (
            <TouchableHighlight onPress={this.onPress.bind(this)}
                                style={styles.fullscreen}>
                <Image source={{uri: image.uri}}
                       style={styles.backgroundImage}
                       onLayout={this.onImageLayout.bind(this)}>
                    <Text style={styles.imageLabel}>{image.label}</Text>
                </Image>
            </TouchableHighlight>
        );
    }
}

class ImageCarousel extends Component {
    render() {
        const { image } = this.props;

        return (
            <TouchableImage image={{uri: "https://i.imgur.com/6cFNnJp.jpg",
                                    label: "Its my cake day, why am i happier about this then my real birthday, i will never know. First fav. Post"}} />
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
        resizeMode: 'cover',
        width: null,
        height: null
    },
    imageLabel: {
        textAlign: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        color: 'white',
        padding: 10
    },
});

export default ImageCarousel;
