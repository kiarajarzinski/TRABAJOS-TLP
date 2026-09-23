import { Router } from 'express';
import { createEmployee, getEmployees, getEmployeeById } from '../controllers/EmployeeController';

const router = Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);

export default router;