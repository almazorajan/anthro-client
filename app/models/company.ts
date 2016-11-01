
import { Address, ContactNumber, EmailAddress } from './model';

export class Company {

    _id: string;
    companyName: string;
    companyAddress: Address;
    contactNumbers: ContactNumber[];
    emailAddresses: EmailAddress[]

    constructor() {

        this._id = "";
        this.companyName = "";
        this.companyAddress = new Address();
        this.contactNumbers = [new ContactNumber()];
        this.emailAddresses = [new EmailAddress()];


    }

};