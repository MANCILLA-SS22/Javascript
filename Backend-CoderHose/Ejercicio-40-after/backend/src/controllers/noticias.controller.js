import ServicioNoticias from '../services/noticias.model.js';

class ControladorNoticias {
    constructor() {
        this.servicioNoticias = new ServicioNoticias();
    }

    async obtenerNoticias(req, res){
        try {
            const id = req.params.id;
            const noticia = await this.servicioNoticias.obtenerNoticias(id);
            res.send(noticia);
        } catch (error) {
            console.error('error al obtener noticias', error);
            res.status(500).json({ error: error.message });
        }
    }

    async guardarNoticias(req, res){
        try {
            const noticia = req.body;
            const noticiaGuardada = await this.servicioNoticias.guardarNoticia(noticia);
            res.send(noticiaGuardada);
        } catch (error) {
            console.error('error al guardar noticia', error);
            res.status(500).json({ error: error.message });
        }
    }

    async actualizarNoticia(req, res){
        try {
            const id = req.params.id;
            const noticia = req.body;
            const noticiaActualizada = await this.servicioNoticias.actualizarNoticia(id, noticia);
            res.send(noticiaActualizada);
        } catch (error) {
            console.error('error al actualizar noticia', error);
            res.status(500).json({ error: error.message });
        }
    }

    async borrarNoticia(req, res){
        try {
            const id = req.params.id;
            await this.servicioNoticias.borrarNoticia(id);
            res.send();
        } catch (error) {
            console.error('error al borrar noticia', error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default ControladorNoticias;