"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./models/user"));
exports.addUser = async function (data) {
    try {
        let createdUser = new user_1.default(data);
        return await createdUser.save();
    }
    catch (err) {
        throw err;
    }
};
exports.getUsers = async function () {
    try {
        return await user_1.default.find({ removed: false });
    }
    catch (err) {
        throw err;
    }
};
exports.updateUser = async function (userId, data) {
    try {
        return await user_1.default.replaceOne({ _id: userId }, data);
    }
    catch (err) {
        throw err;
    }
};
exports.deleteUser = async function (userId) {
    try {
        return await user_1.default.deleteOne({ _id: userId });
    }
    catch (err) {
        throw err;
    }
};
exports.loginUser = async function (creds) {
    try {
        return await user_1.default.findOne({ email: creds.email });
    }
    catch (err) {
        throw err;
    }
};
