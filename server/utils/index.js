import { fileURLToPath } from 'url'
import path, { resolve } from 'path';

export const getDirname = () => {
    const __filenameNew = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filenameNew);
    return __dirname;
}

export const sleep = (time)=>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve()
        },time)
    })
}

