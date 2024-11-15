import { BaseRouter, provide } from '@libs/scaffold';
import { createRouter, createWebHistory } from 'vue-router';

import About from '../components/About.vue';
import HelloWorld from '../components/HelloWorld.vue';

@provide('router')
export class RouterManager extends BaseRouter {

    createRouter() {
        return createRouter({
            history: createWebHistory(),
            scrollBehavior: () => {
                return {
                    top: 0
                };
            },
            routes: [
                {
                    name: 'Home',
                    path: '/',
                    component: HelloWorld,
                },
                {
                    name: 'About',
                    path: '/about',
                    component: About,
                },
            ],
        });
    }

    goHome() {
        this.goto({ name: 'Home' });
    }

}
