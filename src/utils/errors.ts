export class CustomError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = this.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class LLMError extends CustomError {
  constructor(message: string) {
    super(message, 500, "LLM_ERROR");
  }
}

export class FoursquareError extends CustomError {
  constructor(message: string) {
    super(message, 500, "FOURSQUARE_ERROR");
  }
}
