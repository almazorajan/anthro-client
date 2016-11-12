/*
version: 1
User Service
**/

// @angular
import { Injectable } from '@angular/core';

// user-defined models
import { User, Result } from '../../models/model';

// user-defined service
import { Service } from '../../shared-services/service';

@Injectable() export class UserService {

    constructor(private service: Service) {}

    getAll(): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "user/getall"
        });

    }

    add(user: User): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "user/add",
            body: user
        })

    }

    update(user: User): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "user/update",
            body: user
        });

    }

    delete(user: User): Promise<Result> {
        
        return this.service.apiCall({
            verb: "post",
            uri: "user/delete",
            body: user
        });

    }

}