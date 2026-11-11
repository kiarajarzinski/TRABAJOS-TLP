# Laboratorio introductorio: testing en Express y TypeScript

 1. El archivo que contiene la prueba de cálculo es `precios.ts`, el que define la ruta HTTP es `server.ts`, sus responsabilidades se diferencias en que `precios.ts` contiene la lógica para calcular el precio final aplicando un descuento, en cambio `server.ts` tiene la responsabilidad de asignar un puerto en el que se puedan recibir peticiones HTTP, en este caso el 3000.

 2. El comportamineto que exige `calcularPrecioFinal(1000, 150)` es el de rechazar descuentos superiores al 100%, lo que realmente está haciendo es solo hacer un cálculo sin rechazar los descuentos superiores.

 3. Nos da un valor negativo de `-500`, no cumple con la regla de negocio porque es un valor negativo, falla porque esperaba que la función lanzara un RangeError.

 4. Sí, `Number.isFinite(NaN)` devuelve `false`, por lo tanto se lanza un `RangeError`.

 5. Porque prueba la colaboración entre varias partes: Supertest, Express, la ruta HTTP de `app.ts` y el servicio `precios.ts`. 

 6. `npm run typecheck` detecta errores de tipos y problemas estáticos de TypeScript. `npm test` verifica que la aplicación tenga el comportamiento esperado al ejecutarse. 

 7. La comprobación manual se realiza una vez y depende de que una persona observe el resultado. Una prueba automatizada se ejecuta muchas veces y verifica automáticamente si el resultado coincide con lo esperado.

 8. La función no validaba que el descuento estuviera entre 0 % y 100 %. Por eso calculaba `-500` en lugar de lanzar un `RangeError`.

 9. Porque permite comprobar que el programa rechaza entradas incorrectas y respeta las reglas de negocio.

10. `precios.test.ts`: comprueba unitariamente la función `calcularPrecioFinal`.

    `api.test.ts`: comprueba la API HTTP, sus rutas, respuestas y códigos de estado.

11. Permite detectar rápidamente errores nuevos, confirmar que la modificación funciona y verificar que no se rompieron comportamientos anteriores.