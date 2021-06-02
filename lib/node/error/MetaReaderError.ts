export default class MetaReaderError extends Error {
    constructor(protected readonly error:string) {
        super(`Uncaught Meta Reader Error: ${error}`);
    }
}