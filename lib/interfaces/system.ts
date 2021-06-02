import { Message } from '../types/system';

export interface SystemState {
    message?: Message | null;
    loading: boolean;
    theme?: string;
}
