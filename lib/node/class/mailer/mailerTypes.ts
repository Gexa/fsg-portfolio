/* only needed by MailOptions */
type MailAttachment = {
    filename: string;
    content?: any;
    path?: string;
    encoding?: string;
    contentType?: string;
    href?: URL;
    httpHeaders?: object; // eg { authorization: "bearer ..."}
    contentDisposition?: string; // eg. attachment
    cid?: any; // optional content id
    headers?: string;
    raw?: any;
};

/* Exports */
export type SMTPOptions = {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    },
    tls?: object;
};

export type MailTemplate = {
    name: string;
    directory: string;
};

export type MailRecipient = {
    to: string[];
    cc?: string[];
    bcc?: string[];
}

export type MailOptions = {
    subject?: string;
    attachments?: MailAttachment[];
};
