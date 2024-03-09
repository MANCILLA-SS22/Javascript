class Estudiante {
  constructor(id, unTipo, documento, apellidos, nombres, correo) {
    this.id = id;
    this.apellidos = apellidos.trim();
    this.nombres = nombres.trim();
    this.documento = documento.toString().trim();
    this.tipoDocumento = unTipo;
    this.correo = correo.trim();
    this.matriculas = [];
  }

  toString() {
    return this.apellidos.toUpperCase() + ", " + this.nombres.toUpperCase();
  }

  setMatriculas(matriculas = []) {
    this.matriculas = matriculas;
  }

  addMatricula(unaMatricula) {
    if (unaMatricula && !this.matriculas.find((element) => element.id === unaMatricula.id)) {
      this.matriculas.push(unaMatricula);
    }
  }
}
