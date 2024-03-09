class Carrera {
  constructor(num, nombre) {
    this.num = num;
    this.nombre = nombre.trim();
    this.catedras = [];
    this.matriculados = [];
  }

  toString() {
    return this.nombre.toUpperCase();
  }

  // Método para asignar a la carrera un conjunto de catedras disponibles para tomar durante el cursado
  setCatedras(catedras = []) {
    this.catedras = catedras;
  }

  // Método para asignar a la carrera un conjunto de matriculados que representará a todos los estudiantes que la cursan
  setMatriculados(matriculados = []) {
    this.matriculados = matriculados;
  }

  // Método que nos permite saber si un estudiante se encuentra inscripto a la carrera o no
  isExisteMatricula(legajo){
    return this.matriculados.some((matricula) => matricula.estudiante.num === legajo);
  }
}