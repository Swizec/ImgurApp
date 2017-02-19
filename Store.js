

import { observable, action } from 'mobx';
import { PORTRAIT } from './Constants';

class Store {
    @observable orientation = PORTRAIT;

    @action changeOrientation(orientation) {
        this.orientation = orientation;
    }

    @action prevImage() {
        console.log('previous');
    }

    @action nextImage() {
        console.log('next');
    }
}

export default new Store();
