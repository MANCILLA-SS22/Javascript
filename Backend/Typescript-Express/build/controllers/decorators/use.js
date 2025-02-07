"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = use;
const enums_1 = require("./enums");
function use(middleware) {
    return function (target, key, descriptor) {
        const middlewares = Reflect.getMetadata(enums_1.MetadataKeys.middleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(enums_1.MetadataKeys.middleware, middlewares, target, key);
        // Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key);
    };
}
