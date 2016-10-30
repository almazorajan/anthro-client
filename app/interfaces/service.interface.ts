/*
version: 1
Service Interface
**/

// classes
import { Result } from '../models/model';

export interface iService {
    
    readonly server: string;
    readonly developmentApi: string;
    readonly productionApi: string;
    readonly forDevelopment: boolean;
    handleError(error: any): Promise<any>;
    apiCall(verb: string, uri: string, body: any): Promise<Result>
    endpoint(uri: string): string;

}