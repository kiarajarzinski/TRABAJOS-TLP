    //service se encarga de hacer tareas especificas, en este caso de calcular el salario final de un empleado y le pide a repository que guarde estos datos 
    
    import { EmployeeRepository } from '../repository/repository';
    export class EmployeeService {
      private employeeRepository : EmployeeRepository;
    

    constructor() {
      this.employeeRepository = new EmployeeRepository();
    }

    async createEmployee ( data: {
      name: string,
      position: string,
      baseSalary: number,
      yearsOfService: number
    }
    ) 

    {
      //el data. se añadió para acceder a las propiedades del objeto data que se pasa a createEmployee
    const bonus = data.baseSalary * 0.02 * data.yearsOfService;
    const finalSalary = data.baseSalary + bonus;

// aca se llama al metodo createEmployee del repositorio para guardar los datos del empleado en la bd, con el salario final calculado 
    const employee = await this.employeeRepository.createEmployee({
      name: data.name,
      position: data.position,
      baseSalary: data.baseSalary,
      yearsOfService: data.yearsOfService,
      finalSalary
    });
        return employee;
  }
  async getEmployees() {
    return await this.employeeRepository.getEmployees();
  }

  async getEmployeeById(id: string) {
    return await this.employeeRepository.getEmployeeById(id);
  }
}