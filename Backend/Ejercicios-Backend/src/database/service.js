import {StudentServiceMongo} from "./dao/mongo/services/students.service.js";
import {StudentsRepository} from './repository/students.repository.js'
const studentDao = new StudentServiceMongo()
const studentService = new StudentsRepository(studentDao);

import {CourseService} from "./dao/mongo/services/courses.service.js"
import {CoursesRepository} from './repository/courses.repository.js'
const coursesDao = new CourseService();
const coursesService = new CoursesRepository(coursesDao);

import { UsuarioServiceMongo } from "./dao/mongo/services/usuarios.service.js";
import { UsuarioRepository } from "./repository/usuarios.repository.js";
const usuarioDao = new UsuarioServiceMongo();
const usuarioService = new UsuarioRepository(usuarioDao);

import { MascotaServiceMongo } from "./dao/mongo/services/mascotas.service.js";
import { MascotaRepository } from "./repository/mascotas.repository.js";
const mascotaDao = new MascotaServiceMongo();
const mascotaService = new MascotaRepository(mascotaDao);

import { AdopcionServiceMongo } from "./dao/mongo/services/adopcion.service.js";
import { AdopcionRepository } from "./repository/adopciones.repository.js";
const adopcionDao = new AdopcionServiceMongo();
const adopcionService = new AdopcionRepository(adopcionDao);

export {studentService, coursesService, usuarioService, mascotaService, adopcionService};