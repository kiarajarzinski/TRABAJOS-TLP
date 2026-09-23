import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/EmployeeService';

const employeeService = new EmployeeService();

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, position, baseSalary, yearsOfService } = req.body;

    if (!name || !position) {
      return res.status(400).json({ message: 'Nombre y puesto son obligatorios' });
    }

    if (typeof baseSalary !== 'number' || baseSalary <= 0) {
      return res.status(400).json({ message: 'El salario base debe ser mayor a 0' });
    }

    if (
      typeof yearsOfService !== 'number' ||
      yearsOfService < 0 ||
      !Number.isInteger(yearsOfService)
    ) {
      return res.status(400).json({ message: 'La antigüedad debe ser un entero mayor o igual a 0' });
    }

    //cambio: se crea una instancia de EmployeeService y se llama al metodo createEmployee para crear un nuevo empleado con los datos recibidos en la solicitud
    const employee = await employeeService.createEmployee({ name, position, baseSalary, yearsOfService });

    console.log(`Empleado creado: ${employee.name} - salario final: ${employee.finalSalary}`);
    return res.status(201).json(employee);
 // } catch (error) {
  //  console.error(error);
 //   return res.status(500).json({ message: 'Error interno del servidor' });
 //aca, en vez de devolver un error 500, se llama a la funcion next para pasar el error al middleware de manejo de errores
   } catch (error) {
    next(error);
  }
};


  //try {
  //  const employees = await Employee.find().sort({ createdAt: -1 });
  //  return res.json(employees);
  //} catch (error) {
   // console.error(error);
   // return res.status(500).json({ message: 'Error interno del servidor' });
  //}

export const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //aca se llama al metodo getEmployees del service 
    const employees = await employeeService.getEmployees();
    return res.json(employees);
  } catch (error) {
    next(error);
  }
};


//  try {
 //   const employee = await Employee.findById(req.params.id);

  //  if (!employee) {
  //    return res.status(404).json({ message: 'Empleado no encontrado' });
  //  }

  //  return res.json(employee);
 // } catch (error) {
  //  console.error(error);
 //   return res.status(500).json({ message: 'Error interno del servidor' });

 //añadi el id:string por un error que me salia en req.params.id ya q no identificaba el tipo de dato
export const getEmployeeById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    return res.json(employee);
  } catch (error) {
    next(error);
  }
};