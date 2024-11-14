/* eslint-disable import/no-default-export */
declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent<{}, {}, any>;
    export default component;
}
/* eslint-enable import/no-default-export */
