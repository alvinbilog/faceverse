class CustomError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default CustomError;
