
import { 
    EmploymentStatus, 
    Address, 
    EducationHistory, 
    Accreditation, 
    WorkHistory, 
    FamilyBackground,
    Position,
    ContactNumber 
} from './model';

export class Employee {

    _id: string;
    image: string;
    employeeNumber: string;
    startingDate: Date;
    salary: number;

    position: Position;
    employmentStatus: EmploymentStatus;

    firstName: string;
    middleName: string;
    lastName: string;

    birthDate: Date;
    age: number;
    birthPlace: string;

    phoneNumbers: ContactNumber[];
    landlines: ContactNumber[];
    maritalStatus: string;
    gender: string;
    citizenship: string;

    cityAddress: Address;
    provincialAddress: Address;
    permanentAddress: Address;

    ssNumber: string;
    tinNumber: string;
    philHealthNumber: string;
    pagibigNumber: string;

    educationHistory: EducationHistory[];

    certifications: Accreditation[];
    licensures: Accreditation[];

    workHistory: WorkHistory[];

    fathersInfo: FamilyBackground;
    mothersInfo: FamilyBackground;
    spouseInfo: FamilyBackground;
    childrenInfo: FamilyBackground[];
    siblingsInfo: FamilyBackground[];

    constructor() {

        this.employeeNumber = "";
        this.startingDate = new Date();
        this.salary = 0;

        this.position = new Position();
        this.position._id = "";
        this.position.positionName = "";

        this.firstName = "";
        this.middleName = "";
        this.lastName = "";

        this.birthDate = new Date();
        this.age = 0;
        this.birthPlace = "";

        this.phoneNumbers = [new ContactNumber()];
        this.landlines = [new ContactNumber()];
        this.maritalStatus = "Single";
        this.gender = "";
        this.citizenship = "";

        this.cityAddress = new Address();
        this.provincialAddress = new Address();
        this.permanentAddress = new Address();

        this.ssNumber = "";
        this.tinNumber = "";
        this.philHealthNumber = "";
        this.pagibigNumber = "";

        this.educationHistory = [new EducationHistory()];
        
        this.certifications = [new Accreditation()];
        this.licensures = [new Accreditation()];

        this.workHistory = [new WorkHistory()];

        this.fathersInfo = new FamilyBackground();
        this.mothersInfo = new FamilyBackground();
        this.spouseInfo = new FamilyBackground();
        this.childrenInfo = [new FamilyBackground()];
        this.childrenInfo = [new FamilyBackground()];

    }

    addPhoneNumber(): void {

        this.phoneNumbers.push(new ContactNumber());

    }

    deletePhoneNumber(phoneNumber: ContactNumber): void {

        let index = this.phoneNumbers.indexOf(phoneNumber);
        this.phoneNumbers.splice(index, 1);

    }

    addLandline(): void {

        this.landlines.push(new ContactNumber());
        
    }

    deleteLandline(contactNumber: ContactNumber): void {

        let index = this.landlines.indexOf(contactNumber);
        this.landlines.splice(index, 1);

    }

    addEducationHistory(): void {

        this.educationHistory.push(new EducationHistory());

    }

    deleteEducationHistory(educationHistory: EducationHistory): void {

        let index = this.educationHistory.indexOf(educationHistory);
        console.log("index", index);
        this.educationHistory.splice(index, 1);

    }

    addCertifications(accreditation: Accreditation): void {

        this.certifications.push(accreditation);
        
    }

    deleteCertification(accreditation: Accreditation): void {

        let index = this.certifications.indexOf(accreditation);
        this.certifications.splice(index, 1);

    }

    addLicensure(accreditation: Accreditation): void {

        this.licensures.push(accreditation);

    }

    deleteLicensure(accreditation: Accreditation): void {

        let index = this.licensures.indexOf(accreditation);
        this.licensures.splice(index, 1);

    }

    addWorkHistory(workHistory: WorkHistory): void {

        this.workHistory.push(workHistory);

    }

    deleteWorkHistory(workHistory: WorkHistory): void {

        let index = this.workHistory.indexOf(workHistory);
        this.workHistory.splice(index, 1);

    }

    addChildrenInfo(familyBackground: FamilyBackground): void {

        this.childrenInfo.push(familyBackground);

    }

    deleteChildrenInfo(familyBackground: FamilyBackground): void {

        let index = this.childrenInfo.indexOf(familyBackground);
        this.childrenInfo.splice(index, 1);

    }

    addSiblingsInfo(familyBackground: FamilyBackground): void {

        this.siblingsInfo.push(familyBackground);

    }

    deleteSiblingsInfo(familyBackground: FamilyBackground): void {

        let index = this.siblingsInfo.indexOf(familyBackground);
        this.siblingsInfo.splice(index, 1);

    }

    hasPermanentAddress(): boolean {

        if(this.cityAddress.isPermanent) {
            
            this.permanentAddress = this.cityAddress;
            return true;

        }

        if(this.provincialAddress.isPermanent) {

            this.permanentAddress = this.provincialAddress;
            return true;
            
        }

        return false;

    }

};