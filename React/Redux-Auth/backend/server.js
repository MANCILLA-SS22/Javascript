import express from "express";
import dotenv from 'dotenv';
import path from "path";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { __dirname } from "./dirname.js";
import corsOptions from "./config/corsOptions.js";
import { logger } from "./middleware/logEvents.js";
import errorHandler from './middleware/errorHandler.js';
import verifyJWT from './middleware/verifyJWT.js';
import credentials from './middleware/credentials.js';
import connectDB from './config/dbConn.js';
import root from './routes/root.js';
import register from './routes/register.js';
import auth from './routes/auth.js';
import refresh from './routes/refresh.js';
import logout from './routes/logout.js';
import employees from './routes/api/employees.js';
import users from './routes/api/users.js';
import main from "./config/main.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3500;
connectDB(); // Connect to MongoDB

app.use(logger); // custom middleware logger
app.use(credentials); // Handle options credentials check - before CORS!  and fetch cookies credentials requirement
app.use(cors(corsOptions)); // Cross Origin Resource Sharing
app.use(express.urlencoded({ extended: false })); // built-in middleware to handle urlencoded form data
app.use(express.json()); // built-in middleware for json 
app.use(cookieParser()); //middleware for cookies
app.use(express.static(`${__dirname}/public`)); //serve static files
// app.use('/', express.static(path.join(__dirname, '/public'))); 

app.use('/', root);
app.use('/register', register);
app.use('/auth', auth);
app.use('/refresh', refresh);
app.use('/logout', logout);
app.use(verifyJWT);
app.use('/employees', employees);
app.use('/users', users);
app.all('*', main);
app.use(errorHandler);

mongoose.connection.once('open', () => app.listen(PORT, () => console.log(`Connected to MongoDB. Server running on port ${PORT}`)));