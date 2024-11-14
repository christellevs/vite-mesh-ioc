# Setting Up Vue 3 with Vite, MeshIoc and TypeScript

This document provides a step-by-step guide to set up a Vue 3 application using [Vite](https://vite.dev/), [Mesh IoC](https://www.npmjs.com/package/mesh-ioc) and TypeScript.

---

## **Table of Contents**

1. [Project Setup](#1-project-setup)
2. [Installing Dependencies](#2-installing-dependencies)
3. [Project Structure](#3-project-structure)
4. [Configuring TypeScript](#4-configuring-typescript)
5. [Configuring Vite](#5-configuring-vite)
6. [Creating Essential Files](#6-creating-essential-files)
   - [index.html](#indexhtml)
   - [Create the provide utils](#create-the-provide-utils)
   - [Create a Manager](#create-a-manager)
   - [src/components/HelloWorld.vue](#srccomponentshelloworldvue)
   - [src/main.ts](#srcmaints)
7. [Running the app](#7-running-the-app)
8. [Summary](#8-summary)

---
## **1. Project Setup**

Create a new directory for your project and navigate into it:

```bash
mkdir frontend-app
cd frontend-app
```

---

## **2. Installing Dependencies**

Initialize a new npm project:

```bash
npm init -y
```

Install Vue 3, Vite, and TypeScript:

```bash
npm install vue@next
npm install --save-dev vite typescript
```

Install Vite's Vue plugin:

```bash
npm install --save-dev @vitejs/plugin-vue
```

Install `mesh-ioc`:

```bash
npm install mesh-ioc
```

Install Node.js type definitions:

```bash
npm install --save-dev @types/node
```

---

## **3. Project Structure**

Your project directory should now look like this:

```
frontend-app/
├── package.json
├── node_modules/
└── src/
└───── components/
└───── managers/
└───── utils/
```
---

## **4. Configuring TypeScript**

Create a `tsconfig.json` file in the root directory with the following content:

```json
{
	"compilerOptions": {
		"target": "es2020",
		"module": "NodeNext",
		"moduleResolution": "NodeNext",
		"rootDir": ".",
		"outDir": "./out",
		"strict": true,
		"jsx": "preserve",
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true,
		"resolveJsonModule": true,
		"esModuleInterop": true,
		"sourceMap": true,
		"baseUrl": ".",
		"paths": {
		"@/*": ["src/*"]
	},
	"types": ["node"],
	"lib": ["ESNext", "DOM"]
	},
	"include": [
		"**/*.ts",
		"**/*.js",
		"**/*.vue"
	]
}
```

---

## **5. Configuring Vite**

Create a `vite.config.ts` file in the root directory:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
})
```

---

## **6. Creating Essential Files**

### **index.html**

Create an `index.html` file in the root directory:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Frontend App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```
### **Create the provide utils**

Create a `utils` directory in `src`:

This is used to help with MeshIoc

``` ts
import { ServiceConstructor } from 'mesh-ioc';

export const globalProvideMap = new Map<string, ServiceConstructor<any>>();

export function provide(alias: string) {
    return function (target: ServiceConstructor<any>) {
        globalProvideMap.set(alias, target);
    };
}
```

### **Create a Manager**

Create a `managers` directory in `src`:

```bash
mkdir src/managers
```

Create a `HelloWorldManager.ts` file:

```ts
import { provide } from '../utils/provide.js';

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
```

### **src/components/HelloWorld.vue**

Create a `HelloWorld.vue` file inside `src/components`:

```html
<template>
	<h1>{{ message }}</h1>
	<div class="card">
	<button class="Btn" type="button" @click="increment()">count is {{ count }}</button>
	</div>
</template>

<script>
export default {
	
	inject: [ 'helloWorld' ],
		
	computed: {
		
		message() {
			return this.helloWorld.message;
		},
	
		count() {
			return this.helloWorld.count;
		}
		
	},
	
	methods: {
	
		increment() {
			return this.helloWorld.incrementCount()
		}
	}

}
</script>

<style scoped>
.Btn {
	background-color: blue;
	color: white
}
</style>
```

### **src/main.ts**

Create a `main.ts` file in the `src` directory:

```ts
import { reactive, ReactiveFlags } from '@vue/reactivity';
import { Mesh } from 'mesh-ioc';
import { App as VueApp } from 'vue';
import { globalProvideMap } from './utils/provide.js';
import HelloWorld from './components/HelloWorld.vue';
import { HelloWorldManager } from './managers/HelloWorldManager.js';
import { createApp } from 'vue';

export class App {

	protected provides: Record<string, any> = {};

	constructor(
		readonly vue: VueApp,
		readonly mesh: Mesh = new Mesh(),
	){
		(this.mesh as any)[ReactiveFlags.RAW] = true;
		this.mesh.use(instance => reactive(instance));
		this.mesh.constant('App', this);
		this.mesh.constant('Vue', this.vue);
		vue.provide('app', this);
		this.mesh.service(HelloWorldManager);
	}
	
	async start() {
		this.provideServices();
		this.vue.mount('#app');
	}
	
	protected provideServices() {
		this.provides = {};
		for (const [alias, ctor] of globalProvideMap) {
			const instance = this.mesh.resolve(ctor);
			this.vue.provide(alias, instance);
			this.provides[alias] = instance;
		}
	}
}

const vueApp = createApp(HelloWorld);
const app = new App(vueApp);

app.start();

Object.assign(globalThis, {
	app,
});
```
---

## **7. Running the app**

In the terminal:

```
npm run dev
```

---

## **8. Summary**

The above is a basic starter for a frontend apps that use Vue 3, Vite, MeshIoc and TypeScript.

If you'd like to create something a bit more robust with libraries in place, please take a look at this repo.
