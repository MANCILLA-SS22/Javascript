class TipoDocumento {
  constructor(id, nombre, abreviatura) {
    this.id = id;
    this.nombre = nombre.trim();
    this.abreviatura = abreviatura.trim();
  }

  toString() {
    return this.nombre.toUpperCase();
  }
}
