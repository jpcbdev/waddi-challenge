import { Router, Request, Response } from 'express';
import { LogsController } from '../logs/logs.controller';
import { adminGuard, authGuard } from '../shared/utils';

export function useLogsRouter(router: Router) {
    const logsController = new LogsController();
    router.get('/logs/get', authGuard, adminGuard, (req: Request, res: Response) => logsController.getLogs(req, res));
}