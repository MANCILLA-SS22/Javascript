const corsOptions = { // Configura el middleware cors con opciones personalizadas
    origin: 'http://localhost:5500', // Permitir solo solicitudes desde un cliente específico
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Configura los métodos HTTP permitidos    
    allowedHeaders: 'Content-Type,Authorization', // Configura las cabeceras permitidas
    credentials: true, // Configura si se permiten cookies en las solicitudes
};

export {corsOptions};