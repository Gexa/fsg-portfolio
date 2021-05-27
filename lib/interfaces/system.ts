import { Message } from '../types/system';

export interface SystemState {
    message: Message;
    loading: boolean;
    theme?: string;
}
