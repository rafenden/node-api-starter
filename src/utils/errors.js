class HttpError extends Error {
  constructor(message, code = null, status = null, stack = null, name = null) {
    super();
    this.message = message;
    this.status = status || 500;
    this.name = name || this.constructor.name;
    this.code = code || `E_${this.name.toUpperCase()}`;
    this.stack = stack;
  }

  static fromObject(error) {
    if (error instanceof HttpError) {
      return error;
    }
    else {
      const { message, code, status, stack } = error;
      return new ServerError(message, code, status, stack, error.constructor.name);
    }
  }

  expose() {
    if (this instanceof ClientError) {
      return { ...this };
    }
    else {
      return {
        name: this.name,
        code: this.code,
        status: this.status,
      }
    }
  }
}

class ServerError extends HttpError {}

class ClientError extends HttpError { }

class AuthenticationError extends ClientError {
    constructor(...args) {
    super(...args);
    this.status = 401;
  }
}

class AuthorisationError extends ClientError {
    constructor(...args) {
    super(...args);
    this.status = 401;
  }
}

class IncorrectCredentials extends ClientError {
  constructor(...args) {
    super(...args);
    this.status = 400;
  }
}

class ResourceNotFound extends ClientError {
  constructor(...args) {
    super(...args);
    this.status = 404;
  }
}

module.exports = { HttpError, ServerError, ClientError, AuthenticationError, AuthorisationError, IncorrectCredentials, ResourceNotFound };
