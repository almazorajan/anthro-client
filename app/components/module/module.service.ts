import { Injectable } from '@angular/core';

import { Module, Result } from '../../models/model';

import { Service } from '../../shared-services/services';


@Injectable() export class ModuleService extends Service {

    getGroups(): string[] {

        return [
            "Maintenance"
        ];

    }

    addModule(_module: Module): Promise<Result> {

        return this.apiCall("post", "module/addmodule", _module);

    }

    updateModule(_module: Module): Promise<Result> {

        return this.apiCall("post", "module/updatemodule", _module);

    }

    deleteModule(_module: Module): Promise<Result> {

        return this.apiCall("post", "module/deletemodule", _module);

    }

}