
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
        const { image, store, height } = this.props;

        const uri = image.link.replace('http://', 'https://'),
              caption = image.title || image.description;

        return (
            <TouchableHighlight onPress={this.onPress.bind(this)}
                                style={styles.fullscreen}>
                <Image source={{uri: uri}}
                       style={[styles.backgroundImage,
                               styles[store.orientation.toLowerCase()],
                               {height: height || null}]}
                       onLayout={this.onImageLayout.bind(this)}>
                    <Text style={styles.imageLabel}>{caption}</Text>
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

    get dataSource() {
        const { store, albumID } = this.props,
              ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        return ds.cloneWithRows(toJS(this.album.images));
    }

    get album() {
        const { store, albumID } = this.props;

        return store.albums.get(albumID);
    }

    renderRow(img) {
        const { store } = this.props;

        console.log(store.screenSize.height);

        return (
            <TouchableImage image={img}
                            height={store.screenSize.height} />
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
            return (
                <View style={styles.fullscreen}>
                    <ListView dataSource={this.dataSource}
                              renderRow={this.renderRow.bind(this)}
                              renderHeader={this.renderHeader.bind(this)}
                              style={styles.fullscreen} />
                </View>
            );

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
    header: {
        textAlign: 'center',
        color: 'white',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ImageCarousel;
