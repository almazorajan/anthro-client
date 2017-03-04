export class Modal {

    constructor(id: string) {
        this.id = id;
    }    

    private _id: string;

    set id(value) {
        this._id = value;
    }

    get id() {
        return this._id.replace("#", "");
    }

    show(): void {
        $(this._id).modal("show");
    }

    hide(): void {
        $(this._id).modal("hide");     
    }
}