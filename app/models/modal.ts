export class Modal {

    constructor(id: string) {
        this.id = id;
    }    

    id: string;

    show(): void {
        $(this.id).modal("show");
    }

    hide(): void {
        $(this.id).modal("hide");     
    }
}