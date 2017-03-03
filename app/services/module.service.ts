import { Injectable } from '@angular/core';
import { Module, Result } from '../models/models';
import { ProviderService } from './provider.service';

@Injectable() 
export class ModuleService extends ProviderService {

    getGroups(): string[] {
        return [
            "",
            "Maintenance"
        ];
    }

    getAll(): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "module/getall"
        });
    }

    addModule(mod: Module): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "module/add",
            body: mod
        });
    }

    updateModule(mod: Module): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "module/update",
            body: mod
        });
    }

    deleteModule(mod: Module): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "module/delete",
            body: mod
        });
    }
}