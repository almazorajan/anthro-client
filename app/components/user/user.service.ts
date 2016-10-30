/*
version: 1
User Service
**/

// @angular
import { Injectable } from '@angular/core';

// user-defined models
import { Search, User, Result } from '../../models/model';

// user-defined service
import { Service } from '../../shared-services/service';

@Injectable() export class LoginService extends Service {

    addUser(user: User): Promise<Result> {

        return this.apiCall("post", "user/adduser", user);

    }

    updateUser(user: User): Promise<Result> {

        return this.apiCall("post", "user/updateuser", user);

    }

    deactiveUser(user: User): Promise<Result> {

        return this.apiCall("post", "user/deleteuser", user);

    }

}