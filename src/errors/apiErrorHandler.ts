import ApiError from './ApiError';
import express = require('express');
import ApiResponse from '../models/ServerResponse';
import { ZodError } from 'zod';

function apiErrorHandler(error: Error | ApiError, _req: express.Request, res: express.Response, _next: express.NextFunction) {
  if (error instanceof ApiError) {
    res.status(error.code).json(error.messageAPI);
    return;
  } else if (error instanceof ZodError) {
    res.status(400).send(ApiResponse.badRequest(error.issues[0].message, error.message));
    return;
  }
  res.status(500).json(ApiResponse.generic('Internal server error', {}));
}

export default apiErrorHandler;

