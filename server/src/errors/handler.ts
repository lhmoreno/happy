import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string] : string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'Validation fails', errors });
  }

  if (error.errno === 19) 
    return response.status(406).json({ error: 'E-mail already registered'});

  if (error.code === 'ERR_HTTP_HEADERS_SENT') 
    return response.status(401).send();

  console.error(error);
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;