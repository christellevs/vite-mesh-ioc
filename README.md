# Vue 3 + Vite + Mesh IoC

Key players:

* [Vue3](https://vuejs.org/)
	* [Options API](https://vuejs.org/guide/typescript/options-api)
* [Vite](https://vite.dev/)
* [Mesh IoC](https://www.npmjs.com/package/mesh-ioc)


This README is split into 2 parts.

## 1. Repo

The first part is how to run the current repo, which is an evolving experimental project around implementing Vue 3, with Options API, Vite and Mesh IoC.

At the moment it includes a `libs` directory with a `BaseApp` that used Mesh IoC, to provide the option for expanding this library unit, be it with components or more complex frontend related functionality like handling notifications.

To run this repo:

```bash
npm i && npm run dev
```

Next steps for this project:

- [x] Implement Vue Router
- [x] Use TypeScript in `.vue` component files
- [x] With the above^ attempt to get Intellisense working in `.vue` component files

## 2. Simpler project:

In case you're looking for something even simpler, without libraries support, (add future features here), etc. Here's the [git repo](https://github.com/christellevs/vite-mesh-ioc-simple).