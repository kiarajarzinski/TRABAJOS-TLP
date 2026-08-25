class Empleado {
    protected nombre: string;
    protected antiguedad: number;
    constructor(nombre: string, antiguedad: number) 
    { this.nombre = nombre; this.antiguedad = antiguedad; }
    calcularSueldo(): number { return 0; }
    describir(): string { return `${this.nombre} (${this.antiguedad} años) — sueldo: $${this.calcularSueldo()}`; }
}

class EmpleadoFijo extends Empleado {
    private sueldoBase: number;
    constructor(nombre: string, antiguedad: number, sueldoBase: number) { super(nombre, antiguedad); this.sueldoBase = sueldoBase; }
    calcularSueldo(): number { return this.sueldoBase + (this.sueldoBase * 0.02 * this.antiguedad); }
}

class EmpleadoPorHoras extends Empleado {
    private horasTrabajadas: number;
    private valorHora: number;

    constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
        super(nombre, antiguedad);
        this.horasTrabajadas = horasTrabajadas;
        this.valorHora = valorHora;
    }

    calcularSueldo(): number {
        return this.horasTrabajadas * this.valorHora;
    }
}

class EmpleadoPorComision extends Empleado {
    private ventasDelMes: number;
    private porcentajeComision: number;

    constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
        super(nombre, antiguedad);
        this.ventasDelMes = ventasDelMes;
        this.porcentajeComision = porcentajeComision;
    }

    calcularSueldo(): number {
        return this.ventasDelMes * this.porcentajeComision; 
    }
}

function calcularNomina(empleados: Empleado[]): number {
    let total = 0;
    for (const empleado of empleados) {
        total += empleado.calcularSueldo();
    }
    return total;
}

// prueba
console.log("--- PRUEBA EJERCICIO 4 ---");
const empleados: Empleado[] = [
    new EmpleadoFijo("Ana", 8, 80000), 
    new EmpleadoPorHoras("Stella", 2, 120, 500), 
    new EmpleadoPorComision("Luana", 1, 500000, 0.20) 
];

for (const emp of empleados) {
    console.log(emp.describir());
}

console.log("Total a pagar de nómina: $", calcularNomina(empleados));