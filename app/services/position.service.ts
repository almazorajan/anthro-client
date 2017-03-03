import { Injectable } from '@angular/core';
import { Search, Position, Result } from '../models/model';
import { ProviderService } from './provider.service';

@Injectable() 
export class PositionService extends ProviderService {

    getAll(): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "position/getall"
        });
    }

    addPosition(position: Position): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "position/add",
            body: position
        });
    }

    updatePosition(position: Position): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "position/update",
            body: position
        });
    }

    deletePosition(position: Position): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "position/delete",
            body: position
        });
    }
}