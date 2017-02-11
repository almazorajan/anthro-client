import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from '../models/model';

@Pipe({
    name: 'employeeFilter'
})

export class EmployeeFilter implements PipeTransform {

    transform(users: Employee[], keyword: string): Employee[] {
        
        return users.filter(item => 
            item.employeeNumber.indexOf(keyword.toLowerCase()) > -1
            || item.firstName.indexOf(keyword.toLowerCase()) > -1
            || item.middleName.indexOf(keyword.toLowerCase()) > -1
            || item.lastName.indexOf(keyword.toLowerCase()) > -1
            || item.position.positionName.indexOf(keyword.toLowerCase()) > -1);
    
    }

}