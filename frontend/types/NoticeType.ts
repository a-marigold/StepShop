export interface NoticeType {
    id: string;

    title: string;

    message?: string;
    existenceTime: number;
    deleteNotice: <T>(...args: T[]) => void;
}
