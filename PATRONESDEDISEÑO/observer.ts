//el patron observer permite a un objeto notificar a otros objetos cuando su estado cambia

// creamos observador con el metodo para recibir notificaciones 
interface Observador {
    recibirNotificacion(
        nombreEquipo: string,
         nuevoEstado: string): void;//void si no devuelve nada
}

//soporte, que implementa observador y recibe notificaciones 
class Soporte implements Observador {
    
    recibirNotificacion(nombreEquipo: string, nuevoEstado: string): void {
        console.log(`Soporte notificado: ${nombreEquipo} ha cambiado su estado a ${nuevoEstado}.`);
    }
}

class Equipo {
    nombre: string;
    tipo: string;
    estado: string;
    
    // aca se crea un array de observadores 
    private observadores: Observador[] = [];

    constructor(nombre: string, tipo: string, estado: string) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.estado = estado;
    }

    agregarObservador(observador: Observador): void {
        this.observadores.push(observador);
    }

    // cambia el estado y avisa a los observadores
    cambiarEstado(nuevoEstado: string): void {
        this.estado = nuevoEstado;
        this.notificarObservadores();
    }

    private notificarObservadores(): void {
        for (const observador of this.observadores) {
            observador.recibirNotificacion(this.nombre, this.estado);
        }
    }
}

const soporte = new Soporte();
const equipo = new Equipo("Notebook HP", "Portátil", "disponible");
equipo.agregarObservador(soporte);
equipo.cambiarEstado("en reparación");
// Soporte notificado: Notebook HP ha cambiado su estado a en reparación.