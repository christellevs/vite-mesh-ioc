import { BaseApp } from '@libs/scaffold';
import { createApp } from 'vue';

import Root from './components/Root.vue';
import { HelloWorldManager } from './managers/HelloWorldManager.js';

export class App extends BaseApp {

    constructor() {
        const vue = createApp(Root);
        super(vue);
        this.mesh.service(HelloWorldManager);
    }

}
