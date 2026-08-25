//singleton permite que una clase tenga una sola instancia(instancia es un objeto creado a partir de una clase)

//creamos la interfaz equipo y le asignamos los atributos
interface Equipo {
  nombre: string;
  tipo: string;
  estado: "disponible" | "en reparación";
}

//clase inventario con patron singleton para que solo exista una instancia de la clase
class Inventario {
  private static instancia: Inventario;
  private equipos: Equipo[];
  private constructor() {
    this.equipos = [];
  }


  public static obtenerInstancia(): Inventario {

    if (!Inventario.instancia) {
      Inventario.instancia = new Inventario();
    }

    return Inventario.instancia;
  }

//metodo para agregar un equipo al inventario 
  public agregarEquipo(nombre: string, tipo: string, estado: "disponible" | "en reparación"): void {
    const nuevoEquipo: Equipo = {
      nombre: nombre,
      tipo: tipo,
      estado: estado
    };
    this.equipos.push(nuevoEquipo);
  }

//metodo para listar los equipos 
  public listarEquipos(): Equipo[] {
    return this.equipos;
  }
}


const inventario = Inventario.obtenerInstancia();
inventario.agregarEquipo("Notebook HP", "Portátil", "disponible");
console.log(inventario.listarEquipos());
// [{ nombre: "Notebook HP", tipo: "Portátil", estado: "disponible" }]