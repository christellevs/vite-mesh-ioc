import { provide } from '@libs/scaffold';

@provide('helloWorld')
export class HelloWorldManager {

    message: string = 'Hello, World!';
    count: number = 0;

    incrementCount() {
        this.count += 1;
    }

    resetCount() {
        this.count = 0;
    }
}
