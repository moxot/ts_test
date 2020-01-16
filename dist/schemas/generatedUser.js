"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtypes_1 = require("runtypes");
const Name = runtypes_1.Record({
    title: runtypes_1.String,
    first: runtypes_1.String,
    last: runtypes_1.String
});
const Picture = runtypes_1.Record({
    medium: runtypes_1.String
});
const Login = runtypes_1.Record({
    password: runtypes_1.String
});
const GeneratedUser = runtypes_1.Record({
    name: Name,
    gender: runtypes_1.String,
    email: runtypes_1.String,
    picture: Picture,
    login: Login
});
exports.GeneratedUser = GeneratedUser;
const GeneratedUsers = runtypes_1.Record({
    results: runtypes_1.Array(GeneratedUser)
});
exports.GeneratedUsers = GeneratedUsers;
