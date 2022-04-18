import type { AxiosError } from 'axios';

class Response<T = undefined> {
  data?: T;
  statusCode?: number;
  message?: string;
  error?: Error;

  static fromData<T>(data: T, statusCode: number, message?: string): Response<T> {
    const response = new Response<T>();
    response.data = data;
    response.statusCode = statusCode;
    response.message = message;

    return response;
  }

  static fromError<T>(error: AxiosError): Response<T> {
    const response = new Response<T>();
    response.error = error;

    console.error({ error }); // eslint-disable-line

    if (error.response) {
      response.statusCode = error.response.status;
      response.message = error.response.data.message;
    } else {
      response.statusCode = 500;
      response.message = 'There was an error that could not be treated.';
    }

    return response;
  }
}

export { Response };
