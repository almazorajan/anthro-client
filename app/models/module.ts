
import { iModule } from '../interfaces/module.interface';

export class Module implements iModule {

    _id: string;
    selected: boolean;
    moduleName: string;
    moduleDescription: string;
    link: string;
    group: string;

}