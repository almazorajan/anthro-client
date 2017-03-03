
export interface iSwal {
    title: string;
    message: string;
    callBack(isConfirm: boolean): void;
    confirmButtonText?: string;
}