import express from 'express'; //cd Backend/Typescript-Express
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';
import {LoginController} from './controllers/LoginController'
import {RootController} from './controllers/RootController';

const app = express();

new LoginController();
new RootController();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ['ok']}));
app.use(AppRouter.getInstance());
app.listen(3000, (): void => console.log('Listening on port 3000'));