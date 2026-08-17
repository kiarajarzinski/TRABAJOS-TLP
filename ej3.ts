export class Empleado {
    protected nombre: string;
    protected antiguedad: number;

    constructor(nombre: string, antiguedad: number) {
        this.nombre = nombre;
        this.antiguedad = antiguedad;
    }

    calcularSueldo(): number {
        return 0; 
    }

    describir(): string {
        return `${this.nombre} (${this.antiguedad} años) — sueldo: $${this.calcularSueldo()}`;
    }
}

export class EmpleadoFijo extends Empleado {
    private sueldoBase: number;

    constructor(nombre: string, antiguedad: number, sueldoBase: number) {
        super(nombre, antiguedad);
        this.sueldoBase = sueldoBase;
    }

    calcularSueldo(): number {
        const bono = this.sueldoBase * 0.02 * this.antiguedad;
        return this.sueldoBase + bono;
    }
}

// prueba
console.log("--- PRUEBA EJERCICIO 3 ---");
const empleado = new Empleado("Juan", 2, );
const empleadoFijo = new EmpleadoFijo("Kiara", 6, 200000);

console.log(empleado.describir());
console.log(empleadoFijo.describir());