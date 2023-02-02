"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token = (0, express_1.Router)();
token.use((req, res, next) => {
    console.log(req.url, req.body);
    next();
});
exports.default = token;
