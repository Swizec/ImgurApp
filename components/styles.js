
import {
    StyleSheet
} from 'react-native';

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
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
