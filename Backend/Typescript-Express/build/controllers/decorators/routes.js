"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
const enums_1 = require("./enums");
function routeBinder(method) {
    return function (path) {
        return function (target, key, descriptor) {
            Reflect.defineMetadata(enums_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(enums_1.MetadataKeys.method, method, target, key);
        };
    };
}
;
exports.get = routeBinder(enums_1.Methods.get);
exports.put = routeBinder(enums_1.Methods.put);
exports.post = routeBinder(enums_1.Methods.post);
exports.del = routeBinder(enums_1.Methods.del);
exports.patch = routeBinder(enums_1.Methods.patch);
