
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    ListView
} from 'react-native';

import { toJS, when } from 'mobx';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
class TouchableImage extends Component {
    state = {
        width: null,
        hideCaption: false
    }

    onPress(event) {
        const { width } = this.state,
              { store } = this.props,
              X = event.nativeEvent.locationX;

        if (X < width*.3) {
            store.prevImage();
        }else if (X > width*.6) {
            store.nextImage();
        }
    }

    onPressIn(event) {
        this.setState({
            hideCaption: true
        });
    }

    onPressOut(event) {
        this.setState({
            hideCaption: false
        });
    }

    onImageLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    }

    get caption() {
        let { caption, image } = this.props;
        return image.title || image.description || caption;
    }

    render() {
        const { image, store, height } = this.props,
              uri = image.link.replace('http://', 'https://'),
              hideCaption = this.state.hideCaption ? styles.hiddenLabel : null;

        return (
            <TouchableHighlight onPress={this.onPress.bind(this)}
                                onPressIn={this.onPressIn.bind(this)}
                                onPressOut={this.onPressOut.bind(this)}
                                style={styles.fullscreen}>
                <Image source={{uri: uri}}
                       style={[styles.backgroundImage,
                               styles[store.orientation.toLowerCase()],
                               {height: height || null}]}
                       onLayout={this.onImageLayout.bind(this)}>
                    {this.caption ? <Text style={[styles.imageLabel, hideCaption]}>{this.caption}</Text>
                                  : null}
                </Image>
            </TouchableHighlight>
        );
    }
}

@inject('store') @observer
class Album extends Component {
    componentWillMount() {
        const { store, albumID } = this.props;

        store.fetchAlbum(albumID);
    }

    componentWillReceiveProps(newProps) {
        const { store, albumID } = newProps;

        store.fetchAlbum(albumID);
    }

    get dataSource() {
        const { store, albumID } = this.props,
              ds = new ListView.DataSource({
                  rowHasChanged: (r1, r2) => r1.id !== r2.id
              });

        return ds.cloneWithRows(toJS(this.album.images));
    }

    get album() {
        const { store, albumID } = this.props;

        return store.albums.get(albumID);
    }

    renderRow(img, caption) {
        const { store } = this.props;

        let height = store.screenSize.height;

        if (img.height < height) {
            height = img.height;
        }

        return (
            <TouchableImage image={img}
                            height={height}
                            caption={caption} />
        )
    }

    renderHeader() {
        return (
            <Text style={styles.header}>{this.album.title}</Text>
        );
    }

    render () {
        const { store, albumID } = this.props,
              album = store.albums.get(albumID);

        if (album) {
            if (album.images.length > 1) {
                return (
                    <View style={styles.fullscreen}>
                        <ListView dataSource={this.dataSource}
                                  renderRow={img => this.renderRow(img)}
                                  renderHeader={this.renderHeader.bind(this)}
                                  style={styles.fullscreen} />
                    </View>
                );
            }else{
                return this.renderRow(album.images[0], album.title);
            }
        }else{
            return null;
        }
    }
}

@inject('store') @observer
class ImageCarousel extends Component {
    render() {
        const { store } = this.props;

        if (!store.currentImage) {
            return null;
        }

        if (store.currentImage.is_album) {
            return (
                <Album albumID={store.currentImage.id}
                       orientation={store.orientation} />
            );
        }else{
            return (
                <TouchableImage image={store.currentImage}
                                orientation={store.orientation} />
            );
        }
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
    hiddenLabel: {
        opacity: 0.3
    },
    header: {
        textAlign: 'center',
        color: 'white',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ImageCarousel;
