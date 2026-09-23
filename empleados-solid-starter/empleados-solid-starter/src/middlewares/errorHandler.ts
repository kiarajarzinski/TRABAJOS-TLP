//errorhandler es para capturar cualquier error que ocurra en la aplicacion y comunicarlo de manera adecuada al cliente, sin necesidad de hacerlo en cada controlador

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error en la solicitud:', err.message);
    return res.status(500).json({ message: 'Error interno del servidor' });

};