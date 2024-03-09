import config from '../configs/configs.js'
import NoticiasFactoryDAO from './model/daos/NoticiasFactory.js';
import Noticias from './model/models/Noticias.js';

class ServicioNoticias {
    constructor() {
        this.noticiasDAO = NoticiasFactoryDAO.get(config.TIPO_PERSISTENCIA);
    }

    static validarNoticia(noticia, requerido) {
        try {
            Noticias.validar(noticia, requerido);
        } catch (error) {
            throw new Error(`la noticia posee un formato inválido ${error.details[0].message}`)
        }
    }    

    async obtenerNoticias(id) {
        return await this.noticiasDAO.obtenerNoticias(id);
    }

    async guardarNoticia(noticia) {
        ServicioNoticias.validarNoticia(noticia, true);
        return await this.noticiasDAO.guardarNoticia(noticia);
    }

    async actualizarNoticia(id, noticia) {
        ServicioNoticias.validarNoticia(noticia, false);
        return await this.noticiasDAO.actualizarNoticia(id, noticia);
    }

    async borrarNoticia(id) {
        await this.noticiasDAO.borrarNoticia(id);
    }
}

export default ServicioNoticias;