"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userStorage = __importStar(require("./user"));
exports.userStorage = userStorage;
exports.init = async function (mongourl) {
    await mongoose_1.default.connect(mongourl, { useNewUrlParser: true });
    mongoose_1.default.connection.on('error', err => {
        console.error(err.stack || err);
        process.exit(1);
    });
};
