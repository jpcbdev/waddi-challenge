import express from 'express';
import { APP_PORT } from './shared/constants/global.constants';
import { setGlobalRouter } from './routes';

import cors from 'cors';
import { useGlobalErrorHandler } from './shared/utils';
import { useDbConnection } from './database';

import bodyParser from 'body-parser';

function main() {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use('/', setGlobalRouter());
    app.use(useGlobalErrorHandler);

    app.listen(APP_PORT, async () => {
        await useDbConnection();
        console.debug(`[MAIN] Service running on port: ${APP_PORT}`);
    });
}

main();