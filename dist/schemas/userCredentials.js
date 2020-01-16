"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtypes_1 = require("runtypes");
const UserCredentials = runtypes_1.Record({
    email: runtypes_1.String,
    password: runtypes_1.String
});
exports.default = UserCredentials;
