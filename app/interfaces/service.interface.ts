import { Result } from '../models/models';
import { iApiCall } from './api-call.interface';

export interface iService {    
    handleError(error: any): Promise<any>;
    apiCall(request: iApiCall): Promise<Result>
    endpoint(apiEndPoint: string, uri: string): string;
}