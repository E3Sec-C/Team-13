"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomExceptions_1 = require("../exceptions/CustomExceptions");
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomExceptions_1.ConflictError) {
        return res.status(409).json({ message: err.message });
    }
    else if (err instanceof CustomExceptions_1.ValidationError) {
        return res.status(400).json({ message: err.message });
    }
    else if (err instanceof CustomExceptions_1.NotFoundError) {
        return res.status(404).json({ message: err.message });
    }
    else {
        return res.status(500).json({ message: 'An internal server error occurred' });
    }
};
exports.default = errorHandler;
