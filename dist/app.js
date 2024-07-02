"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// routers defining
app.use('/user', user_1.default);
app.use('/post', post_1.default);
exports.default = app;
