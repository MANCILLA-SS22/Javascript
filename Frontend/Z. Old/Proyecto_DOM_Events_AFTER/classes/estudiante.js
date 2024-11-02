class Estudiante {
  constructor(num, apellidos, nombres) {
    this.num = num;
    this.apellidos = apellidos.trim();
    this.nombres = nombres.trim();
  }

  toString() {
    return this.apellidos.toUpperCase() + ", " + this.nombres.toUpperCase();
  }
}
