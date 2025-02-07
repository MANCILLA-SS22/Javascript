"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
const importAll_1 = require("./decorators/importAll");
function requreAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    ;
    res.status(403);
    res.send('Not permitted');
}
let RootController = class RootController {
    getRoot(req, res) {
        if (req.session && req.session.loggedIn) {
            res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/auth/logout">Logout</a>
            </div>
        `);
        }
        else {
            res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/auth/login">Login</a>
            </div>
        `);
        }
    }
    ;
    getProtected(req, res) {
        res.send('Welcome to protected route, logged in user');
    }
    ;
};
exports.RootController = RootController;
__decorate([
    (0, importAll_1.get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getRoot", null);
__decorate([
    (0, importAll_1.get)("/protected"),
    (0, importAll_1.use)(requreAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getProtected", null);
exports.RootController = RootController = __decorate([
    (0, importAll_1.controller)('')
], RootController);
;
