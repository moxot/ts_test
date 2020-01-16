import express from 'express';
import router from './routes';
import { HTTPError } from './utils/errors';
import { init } from './storage';
import config from './config';

(async ()=>{
    try {
        await init(config.mongoURL);

        const app = express();

        app.use(express.json());
        app.use('/api', router);
        
        app.use(function (err: HTTPError, req: express.Request, res: express.Response, next: express.NextFunction) {
            if (res.headersSent) {
                return next(err);
            }
            res.status(err.status);
            res.send(err.message);
        });

        app.listen(config.port, config.ip);
    } catch (err) {
        console.error(err.stack || err);
        process.exit(1);
    }
})();

