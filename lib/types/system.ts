export type Message = {
    title?: string;
    content: string;
    closeable?: boolean;
    buttons: any[] | null;
    onClose?: Function;
    backdrop?: boolean;
}
