import { Request, Response } from 'express';
import { LogsService } from './logs.service';

export class LogsController {

    private readonly logsService = new LogsService();

    public async getLogs(req: Request, res: Response): Promise<void> {
        try {
            const logs = await this.logsService.getLogs();
            res.status(200).json(logs);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }
}