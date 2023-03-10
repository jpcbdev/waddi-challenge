import { ILog } from './interfaces';
import { LogsModel } from './logs.model';

export class LogsRepository {

    public getLogs(): Promise<ILog[]> {
        return LogsModel.findAll({ order: [['id', 'DESC']] });
    }

    public createLog(userId: number, message: string): Promise<ILog> {
        return LogsModel.create({ UserId: userId, message });
    }

}