class Persona {
    private readonly dni: string;
    public nombre: string;
    private _edad!: number; 
    private _email!: string;

    constructor(dni: string, nombre: string, edad: number, email: string) {
        this.dni = dni;
        this.nombre = nombre;
        this.edad = edad; 
        this.email = email;
    }

    get edad(): number {
        return this._edad;
    }

    set edad(valor: number) {
        if (valor < 0 || valor > 120) {
            throw new Error("La edad debe estar entre 0 y 120 años");
        }
        this._edad = valor;
    }

    get email(): string {
        return this._email;
    }

    set email(valor: string) {
        if (!valor.includes("@")) {
            throw new Error("El email debe contener @");
        }
        this._email = valor;
    }

    get esMayorDeEdad(): boolean {
        return this._edad >= 18;
    }

    get datosPublicos(): string {
        return `Nombre: ${this.nombre} | ¿Es mayor de edad?: ${this.esMayorDeEdad ? 'Sí' : 'No'}`;
    }
}

// prueba
console.log("--- PRUEBA EJERCICIO 5 ---");
const persona = new Persona("12345678", "Viviana", 20, "vivi@gmail.com");

console.log(persona.datosPublicos);
console.log("Email actual:", persona.email);

try {
    persona.edad = 130; 
} catch (error: any) {
    console.log("Error al cambiar la edad:", error.message);
}

try {
    persona.email = "vivigmail.com"; 
} catch (error: any) {
    console.log("Error al cambiar el email:", error.message);
}

// cambio de valores validos
persona.edad = 21;
console.log("Nuevos datos públicos:", persona.datosPublicos);