// lsp: principio de sustitución, se usa para que las subclases puedan sustituir a la clase padre sin alterar el programa
interface Shape {
  area(): number;
}

// creamos una clase rectangulo y cuadrado, ambas implementan shape, y no hay herencia entre ellas
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  // metodo area que hace un calculo 
  area(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(private side: number) {}

  setSide(side: number): void {
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }
}

// funcion que recibe un shape y llama al metodo area
function printArea(shape: Shape): void {
  console.log(`El área de la figura esperada es: ${shape.area()}`);
}

// prueba
const rect = new Rectangle(5, 10);
const sq = new Square(10);

printArea(rect); 
printArea(sq);   