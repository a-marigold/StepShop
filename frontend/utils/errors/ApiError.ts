export class ApiError extends Error {
    constructor(
        message: string,

        public statusCode?: string | number,
        public statusText?: string
    ) {
        super(message);

        this.statusCode = statusCode;

        this.statusText = statusText;

        this.name = 'ApiError';

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
