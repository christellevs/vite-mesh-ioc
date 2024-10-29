var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// src/managers/HelloWorldManager.ts
import { provide } from '../utils/provide.js';
let HelloWorldManager = class HelloWorldManager {
    constructor() {
        this.message = 'Hello, World!';
        this.count = 0;
    }
    incrementCount() {
        this.count += 1;
    }
    resetCount() {
        this.count = 0;
    }
};
HelloWorldManager = __decorate([
    provide('helloWorld')
], HelloWorldManager);
export { HelloWorldManager };
//# sourceMappingURL=HelloWorldManager.js.map