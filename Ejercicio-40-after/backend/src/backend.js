import config from './configs/configs.js';
import express from 'express';
import cors from 'cors';
import RouterNoticias from './router/noticias.routes.js';

const app = express();
const PORT = config.PORT || 8080;
const routerNoticias = new RouterNoticias();

app.use(express.json());
app.use(cors());
app.use('/noticias', routerNoticias.start());

const server = app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT}`));

server.on('error', error => console.log('Servidor express con error', error));