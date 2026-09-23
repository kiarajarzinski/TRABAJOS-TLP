//este archivo tiene como funcion guardar los datos dentro de una base de datos y traerlos

import Employee  from '../models/employee';

export class EmployeeRepository {
    async getEmployees() {
     //aca se crea un metodo para traer todos los empleados de la base de datos 
     return await Employee.find().sort({ createdAt: -1 });
    }

    async getEmployeeById(id: string) {
     return await Employee.findById(id);
    }

    async createEmployee(employeeData: any) {
     return await Employee.create(employeeData);
    }

}