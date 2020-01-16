"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get('/users/generate', controllers_1.users.generateUser);
router.get('/users', controllers_1.users.getUsers);
router.put('/users/:userId', controllers_1.users.updateUser);
router.delete('/users/:userId', controllers_1.users.deleteUser);
router.post('/users/login', controllers_1.users.loginUser);
exports.default = router;
