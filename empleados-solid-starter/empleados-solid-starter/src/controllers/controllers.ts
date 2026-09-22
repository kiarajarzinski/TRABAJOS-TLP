import { Request, Response } from 'express';
import Employee from '../models/employee';
import service from 'services/service';


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


    console.log(`Empleado creado: ${employee.name} - salario final: ${employee.finalSalary}`);
    return res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }


  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    return res.json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }


  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    return res.json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
