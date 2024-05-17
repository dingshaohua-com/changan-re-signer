import { fileURLToPath } from 'url'
import path from 'path';

export const getDirname = () => {
    const __filenameNew = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filenameNew);
    return __dirname;
}

