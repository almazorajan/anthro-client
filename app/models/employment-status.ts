
export class EmploymentStatus {

    constructor() {
        this._id = "";
        this.employmentStatus = "";
    }

    _id: string;
    employmentStatus: string;
    
    disabled: boolean;
    editMode: boolean;
    originalInfo: EmploymentStatus;
}