"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = controller;
require("reflect-metadata");
const AppRouter_1 = require("../../AppRouter");
const enums_1 = require("./enums");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send("Invalid request");
            return;
        }
        for (const key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        const res = Object.getOwnPropertyNames(target.prototype); //This works for "target": "es2016" in tsconfig.json
        res.forEach(function (key) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(enums_1.MetadataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(enums_1.MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(enums_1.MetadataKeys.middleware, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(enums_1.MetadataKeys.validator, target.prototype, key) || [];
            const validator = bodyValidators(requiredBodyProps);
            if (path)
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
        });
    };
}
