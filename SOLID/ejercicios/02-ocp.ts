//principio abierto/cerrado, el codigo debe poder extenderse sin ser modificado 
//metodos de pago , se usa metodo pay e indicamos la cantidad a pagar
interface PaymentMethod {
  pay(amount: number): void; //void porque no devuelve nada 

  }
//aca se reliza una clase para cada tipo de pago e implementa la interfaz paymentmethod
class CardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} con tarjeta`);
  }
}

class TransferPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} con transferencia`);
  }
}

class CashPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} en efectivo`);
  }
}

class PaymentProcessor {
  // Ahora en lugar de recibir un texto (card), recibe un objeto (PaymentMethod)
  pay(method: PaymentMethod, amount: number): void {
    // llamamos al metodo de pago 
    method.pay(amount);
  }
}

//prueba 
const processor = new PaymentProcessor();

processor.pay(new CardPayment(), 10);
processor.pay(new CashPayment(), 100);
processor.pay(new TransferPayment(), 1000);