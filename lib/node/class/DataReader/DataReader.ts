import fs from 'fs';
import path from 'path';
import DataReadError from '../../error/data';

export default class DataReader {

    constructor(private slug: string = '', private dir = 'data') { }

    get() {
        const dataPath = this.getDataPath();
        let content: string;
        try {
            content = fs.readFileSync(dataPath, 'utf-8');
        } catch (error) {
            throw new DataReadError(`Cannot read file, ${dataPath}. Details: ${error}`);
        }

        return content;
    }

    private getDataPath(): string {
        const workingDirectory = path.join(process.cwd(), this.dir);
        const urlData = this.parseUrl();
        if (urlData.length === 1) {
            return path.join(workingDirectory, `${urlData[0]}.md`);
        } else if (urlData.length > 1) {
            let pathJoined = workingDirectory;
            for (var i = 0; i < urlData.length; i++) {
                pathJoined = path.join(pathJoined, urlData[i]);
            }
            return path.join(pathJoined, `${urlData[urlData.length - 1]}.md`);
        } else {
            throw new DataReadError('Unkown URL length');
        }
    }

    private parseUrl(): string[] {
        if (!this.slug || this.slug.trim().length === 0) {
            throw new DataReadError('The given Slug for data reader is invalid.');
        }
        const urlPieces = this.slug.split('/');
        return urlPieces;
    }
}