import { Request, Response, Router } from "express";
import { exec } from 'child_process';

const snmp = Router();


snmp.post('/snmpwalk', async (req: Request, res: Response) => {

    const {
        cm = "",
        ip = "",
        port = 161,
        oid = "",
        params = "",
    } = req.body;

    exec(`snmpwalk -v2c -c ${cm} ${ip}:${port} ${oid} ${params}`, (error, stdout, stderr) => {
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

});

snmp.post('/snmpget', async (req: Request, res: Response) => {

    const {
        cm = "",
        ip = "",
        port = 161,
        oid = "",
        params = "",
    } = req.body;

    exec(`snmpget -v2c -c ${cm} ${ip}:${port} ${oid} ${params}`, (error, stdout, stderr) => {
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

});

export default snmp;