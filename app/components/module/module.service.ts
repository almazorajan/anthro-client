import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Module, Result } from '../../models/model';

import { Service } from '../../shared-services/services';

import 'rxjs/add/operator/toPromise';

@Injectable() export class ModuleService {

    constructor(private service: Service) {}

    getGroups(): string[] {

        return [
            "Maintenance"
        ];

    }

    getAll(): Promise<Result> {

        return this.service.apiCall("post", "module/getall");

    }

    addModule(_module: Module): Promise<Result> {

        return this.service.apiCall("post", "module/add", _module);

    }

    updateModule(_module: Module): Promise<Result> {

        return this.service.apiCall("post", "module/update", _module);

    }

    deleteModule(_module: Module): Promise<Result> {

        return this.service.apiCall("post", "module/remove", _module);

    }

}