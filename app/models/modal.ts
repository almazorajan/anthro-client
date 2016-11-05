
export class Modal {

    id: string;

    constructor(id: string) {

        this.id = id;

    }

    show(): void {

        $(this.id).modal("show");

    }

    hide(): void {

        $(this.id).modal("hide");
        
    }

}