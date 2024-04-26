class NotFoundError {
  constructor(message) {
    this.message = message;
    this.status = 404;
  }
}

export {NotFoundError}