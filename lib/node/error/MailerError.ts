export default class MailerError extends Error {
    constructor(private readonly error:string) {
        super(`Unhandled Mailer Error: ${error}`);
    }
}