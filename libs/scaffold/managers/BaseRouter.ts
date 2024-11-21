import { init } from '../utils/init.js';
import { dep } from 'mesh-ioc';
import { Event } from 'nanoevent';
import { App as VueApp } from 'vue';
import { RouteLocation, RouteLocationRaw, Router } from 'vue-router';

import { UiManager } from './UiManager.js';

export abstract class BaseRouter {

    @dep({ key: 'Vue' }) private vue!: VueApp;
    @dep({ key: 'ui' }) private ui!: UiManager;

    router: Router;

    routeUpdated = new Event<{
        route: RouteLocation;
    }>();

    constructor() {
        this.router = this.createRouter();
        this.router.afterEach(route => {
            document.title = String(route.meta.title ?? this.defaultPageTitle);
            this.onRouteChange(route);
        });
    }

    abstract createRouter(): Router;

    @init()
    init() {
        this.vue.use(this.router);
    }

    get defaultPageTitle() {
        return 'NodeScript';
    }

    get url() {
        return this.getCurrentRoute().fullPath;
    }

    getCurrentRoute() {
        return this.router.currentRoute as unknown as RouteLocation;
    }

    isActive(route: RouteLocation, deep = true) {
        const r = this.router.resolve(route);
        const current = this.getCurrentRoute();
        return deep ? current.path.startsWith(r.path) : r.path === current.path;
    }

    goto(to: RouteLocationRaw) {
        if (this.ui.ctrlOrMetaKey) {
            this.openInNewTab(to);
        } else {
            this.router.push(to);
        }
    }

    openInNewTab(to: RouteLocationRaw) {
        const resolved = this.router.resolve(to);
        window.open(resolved.fullPath, '_blank')?.focus();
    }

    private onRouteChange(route: RouteLocation) {
        this.routeUpdated.emit({
            route,
        });
    }

}
