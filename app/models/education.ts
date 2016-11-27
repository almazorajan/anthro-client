
export class Education {
    educationalLevel: string;
    degree: string;
    dateGraduated: Date;

    constructor() {
        this.educationalLevel = "";
        this.degree = "";
        this.dateGraduated = new Date();
    }
}