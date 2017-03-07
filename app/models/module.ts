import { iModule } from '../interfaces/interfaces';

export class Module implements iModule {

    constructor() {
        this._id = "";
        this.moduleName = "";
        this.moduleDescription = "";
        this.link = "";
        this.group = "";
    }

    _id: string;
    moduleName: string;
    moduleDescription: string;
    link: string;
    group: string;

    selected: boolean;
    disabled: boolean;
}