import fs from 'fs';
import path from 'path';
import DataReaderError from '../../error/DataReaderError';
import IData from '../../interface/IData';

export default class DataReader implements IData {

    constructor(private _slug: string = '', private _dir = 'data') { }

    set slug(slug: string) {
        this._slug = slug;
    }

    getContent() {
        const dataPath = this.getDataPath();
        let content: string;
        try {
            content = fs.readFileSync(dataPath, 'utf-8');
        } catch (error) {
            throw new DataReaderError(`Cannot read file, ${dataPath}. Details: ${error}`);
        }

        return content;
    }

    private getDataPath(): string {
        const workingDirectory = path.join(process.cwd(), this._dir);
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
            throw new DataReaderError('Unkown URL length');
        }
    }

    private parseUrl(): string[] {
        if (!this._slug || this._slug.trim().length === 0) {
            throw new DataReaderError('The given Slug for data reader is invalid.');
        }
        const urlPieces = this._slug.split('/');
        return urlPieces;
    }
}