import 'reflect-metadata';
import '../stylesheets/index.css';

import { App } from './app.js';

const app = new App();

app.start();

Object.assign(globalThis, {
    app,
});
