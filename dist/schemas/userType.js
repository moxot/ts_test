"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtypes_1 = require("runtypes");
const User = runtypes_1.Record({
    name: runtypes_1.String,
    gender: runtypes_1.String,
    email: runtypes_1.String,
    picture: runtypes_1.String,
    password: runtypes_1.String,
    removed: runtypes_1.Boolean
});
exports.default = User;
