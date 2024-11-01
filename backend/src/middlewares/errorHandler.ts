// errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ConflictError, NotFoundError, ValidationError } from '../exceptions/CustomExceptions';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ConflictError) {
        return res.status(409).json({ message: err.message });
    }else if(err instanceof ValidationError){
        return res.status(400).json({ message: err.message });
    }else if(err instanceof NotFoundError){
        return res.status(404).json({ message: err.message });
    }else{
        return res.status(500).json({ message: 'An internal error occurred' });
    }
};

export default errorHandler;
