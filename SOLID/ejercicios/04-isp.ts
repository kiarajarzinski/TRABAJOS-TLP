//isp: se usa para que las clases no se vean obligadas a implementar metodos que no van a usar
//desarmamos la interfaz de impresora en tres interfaces separadas, cada una con un solo metodo
interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(document: string): void;
}

interface Fax {
  fax(document: string): void;
}

// implementa solo la interface printer 
class SimplePrinter implements Printer {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }

}

//prueba 

new SimplePrinter().print("tarea.txt");