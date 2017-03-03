import { Result } from '../models/models';
import { iApiCall } from './api-call.interface';

export interface iService {    
    readonly server: string;
    readonly developmentApi: string;
    readonly productionApi: string;
    readonly forDevelopment: boolean;
    handleError(error: any): Promise<any>;
    apiCall(request: iApiCall): Promise<Result>
    endpoint(uri: string): string;
}