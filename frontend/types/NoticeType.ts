export interface NoticeType {
    id: string;
    title: string;

    type: 'success' | 'error';

    message?: string;
    existenceTime?: number;
}
