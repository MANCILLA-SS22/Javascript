"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //cd Backend/Typescript-Express
const cookie_session_1 = __importDefault(require("cookie-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const AppRouter_1 = require("./AppRouter");
const LoginController_1 = require("./controllers/LoginController");
const RootController_1 = require("./controllers/RootController");
const app = (0, express_1.default)();
new LoginController_1.LoginController();
new RootController_1.RootController();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_session_1.default)({ keys: ['ok'] }));
app.use(AppRouter_1.AppRouter.getInstance());
app.listen(3000, () => console.log('Listening on port 3000'));
