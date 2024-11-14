import { provide } from '@libs/scaffold';

@provide('helloWorld')
export class HelloWorldManager {

    message = 'Hello, World!';
    count = 0;

    incrementCount() {
        this.count += 1;
    }

    resetCount() {
        this.count = 0;
    }
}
