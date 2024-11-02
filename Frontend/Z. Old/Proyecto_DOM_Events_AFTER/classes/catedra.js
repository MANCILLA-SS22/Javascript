class Catedra {
  constructor(num, nombre) {
    this.num = num;
    this.nombre = nombre.trim();
  }

  toString() {
    return this.nombre;
  }
}
