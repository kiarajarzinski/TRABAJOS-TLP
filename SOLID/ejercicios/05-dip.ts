// dip: las clases de alto nivel no deben depender de clases concretas de bajo nivel, ambas deben depender de una interfaz 

// interfaz que define el contrato de notificacion, sin importar el medio
interface Notifier {
  send(to: string, message: string): void;
}

// clase para enviar correos, implementa notifier
class EmailSender implements Notifier {
  send(to: string, message: string): void {
    console.log(`Correo para ${to}: ${message}`);
  }
}

// clase para enviar SMS, para demostrar que OrderService no depende de ninguna en particular
class SmsSender implements Notifier {
  send(to: string, message: string): void {
    console.log(`SMS para ${to}: ${message}`);
  }
}

class OrderService {
  // ya no crea el EmailSender internamente, lo recibe por constructor (inyección de dependencias)
  constructor(private notifier: Notifier) {}

  createOrder(customerContact: string): void {
    console.log("Pedido creado");
    this.notifier.send(customerContact, "Tu pedido fue creado");
  }
}

// prueba
const orderServiceEmail = new OrderService(new EmailSender());
orderServiceEmail.createOrder("ana@example.com");

const orderServiceSms = new OrderService(new SmsSender());
orderServiceSms.createOrder("+54 3705 123456");