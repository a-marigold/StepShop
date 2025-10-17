export interface NoticeType {
    title: string;

    message?: string;
    existenceTime: number;
    showNotice: boolean;
    setShowNotice: (showNotice: boolean) => void;
}
