"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const utils_1 = require("../utils");
exports.generateUser = async function (req, res, next) {
    try {
        res.send(await services_1.Users.generateUser());
    }
    catch (err) {
        console.error(err.stack || err);
        next(new utils_1.HTTPError(500, 'Internal server error'));
    }
};
exports.getUsers = async function (req, res, next) {
    try {
        res.send(await services_1.Users.getUsers());
    }
    catch (err) {
        console.error(err.stack || err);
        next(new utils_1.HTTPError(500, 'Internal server error'));
    }
};
exports.updateUser = async function (req, res, next) {
    try {
        let body = req.body;
        body.removed = false;
        let result = await services_1.Users.updateUser(req.params.userId, req.body);
        res.send({ success: result.nModified > 0 });
    }
    catch (err) {
        console.error(err.stack || err);
        next(new utils_1.HTTPError(500, 'Internal server error'));
    }
};
exports.deleteUser = async function (req, res, next) {
    try {
        let result = await services_1.Users.deleteUser(req.params.userId);
        let success = !!result.deletedCount && result.deletedCount > 0;
        res.send({ success });
    }
    catch (err) {
        console.error(err.stack || err);
        next(new utils_1.HTTPError(500, 'Internal server error'));
    }
};
exports.loginUser = async function (req, res, next) {
    try {
        let result = { success: !!await services_1.Users.loginUser(req.body) };
        res.send(result);
    }
    catch (err) {
        console.error(err.stack || err);
        next(new utils_1.HTTPError(500, 'Internal server error'));
    }
};
