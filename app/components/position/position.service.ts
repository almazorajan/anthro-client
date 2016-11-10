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

@Injectable() export class PositionService {

    constructor(private service: Service) {}

    getAll(): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "position/getall"
        });

    }

    addPosition(position: Position): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "position/add",
            body: position
        });

    }

    updatePosition(position: Position): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "position/update",
            body: position
        });

    }

    deletePosition(position: Position): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "position/delete",
            body: position
        });

    }

}