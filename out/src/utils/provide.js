export const globalProvideMap = new Map();
export function provide(alias) {
    return function (target) {
        globalProvideMap.set(alias, target);
    };
}
//# sourceMappingURL=provide.js.map