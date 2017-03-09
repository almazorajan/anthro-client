import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { iService, iApiCall } from '../interfaces/interfaces';
import { LocalStorageService } from './local-storage.service';
import { Result, Session } from '../models/models';
import 'rxjs/add/operator/toPromise';

class AppConfig {
    api: string;
}

@Injectable()
export class ProviderService implements iService {

    constructor(
        private http: Http,
        private localStorage: LocalStorageService
    ) { }

    private getApiEndPoint(): Promise<AppConfig> {
        return this.http["post"]("/config", {}, new RequestOptions())
            .toPromise()
            .then(response => response.json() as AppConfig)
            .catch(this.handleError);
    }

    endpoint(apiEndPoint: string, uri: string): string {
        let endpoint = `${apiEndPoint}${uri}`;
        return endpoint;
    }

    handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    apiCall(request: iApiCall): Promise<Result> {
        let session = this.localStorage.get<Session>("anthro.user-session");
        let payload = {
            data: request.body,
            auth: {}
        };

        return this.getApiEndPoint().then((config) => {
            if (session) {
                let headers = new Headers();
                headers.append("x-access-token", session.token);

                return this.http[request.verb](this.endpoint(config.api, request.uri), payload, new RequestOptions({ headers: headers }))
                    .toPromise()
                    .then(response => response.json() as Result)
                    .catch(this.handleError);
            } else {
                return this.http[request.verb](this.endpoint(config.api, request.uri), payload)
                    .toPromise()
                    .then(response => response.json() as Result)
                    .catch(this.handleError);
            }
        });
    }
}