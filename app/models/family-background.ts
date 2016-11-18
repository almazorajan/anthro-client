
import { ContactNumber, EmailAddress } from './model';

export class FamilyBackground {

    firstName: string;
    middleName: string;
    lastName: string;
    occupation: string;
    contactNumbers: ContactNumber[];
    emailAddresses: EmailAddress[];

    constructor() {

        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.occupation = "";
        this.contactNumbers = [new ContactNumber()];
        this.emailAddresses = [new EmailAddress()];

    }

    addContactNumber(): void {

        this.contactNumbers.push(new ContactNumber());

    }

    deleteContactNumber(contactNumber: ContactNumber): void {

        let index = this.contactNumbers.indexOf(contactNumber);
        this.contactNumbers.splice(index, 1);

    }

    addEmailAddress(): void {

        this.emailAddresses.push(new EmailAddress());

    }

    deleteEmailAddres(emailAddress: EmailAddress): void {

        let index = this.emailAddresses.indexOf(emailAddress);
        this.emailAddresses.splice(index, 1);

    }

}
