import { readFile as fsReadFile } from 'fs/promises';

async function readFromFile(filePath) {
    try {
        const data = await fsReadFile(`${APPROOT}${filePath}`, 'utf8');
        return data.toString();
    } catch (err) {
        throw new Error(`Error reading file: ${err.message}`);
    }
}

export default readFromFile;