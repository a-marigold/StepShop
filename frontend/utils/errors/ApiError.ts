export default class ApiError extends Error {
    constructor(message: string, public statusCode?: string | number) {
        super(message);
        this.statusCode = statusCode;

        this.name = 'ApiError';

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
