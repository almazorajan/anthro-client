
import { Position } from './models';

export class User {

    constructor() {
        this.userName = "";
        this.firstName = "";
        this.middleName = "";
        this.lastName  = "";
        this.password = "";
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        this.position = new Position();
    }

    _id: string;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    password: string;
    dateCreated: Date;
    dateUpdated: Date;
    position: Position;
    dateDeactivated: Date;
}
