//este archivo tiene como funcion guardar los datos dentro de una base de datos y traerlos

import Employee  from '../models/employee';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());



const PORT = Number(process.env.PORT ?? 3000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/employees_db';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a MongoDB', error);
    process.exit(1);
  });



export class EmployeeRepository {
    async getEmployees() {
     //aca se crea un metodo para traer todos los empleados de la base de datos 
     return await Employee.find().sort({ createdAt: -1 });
    }

    async getEmployeeById(id: string) {
     return await Employee.findById(id);
    }

    async createEmployee(EmployeeData: any) {
     return await Employee.create(EmployeeData);
    }

}