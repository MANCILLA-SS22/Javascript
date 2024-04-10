import { tipo_persistencia } from '../../../../config/config.js';
import NoticiasFactoryDAO from '../daos/NoticiasFactory.js';
import Noticias from '../models/noticias.model.js';

class ServicioNoticias {
    constructor() {
        this.noticiasDAO = NoticiasFactoryDAO.get(tipo_persistencia);
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