"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
exports.asyncHttpRequest = function (reqOpts) {
    let method = reqOpts.protocol === 'http:' ? http_1.default
        : reqOpts.protocol === 'https:' ? https_1.default
            : null;
    return new Promise((resolve, reject) => {
        if (method) {
            let req = method.request(reqOpts, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
                res.on('error', (err) => {
                    reject(err);
                });
            });
            req.end();
        }
        else {
            reject(new Error('Protocol is not supportd'));
        }
    });
};
