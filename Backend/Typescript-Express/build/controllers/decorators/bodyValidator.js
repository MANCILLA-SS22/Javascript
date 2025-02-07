"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = bodyValidator;
require("reflect-metadata");
const enums_1 = require("./enums");
function bodyValidator(...keys) {
    return function (target, key, desc) {
        Reflect.defineMetadata(enums_1.MetadataKeys.validator, keys, target, key);
    };
}
;
