import {promises, existsSync} from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { v4 } from 'uuid';
import { __dirname } from '../dirname.js';

async function logEvents (message, logName){
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${v4()}\t${message}\n`;

    try {
        if (!existsSync(path.join(__dirname, '..', 'logs'))) {
            await promises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await promises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

function logger (req, res, next){
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

export { logger, logEvents };
