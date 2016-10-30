/*
version: 1
Position Service
**/

// @angular
import { Injectable } from '@angular/core';

// user-defined models
import { Search, Position, Result } from '../../models/model';

// user-defined service
import { Service } from '../../shared-services/service';

@Injectable() export class LoginService extends Service {

    addPosition(position: Position): Promise<Result> {

        return this.apiCall("post", "position/addposition", position);

    }

    updatePosition(position: Position): Promise<Result> {

        return this.apiCall("post", "position/updateposition", position);

    }

    deactivatePosition(position: Position): Promise<Result> {

        return this.apiCall("post", "position/deleteposition", position);

    }

}