import { ILog } from './interfaces';
import { LogsRepository } from './logs.repository';

export class LogsService {

    private readonly logsRepository = new LogsRepository();

    public async getLogs(): Promise<ILog[]> {
        const logs = await this.logsRepository.getLogs();
        return logs;
    }

    public async createLog(userId: number, message: string): Promise<ILog> {
        const log = await this.logsRepository.createLog(userId, message);
        return log;
    }

}