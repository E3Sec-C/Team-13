class BadRequestError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
        
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequestError);
        }

        // Ensure the prototype is set correctly for instanceof checks
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export { BadRequestError };
