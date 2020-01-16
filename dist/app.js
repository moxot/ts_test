"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const storage_1 = require("./storage");
const config_1 = __importDefault(require("./config"));
(async () => {
    try {
        await storage_1.init(config_1.default.mongoURL);
        const app = express_1.default();
        app.use(express_1.default.json());
        app.use('/api', routes_1.default);
        app.use(function (err, req, res, next) {
            if (res.headersSent) {
                return next(err);
            }
            res.status(err.status);
            res.send(err.message);
        });
        app.listen(config_1.default.port, config_1.default.ip);
    }
    catch (err) {
        console.error(err.stack || err);
        process.exit(1);
    }
})();
