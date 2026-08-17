class Producto {
    nombre: string;
    precio: number;
    categoria: string;
    stock: number

    constructor(nombre: string, precio: number, categoria: string, stock: number) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }
    describir(): string {
        return `Este producto es ${this.nombre} , su precio es ${this.precio}  y pertenece a la categoría ${this.categoria}. Hay ${this.stock} unidades.`;
    }
    hayStock(cantidad: number): boolean {
        return this.stock >= cantidad;
    }
    //viod:vacio, es decir que no devuelve nada
    venderUnidades(cantidad: number): void {
        if (this.hayStock(cantidad)) {
            this.stock -= cantidad;
        } else {
            throw new Error(`No hay suficiente stock para vender ${cantidad} unidades.`);
        }
    }
    aplicarDescuento(porcentaje: number): number {
        const valorDescontado = (this.precio * porcentaje) / 100;
        return this.precio - valorDescontado;
    }
    
}

// prueba
console.log("--- PRUEBA EJERCICIO 1 ---");
const celular = new Producto("Celular", 500000, "Electrónica", 2);
console.log(celular.describir());
console.log("Precio con 10% de descuento: $", celular.aplicarDescuento(10));

celular.venderUnidades(1);
console.log("Stock después de vender 1 unidad:", celular.stock);

try {
    celular.venderUnidades(3); 
} catch (error: any) {
    console.log("Error:", error.message);
}