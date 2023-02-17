import express, { Express } from 'express';
import { APP_PORT } from './shared/constants/global.constants';
import { setGlobalRouter } from './routes';

import cors from 'cors';
import { useGlobalErrorHandler } from './shared/utils';
import { useDbConnection } from './database';

import bodyParser from 'body-parser';

async function main(): Promise<Express> {
    const app = express();
    
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/', setGlobalRouter());
    app.use(useGlobalErrorHandler);

    app.listen(APP_PORT, async () => {
        await useDbConnection();
        console.debug(`[MAIN] Service running on port: ${APP_PORT}`);
    });
    return app;
}

export const app = main();