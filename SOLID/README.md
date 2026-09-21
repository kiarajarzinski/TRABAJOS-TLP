## 1. SRP — Single Responsibility Principle

- **¿Qué responsabilidades tiene `UserManager`?**
  Tiene 4 responsabilidades :validar el correo del usuario, guardar el usuario, enviar el correo de bienvenida y coordinar todo el flujo de registro.

- **¿Qué ocurre si cambia la forma de guardar datos?**
  Si cambia cómo se guardan los datos obligaría a modificar una clase que tiene las mismas responsabilidades, con riesgo de romper otras funcionalidades. 

- **¿Qué clase podría encargarse de enviar correos?**
  EmailService.

## 2. OCP — Open/Closed Principle

- **¿Qué parte debe modificarse para agregar pago con transferencia?**
 Solo se agrega la nueva clase TransferPayment que implementa PaymentMethod.

- **¿Cómo podríamos representar un medio de pago?**
  Con la interfaz común: PaymentMethod.

- **¿Qué comportamiento común tienen todos los medios de pago?**
  Todos saben pagar un monto con 'pay'.


## 3. LSP — Liskov Substitution Principle

- **¿Por qué el área final no coincide con lo que espera `resizeRectangle`?**
  Porque resizeRectangle piensa que al cambiar el ancho y el alto de forma independiente, el área resultante es nuevoAncho * nuevoAlto. En Square, cambiar uno de los dos lados fuerza también el cambio del otro (para mantenerse cuadrado).

- **¿Es siempre correcto modelar un cuadrado como un rectángulo por herencia?**
  No, la herencia implica que la subclase debe poder sustituir a la clase base sin alterar el comportamiento esperado por quien la usa. 

- **¿Qué abstracción común podríamos usar?**
  Una interfaz Shape con el método area(), sin relación de herencia entre Rectangle y Square.


## 4. ISP — Interface Segregation Principle

- **¿Qué método no necesita `SimplePrinter`?**
  No necesita ni scan ni fax, solo necesita print. 

- **¿Qué problema causa implementar métodos que lanzan errores?**
  Habrá problemas en tiempo de ejecución y obliga a una clase a cargar con métodos que no le corresponden, generando acoplamiento innecesario.

- **¿Cómo separar las capacidades de una impresora?**
  Dividiendo la interfaz grande en interfaces chicas y específicas y que cada clase implemente solo las interfaces correspondientes a lo que realmente puede hacer.

## 5. DIP — Dependency Inversion Principle

- **¿Qué dependencia concreta crea `OrderService`?**
  Crea new EmailSender() directamente dentro de createOrder.

- **¿Cómo probarías la clase sin enviar un correo real?**
  Creando una implementación de prueba que cumpla la interfaz Notifier y pasándola por el constructor de OrderService.

- **¿Qué contrato común podrían implementar el correo y el SMS?**
  La interfaz Notifier con el método send().
