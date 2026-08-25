class CuentaBancaria {
    //readonly hace que a la variable se le pueda asignar el valor solo una vez
    readonly titular: string;
    private saldo: number;
    private historial: string[];

    constructor(titular: string, saldoInicial: number) {
        this.titular = titular;
        this.saldo = saldoInicial;
        this.historial = [`Saldo inicial: +${saldoInicial}`];
    }

    depositar(monto: number): void {
        if (monto <= 0) {
            throw new Error("El monto que se deposita tiene que ser mayor a 0");
        }
        this.saldo += monto;
        this.historial.push(`Depósito: +${monto}`);
    }

    retirar(monto: number): void {
        if (monto <= 0) {
            throw new Error("El monto que se retira tiene que ser mayor a 0");
        }
        if (monto > this.saldo) {
            throw new Error("Saldo insuficiente");
        }
        this.saldo -= monto;
        this.historial.push(`Retiro: -${monto}`);
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    obtenerHistorial(): string[] {
        // hacemos una copia del arreglo para que nadie pueda modificar el historial original 
        return [...this.historial];
    }
}

// prueba
console.log("--- PRUEBA EJERCICIO 2 ---");
const cuenta = new CuentaBancaria("Itzel", 8000);
cuenta.depositar(5000);
cuenta.retirar(4500);

console.log(`Saldo actual de ${cuenta.titular}: $${cuenta.consultarSaldo()}`);

const miHistorial = cuenta.obtenerHistorial();
miHistorial.push("Hackeo: +1000000"); 

console.log("Historial original de la cuenta:", cuenta.obtenerHistorial());