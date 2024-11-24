import { BaseApp, BaseRouter } from '@libs/scaffold';
import { createApp } from 'vue';

import Root from './components/Root.vue';
import { AboutManager } from './managers/AboutManager.js';
import { HelloWorldManager } from './managers/HelloWorldManager.js';
import { RouterManager } from './managers/RouterManager.js';

export class App extends BaseApp {

    constructor() {
        const vue = createApp(Root);
        super(vue);
        this.mesh.alias(BaseRouter, RouterManager);
        this.mesh.service(HelloWorldManager);
        this.mesh.service(AboutManager);
        this.mesh.service(RouterManager);
    }

}
