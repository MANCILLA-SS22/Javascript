class Carrera {
  constructor(id, nombre) {
    this.id = id;
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

  addCatedra(unaCatedra) {
    if (
      unaCatedra &&
      !this.catedras.find((element) => element.id === unaCatedra.id)
    ) {
      this.catedras.push(unaCatedra);
    }
  }

  // Método para asignar a la carrera un conjunto de matriculados que representará a todos los estudiantes que la cursan
  setMatriculados(matriculados = []) {
    this.matriculados = matriculados;
  }

  addMatricula(unaMatricula) {
    if (
      unaMatricula &&
      !this.matriculados.find((element) => element.id === unaMatricula.id)
    ) {
      this.matriculados.push(unaMatricula);
    }
  }

  // Método que nos permite saber si un estudiante se encuentra inscripto a la carrera o no
  isExisteMatricula(legajo) {
    return this.matriculados.some(
      (matricula) => matricula.estudiante.id === legajo
    );
  }
}
