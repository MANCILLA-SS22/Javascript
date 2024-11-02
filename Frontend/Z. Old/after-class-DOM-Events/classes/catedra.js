class Catedra {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre.trim();
  }

  toString() {
    return this.nombre;
  }
}
