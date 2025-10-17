export interface NoticeType {
    id: string;

    title: string;

    message?: string;
    existenceTime: number;
    showNotice: boolean;
    setShowNotice: (showNotice: boolean) => void;
}
