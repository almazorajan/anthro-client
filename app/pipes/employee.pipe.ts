import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/models';

@Pipe({
    name: 'employeeFilter'
})

export class EmployeeFilter implements PipeTransform {

    transform(users: Employee[], keyword: string): Employee[] {
        
        return users.filter(item => 
            item.employeeNumber.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            || item.firstName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            || item.middleName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            || item.lastName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            || item.position.positionName.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
    }
}