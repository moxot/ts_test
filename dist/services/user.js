"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runtypes_1 = require("runtypes");
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const storage_1 = require("../storage");
const saltRounds = 10;
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
const GeneratedUsers = runtypes_1.Record({
    results: runtypes_1.Array(GeneratedUser)
});
class User {
    constructor(user) {
        this.name = user.name;
        this.gender = user.gender;
        this.email = user.email;
        this.picture = user.picture;
        this.password = user.password;
        this.removed = user.removed;
    }
}
exports.User = User;
;
const requestOptions = {
    protocol: 'https:',
    hostname: 'randomuser.me',
    port: 443,
    path: '/api/'
};
async function generateUser() {
    let parsedUsers = JSON.parse(await utils_1.asyncHttpRequest(requestOptions));
    let parsedUser = parsedUsers.results[0];
    GeneratedUser.check(parsedUser);
    let user = new User({
        name: `${parsedUser.name.title}. ${parsedUser.name.first} ${parsedUser.name.last}`,
        gender: parsedUser.gender,
        email: parsedUser.email,
        picture: parsedUser.picture.medium,
        password: await bcrypt_1.default.hash(parsedUser.login.password, saltRounds),
        removed: false
    });
    return await storage_1.userStorage.addUser(user);
}
exports.generateUser = generateUser;
async function getUsers() {
    return await storage_1.userStorage.getUsers();
}
exports.getUsers = getUsers;
