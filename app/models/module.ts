import { iModule } from '../interfaces/interfaces';

export class Module implements iModule {

    _id: string;
    moduleName: string;
    moduleDescription: string;
    link: string;
    group: string;

    selected: boolean;
    disabled: boolean;
}