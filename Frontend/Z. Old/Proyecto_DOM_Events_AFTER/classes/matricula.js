class Matricula {
  constructor(num, carrera, estudiante) {
    this.num = num;
    this.carrera = carrera;
    this.estudiante = estudiante;
    //this.fecha = new Date();
  }

  toString() {
    return this.carrera.nombre + " - " + this.estudiante.nombre;
  }
}