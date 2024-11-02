class Catedra {
  constructor(id, nombre, unaCarrera) {
    this.id = id;
    this.nombre = nombre.trim();
    this.carrera = unaCarrera;
  }

  toString() {
    return this.nombre.toUpperCase();
  }
}
