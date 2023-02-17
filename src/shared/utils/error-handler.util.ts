import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const useGlobalErrorHandler: ErrorRequestHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(error);
    res.status(500);
    res.render('Internal server error: ', { error });
}