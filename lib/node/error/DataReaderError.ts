export default class DataReaderError extends Error {
    constructor(protected readonly error:string) {
        super(`Uncaught Data Reader Error: ${error}`);
    }
}