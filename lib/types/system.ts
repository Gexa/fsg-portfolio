export type Message = {
    title?: string;
    content: string;
    closeable?: boolean;
    buttons: JSX.Element[] | null;
    backdrop?: boolean;
}
