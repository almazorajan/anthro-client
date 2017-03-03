import { Injectable } from '@angular/core';
import { User, Result } from '../models/model';
import { ProviderService } from './provider.service';

@Injectable() export class LoginService extends ProviderService {

    attemptLogin(user: User): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "login/attemptlogin",
            body: user
        });
    }
}