import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export  function readCodesFromFile() {
    const data = fs.readFileSync(`${__dirname}/../data/codes.json`);
    return JSON.parse(data);
}

export  function writeToCodesFile(data) {
    fs.writeFileSync( `${__dirname}/../data/codes.json`, JSON.stringify(data));
}