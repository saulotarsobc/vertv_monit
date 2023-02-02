import express, { Request, Response, json } from "express";
import cors from 'cors';
import snmp from './routes/snmp';
import token from './middleware/token';

const server = express()
    .use(json())
    .use(cors())
    .use(token)
    .use('/snmp', snmp);

server.listen((3000), () => { console.log('Server init!') });