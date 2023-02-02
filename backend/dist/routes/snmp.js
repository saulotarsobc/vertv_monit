"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const child_process_1 = require("child_process");
const snmp = (0, express_1.Router)();
snmp.post('/snmpwalk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cm = "", ip = "", port = 161, oid = "", params = "", } = req.body;
    (0, child_process_1.exec)(`snmpwalk -v2c -c ${cm} ${ip}:${port} ${oid} ${params}`, (error, stdout, stderr) => {
        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }
        if (stderr) {
            res.status(401).json({ error: stderr });
            return;
        }
        res.status(200).json(stdout.split('\n'));
    });
}));
snmp.post('/snmpget', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cm = "", ip = "", port = 161, oid = "", params = "", } = req.body;
    (0, child_process_1.exec)(`snmpget -v2c -c ${cm} ${ip}:${port} ${oid} ${params}`, (error, stdout, stderr) => {
        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }
        if (stderr) {
            res.status(401).json({ error: stderr });
            return;
        }
        res.status(200).send(stdout);
    });
}));
exports.default = snmp;
