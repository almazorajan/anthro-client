import { ContactNumber, EmailAddress } from './models';

export class Family {
    constructor() {
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.occupation = "";
        this.contactNumbers = [new ContactNumber()];
        this.emailAddresses = [new EmailAddress()];
        this.relationship = "";
    }

    firstName: string;
    middleName: string;
    lastName: string;
    occupation: string;
    contactNumbers: ContactNumber[];
    emailAddresses: EmailAddress[];
    relationship: string;
}
