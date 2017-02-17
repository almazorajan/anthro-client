/*
version: 1
Login Service
**/

// @angular
import { Injectable } from '@angular/core';
import { User, Result } from '../../models/model';
import { Service } from '../../shared-services/service';

@Injectable() export class LoginService {

    constructor(private service: Service) { }

    attemptLogin(user: User): Promise<Result> {
        return this.service.apiCall({
            verb: "post",
            uri: "login/attemptlogin",
            body: user
        });
    }
}