/**
 * @author Gergő Boldogh
 * @copyright Gexa'Software 2021
*/
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import MailerError from '../../error/MailerError';

const { htmlToText } = require('html-to-text');

import { MailTemplate, MailRecipient, MailOptions, SMTPOptions } from './mailerTypes';

class Mailer<T> {

    private mailTransporter = null;
    private mailContent: string = null;

    private SMTPOptions:SMTPOptions = {
        host: process.env.smtp_host,
        port: +process.env.smtp_port,
        secure: (+process.env.smtp_port !== 465 ? false : true),
        auth: {
            user: process.env.smtp_user,
            pass: process.env.smtp_pass
        }
    };

    private isTLS(): boolean {
        return (process.env.smtp_secure.toLocaleLowerCase() === 'tls');
    }

    public constructor() {
        try {
            const tlsOptions = this.isTLS() ? { tls: { rejectUnauthorized: false } } : {};
            const transportOptions = { ...this.SMTPOptions, ...tlsOptions };
            this.mailTransporter = nodemailer.createTransport(transportOptions);

        } catch (error) {
            this.Error('Cannot connect to SMTP server: ' + error);
        }
    }

    private Error(errorMessage?: string): never {
        throw new MailerError(errorMessage);
    }

    private isContentValid(content?: object | string): boolean {
        const contentToValidate = !content ? this.mailContent : content
        switch (typeof contentToValidate) {
            case 'string':
            default:
                return contentToValidate && contentToValidate.trim().length > 0;
            case 'object':
                return Object.keys(contentToValidate).length > 0;
        }
    }

    private isContentType(content: string | object, type:string = 'object'): boolean {
        return typeof content === type;
    }
    /**
     * @public function to set the contents of a mail based on a Mail template or simply from a string
     * @param  {object|string} content if not an object, creates mail body from given string
     * @param  {MailTemplate} template object with name and directory, see @type MailTemplate
     */
    public setMailContent(content: object | string, template: null | MailTemplate) {
        if (!this.isContentValid(content)) {
            this.Error('Invalid Mail Content.');
        }

        if (this.isContentType(content, 'object')) {
            let templateString;
            try {
                templateString = this.getTemplate(template);
            } catch (error) {
                templateString = this.getTemplateFromObject(content);
            }

            for (var key in (content as object)) {
                const contentReplace = content[key];
                const keyToReplace = `{{${key.toUpperCase()}}}`;
                if (templateString.length)
                    templateString = templateString.replace(new RegExp(keyToReplace, 'g'), contentReplace);
            }

            this.mailContent = templateString;

        } else {
            this.mailContent = content as string;
        }
    }

    /**
     * @function private method to get template file's content from file system
     * @param  {object: { name: string; directory: string }}
     */
     private getTemplate(templateObject: { name: string; directory: string}) {
        if (!this.isTemplateExists(templateObject)) {
            this.Error('Trying to access a non-existing mail template.');
        }

        const templatePath = this.getTemplatePath(templateObject);

        const templateContent = fs.readFileSync(templatePath, 'utf-8');
        return templateContent;
    }

    private getTemplateFromObject(content: any | object): string {
        return Object.keys(content).map(
                key =>  `{{${key.toUpperCase()}}}`
            ).join('<br />');
    }

    private isTemplateExists(templateObject: { name: string; directory: string}): boolean {
        const templatePath = this.getTemplatePath(templateObject);
        const isTemplateExists = fs.existsSync(templatePath);
        return isTemplateExists;
    }

    private getTemplatePath(templateObject: { name: string; directory: string }): string {
        return path.join(process.cwd(), templateObject.directory) + templateObject.name
    }

    private isRecipientValid(recipients: MailRecipient): boolean {
        return recipients && recipients.to && recipients.to.length > 0;
    }

    private getSenderAddress(): string {
        return (`"${process.env.owner_name}" <${process.env.owner_email}>`);
    }

    /**
     * @public (async) send function to send e-mail with the pre-defined content by setContent()
     * @param  {MailRecipient} recipients object, see @type MailRecipent
     * @param  {MailOptions} options object, see @type MailOptions
     */
    async send(recipients: MailRecipient, options: MailOptions = {}) {
        if (!this.isContentValid()) {
            this.Error('Failed to Send e-mail. No Mail Body defined via setContent().');
        }

        if (!this.isRecipientValid(recipients)) {
            this.Error('Failed to Send e-mail. No Recipients defined.');
        }

        const recipientAddresses: string = recipients.to.join(', ');
        const ccAddresses: string = recipients.cc && recipients.cc.length ? recipients.cc.join(', ') : '';
        const bccAddresses: string = recipients.bcc && recipients.bcc.length ? recipients.bcc.join(', ') : '';
        const mailSubject = (options.subject ? options.subject : 'No subject');

        let messageTransportInfo;
        try {

            messageTransportInfo =
                await this.mailTransporter.sendMail({
                    from: this.getSenderAddress(),
                    to: recipientAddresses,
                    cc: ccAddresses,
                    bcc: bccAddresses,
                    subject: mailSubject,
                    text: htmlToText(this.mailContent, {}),
                    html: this.mailContent,
                });

        } catch (error) {
            messageTransportInfo = { message: 'Failed to send e-mail', error: error };
        }

        return messageTransportInfo;
    }
}

export default Mailer;