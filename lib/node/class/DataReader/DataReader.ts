import fs from 'fs';
import path from 'path';
import DataReaderError from '../../error/DataReaderError';
import IData from '../../interface/IData';

export type DataReaderReturnType = string | string[];

export default class DataReader implements IData {

    constructor(private _slug: string = '', private _dir = 'data') { }

    public set slug(slug: string) {
        this._slug = slug;
    }

    public set dir(dir: string) {
        this._dir = dir;
    }

    getContent(): DataReaderReturnType {
        if (this._slug.trim() !== '*') {
            return this.getSingleFileContent();
        }

        return this.getMultipleFilesContent();
    }

    private getSingleFileContent(): string {
        const filePath = this.pathFromSlug();
        const resultContent: string = this.readFileContent(filePath);
        return resultContent;
    }

    private pathFromSlug(): string {
        const workingDirectory = this.getWorkingDirectory();
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

    private readFileContent(filePath: string) {
        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (fileReadError) {
            throw new DataReaderError(`Cannot read file, ${filePath}. Details: ${fileReadError}`);
        }
    }

    private getMultipleFilesContent(): string[] {
        const workingDirectory = this.getWorkingDirectory();
        const filesList: string[] = this.readFilesFromDirectory(workingDirectory);
        const resultContent: string[] = this.readMultipleFilesContent(filesList);

        return resultContent;
    }

    private readFilesFromDirectory(workDir: string): string[] {
        let filesInDir: string[] = [];
        try {
            filesInDir = fs.readdirSync(workDir, 'utf-8');
        } catch (readdirError) {
            throw new DataReaderError(`Cannot read directory: ${workDir}. Details: ${readdirError}`);
        }
        return filesInDir;
    }

    private readMultipleFilesContent(filesList: string[]): string[] {
        const workingDirectory = this.getWorkingDirectory();
        let filesContent: string[] = [];
        filesList.forEach( fileName => {
            const filePath = path.join(workingDirectory , fileName);
            const singleFileContent: string = this.readFileContent(filePath);
            filesContent.push(singleFileContent);
        } );

        return filesContent;
    }

    private getWorkingDirectory(): string {
        return path.join(process.cwd(), this._dir);
    }

    private parseUrl(): string[] {
        if (!this._slug || this._slug.trim().length === 0) {
            throw new DataReaderError('The given Slug for data reader is invalid.');
        }
        const urlPieces = this._slug.split('/');
        return urlPieces;
    }
}