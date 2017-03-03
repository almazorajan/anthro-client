import { Injectable } from '@angular/core';
import { User, Result } from '../models/model';
import { ProviderService } from './provider.service';

@Injectable() export class UserService extends ProviderService {

    getAll(): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "user/getall"
        });
    }

    add(user: User): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "user/add",
            body: user
        })
    }

    update(user: User): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "user/update",
            body: user
        });
    }

    updatePassword(user: User): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "user/updatepassword",
            body: user
        });
    }

    delete(user: User): Promise<Result> {     
        return this.apiCall({
            verb: "post",
            uri: "user/delete",
            body: user
        });
    }
}