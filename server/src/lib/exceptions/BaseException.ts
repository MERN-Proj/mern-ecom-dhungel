export class BaseException extends Error {
  statusCode: number;
  message: string;
  status: string;

  constructor(status: string, statusCode: number, message: string) {
    super(message);
    this.status = status.toUpperCase();
    this.statusCode = statusCode;
    this.message = message;
  }
}
