
import { iModule } from '../interfaces/module.interface';

export class Module implements iModule {

    _id: string;
    moduleName: string;
    moduleDescription: string;
    link: string;
    group: string;

    selected: boolean;
    disabled: boolean;

}