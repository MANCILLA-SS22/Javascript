class Matricula {
  constructor(id, unaCarrera, unEstudiante) {
    this.id = id;
    this.carrera = unaCarrera;
    this.estudiante = unEstudiante;
    this.fecha = new Date();
  }

  toString() {
    return this.carrera.nombre + " - " + this.estudiante.nombre;
  }
}
