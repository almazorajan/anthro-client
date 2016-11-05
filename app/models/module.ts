
import { iModule } from '../interfaces/module.interface';

export class Module implements iModule {

    _id: string;
    moduleName: string;
    moduleDescription: string;
    link: string;
    group: string;

    constructor(private moduleInterface?: iModule) {}

    hasRequiredFields(): boolean {

        if(this.moduleName && this.link)
            return true;

        return false;

    }

}