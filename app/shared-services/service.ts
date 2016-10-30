/*
version: 1
'Blueprint' Service
**/

// @angular
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// interface
import { iService } from '../interfaces/service.interface';

// classes
import { Result } from '../models/model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class Service implements iService {

    readonly forDevelopment: boolean;
    readonly server: string;
    readonly developmentApi: string;
    readonly productionApi: string;
    
    constructor(private http: Http) {

        this.forDevelopment = true;
        this.developmentApi = "http://localhost/optimus";
        this.productionApi = "https://127.0.0.1/optimus"

        if(this.forDevelopment)
            this.server = this.developmentApi;
        else
            this.server = this.productionApi;
        
    }

    endpoint(uri: string): string {

        return `${this.server}${uri}`;

    }

    handleError(error: any): Promise<any> {
        
        return Promise.reject(error.message || error);
    
    }

    apiCall(verb: string, uri: string, body: any): Promise<Result> {

        return this.http[verb](this.endpoint(uri), body)
            .toPromise()
            .then(response => response.json() as Result)
            .catch(this.handleError);


    }

}