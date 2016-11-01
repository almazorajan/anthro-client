
import { Position } from './model';

export class User {

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

    constructor() {

        this._id = "";
        this.userName = "";
        this.firstName = "";
        this.middleName = "";
        this.lastName  = "";
        this.password = "";
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        this.position = new Position();
        this.dateDeactivated = new Date();

    }

}
