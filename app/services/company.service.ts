import { Injectable } from '@angular/core';
import { Company, Result } from '../models/model';
import { ProviderService } from './provider.service';

@Injectable() 
export class CompanyService extends ProviderService {

    getAll(): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "company/getall"
        });
    }

    addCompany(company: Company): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "company/add",
            body: company
        });
    }

    updateCompany(company: Company): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "company/update",
            body: company
        });
    }

    deleteCompany(company: Company): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "company/delete",
            body: company
        });
    }
}