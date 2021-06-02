export default class DataReadError extends Error {
    constructor(private readonly error:string) {
        super(`Unhandled Data Reader Error: ${error}`);
    }
}