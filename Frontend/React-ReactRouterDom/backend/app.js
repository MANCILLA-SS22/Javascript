import express from "express"
import bodyParser from 'body-parser'
import eventRoutes from './routes/events.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization ');
  next();
});

app.use(authRoutes);
app.use('/events', eventRoutes);
app.use(function(error, req, res, next){
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080);