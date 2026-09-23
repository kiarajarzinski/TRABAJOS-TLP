import mongoose, { Schema, model } from 'mongoose';
import { EmployeeInterface } from '../interface/employee';

const employeeSchema = new Schema<EmployeeInterface>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    yearsOfService: { type: Number, required: true },
    finalSalary: { type: Number, required: true }
  },
  { timestamps: true }
);



const Employee = model<EmployeeInterface>('Employee', employeeSchema);

//exportamos el modelo

export default Employee;