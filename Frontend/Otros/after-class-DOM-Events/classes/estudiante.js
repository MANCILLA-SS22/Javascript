class Estudiante {
  constructor(id, apellidos, nombres) {
    this.id = id;
    this.apellidos = apellidos.trim();
    this.nombres = nombres.trim();
  }

  toString() {
    return this.apellidos.toUpperCase() + ", " + this.nombres.toUpperCase();
  }
}
