import { Injectable } from '@angular/core';
import { Module, Result } from '../../models/model';
import { Service } from '../../shared-services/services';

@Injectable() 
export class ModuleService {

    constructor(
        private service : Service
    ) { }

    getGroups() : string[] {
        return [
            "",
            "Maintenance"
        ];
    }

    getAll() : Promise<Result> {
        return this.service.apiCall({
            verb: "post",
            uri: "module/getall"
        });
    }

    addModule(_module : Module) : Promise<Result> {
        return this.service.apiCall({
            verb: "post",
            uri: "module/add",
            body: _module
        });
    }

    updateModule(_module : Module) : Promise<Result> {
        return this.service.apiCall({
            verb: "post",
            uri: "module/update",
            body: _module
        });
    }

    deleteModule(_module : Module) : Promise<Result> {
        return this.service.apiCall({
            verb: "post",
            uri: "module/delete",
            body: _module
        });
    }

}