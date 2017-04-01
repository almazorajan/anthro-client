import { Injectable } from '@angular/core';
import { ProviderService } from './provider.service';

@Injectable() 
export class UploaderService extends ProviderService {

    // getAll(): Promise<Result> {
    //     return this.apiCall({
    //         verb: "post",
    //         uri: "upload/"
    //     });
    // }
}