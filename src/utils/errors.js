class CustomError extends Error {
  constructor(message, code = null, status = null, stack = null) {
    super();
    this.message = message;
    this.name = this.constructor.name;
    this.code = code || `E${this.name.toUpperCase()}`;
    this.status = status || 500;
    this.stack = stack;
  }

  static fromObject(error) {
    if (error instanceof CustomError) {
      return error;
    }
    else {
      const { message, code, status, stack } = error;
      return new CustomError(message, code, status, stack);
    }
  }

  toJson() {
    return { ...this };
  }
}

class AuthenticationError extends CustomError {
    constructor(...args) {
    super(...args);
    this.status = 401;
  }
}

class AuthorisationError extends CustomError {
    constructor(...args) {
    super(...args);
    this.status = 401;
  }
}

class IncorrectCredentials extends CustomError {
  constructor(...args) {
    super(...args);
    this.status = 400;
  }
}

class ResourceNotFound extends CustomError {
  constructor(...args) {
    super(...args);
    this.status = 404;
  }
}

class ValidationError extends CustomError {
  constructor(message, validationErrors = null) {
    super(message);
    this.validationErrors = validationErrors && validationErrors.map(({ path, message }) => {
      return { field: path, message };
    });
    this.status = 400;
  }
}

module.exports = { CustomError, AuthenticationError, AuthorisationError, IncorrectCredentials, ResourceNotFound, ValidationError };
