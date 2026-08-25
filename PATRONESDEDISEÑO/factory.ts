// factory sirve para crear objetos de diferentes clases que comparten una clase base en común
//clase abstracta, esta clase solo puede ser heredada por otras, no instanciada
abstract class EquipoBase {
    public tipo: "Notebook" | "Desktop" | "Servidor";
    public nombre: string;
    public RAM: string;
    public procesador: string;
    

    constructor(nombre: string, RAM: string, procesador: string, tipo: "Notebook" | "Desktop" | "Servidor") {
        this.nombre = nombre;
        this.RAM = RAM;
        this.procesador = procesador;
        this.tipo = tipo;
    }
    abstract detalles(): string;
} 
//creamos las clases que herendan a la clase abstracta EquipoBase, deben implementar el metodo detalles 
class Notebook extends EquipoBase {
    detalles(): string {
        return `Tipo: ${this.tipo}, Nombre: ${this.nombre}, RAM: ${this.RAM}, Procesador: ${this.procesador}`;
    }
}

class Desktop extends EquipoBase {
    detalles(): string {
        return `Tipo: ${this.tipo}, Nombre: ${this.nombre}, RAM: ${this.RAM}, Procesador: ${this.procesador}`;
    }
}

class Servidor extends EquipoBase {
    detalles(): string {
        return `Tipo: ${this.tipo}, Nombre: ${this.nombre}, RAM: ${this.RAM}, Procesador: ${this.procesador}`;
    }
}

//clase factory que crea los objetos de las clases que heredan a la clase abstracta 
class EquipoFactory {

  crearEquipo(tipo: "Notebook" | "Desktop" | "Servidor", nombre: string, RAM: string, procesador: string): EquipoBase {
    switch (tipo) {
      case "Notebook":
        return new Notebook(nombre, RAM, procesador, tipo);
      case "Desktop":
        return new Desktop(nombre, RAM, procesador, tipo);
      case "Servidor":
        return new Servidor(nombre, RAM, procesador, tipo);
      default:
        throw new Error("Tipo de equipo no válido");
    }
  }
}

const factory = new EquipoFactory();
const notebook = factory.crearEquipo("Notebook", "Dell XPS", "16GB", "i7");
console.log(notebook.detalles());
// Tipo: Notebook, Nombre: Dell XPS, RAM: 16GB, Procesador: i7