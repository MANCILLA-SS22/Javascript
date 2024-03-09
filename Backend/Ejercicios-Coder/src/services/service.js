import {StudentServiceMongo} from "./dao/mongo/students.service.js";
import {StudentsRepository} from './repository/students.repository.js'
const studentDao = new StudentServiceMongo()
const studentService = new StudentsRepository(studentDao);

import {CourseService} from "./dao/mongo/courses.service.js"
import {CoursesRepository} from './repository/courses.repository.js'
const coursesDao = new CourseService();
const coursesService = new CoursesRepository(coursesDao);

export {studentService, coursesService}