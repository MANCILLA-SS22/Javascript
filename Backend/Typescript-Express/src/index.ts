import express from 'express'; //cd Backend/Typescript-Express
import bodyParser from 'body-parser';
import { router } from './routes/loginRoutes';
import cookieSession from 'cookie-session';


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ['ok']}));
app.use(router);
app.listen(3000, (): void => console.log('Listening on port 3000'));