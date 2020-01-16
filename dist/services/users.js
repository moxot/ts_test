"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const userType_1 = __importDefault(require("../schemas/userType"));
const userCredentials_1 = __importDefault(require("../schemas/userCredentials"));
const generatedUser_1 = require("../schemas/generatedUser");
const bcrypt_1 = __importDefault(require("bcrypt"));
const storage_1 = require("../storage");
const config_1 = __importDefault(require("../config"));
const saltRounds = config_1.default.saltRounds;
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
const requestOptions = config_1.default.randomUserApi;
async function generateUser() {
    let parsedUsers = JSON.parse(await utils_1.asyncHttpRequest(requestOptions));
    let parsedUser = parsedUsers.results[0];
    generatedUser_1.GeneratedUser.check(parsedUser);
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
;
async function updateUser(userId, data) {
    userType_1.default.check(data);
    data.password = await bcrypt_1.default.hash(data.password, saltRounds);
    return await storage_1.userStorage.updateUser(userId, data);
}
exports.updateUser = updateUser;
;
async function deleteUser(userId) {
    return await storage_1.userStorage.deleteUser(userId);
}
exports.deleteUser = deleteUser;
;
async function loginUser(creds) {
    userCredentials_1.default.check(creds);
    let user = await storage_1.userStorage.loginUser(creds);
    if (user) {
        return await bcrypt_1.default.compare(creds.password, user.password);
    }
    else {
        return false;
    }
}
exports.loginUser = loginUser;
;
