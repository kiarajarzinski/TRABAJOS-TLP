# Análisis del archivo `docker-compose.yml`

## Qué es y para qué sirve

Docker Compose es una herramienta que permite definir y levantar múltiples contenedores con un solo archivo YAML y un único comando (`docker compose up -d`). En este proyecto, en lugar de instalar MongoDB manualmente en el sistema, Compose lo levanta en un contenedor aislado con la configuración definida en el archivo.

## Qué configura cada parte

- **`image: mongo:8`** — Utiliza la imagen oficial de MongoDB en su versión 8.
- **`container_name: empleados-mongodb`** — Asigna un nombre fijo al contenedor para identificarlo fácilmente.
- **`restart: unless-stopped`** — Si el contenedor se detiene o la máquina se reinicia, Docker lo vuelve a levantar automáticamente, a no ser que un usuario lo haya detenido.
- **`ports: "27017:27017"`** — Establece la comunicación de red. Mapea el puerto 27017 de la máquina host local hacia el puerto 27017 interno del contenedor. Esto permite que la API pueda conectarse a la base de datos.
- **`volumes: - mongo_data:/data/db`** — Persiste los datos. `/data/db` es el directorio donde MongoDB guarda la información dentro del contenedor. Al montarlo en el volumen `mongo_data`, los datos sobreviven a que el contenedor se detenga o se elimine. Sin esto, cada reinicio del contenedor borraría todos los empleados.
- **`volumes: - mongo_data`** — Es el espacio de almacenamiento. Docker lo crea automáticamente y lo reutiliza entre ejecuciones para que la información no se pierda.

## Cómo se relaciona con la aplicación

Es el motor de datos de todo el proyecto:

1. Docker levanta MongoDB en el contenedor, escuchando en el puerto `27017` de la máquina.
2. El `server.ts` se conecta mediante `mongoose.connect(MONGO_URI)` a `mongodb://localhost:27017/employees_db`.
3. Los controladores llaman al servicio, que ejecuta las consultas contra esa base de datos.
4. Los datos quedan guardados en el volumen `mongo_data`.


# Aplicación de los principios SOLID


## Single Responsibility Principle 

### Una clase o módulo debe tener una sola razón para cambiar.

Este es el principio que más se trabajó en la refactorización, porque el código original tenía todo mezclado en pocos archivos.

- **`controllers/controllers.ts`**: su única responsabilidad es traducir HTTP ↔ lógica de la aplicación, lee `req.body` / `req.params`, valida que los datos de entrada tengan sentido, y arma la respuesta. No calcula el salario ni consulta la base de datos directamente.
- **`services/service.ts`**: su única responsabilidad es la regla de negocio. La clase `EmployeeService` calcula el salario final y coordina con el repository. No sabe nada de `req`/`res`, ni de Mongoose.
- **`repository/repository.ts`**: su única responsabilidad es el acceso a datos. La clase `EmployeeRepository` es el único lugar del proyecto que llama directamente al modelo de Mongoose.
- **`models/employee.ts`**: su única responsabilidad es definir la forma en la que un empleado se guarda en MongoDB (schema).
- **`middlewares/errorHandler.ts`**: su única responsabilidad es centralizar la respuesta ante errores no esperados, en vez de repetir `console.error` + `res.status(500)` en cada controller.
- **`server.ts`**: su única responsabilidad es el arranque de la aplicación (crear la app de Express, conectar los middlewares, conectar la base de datos y levantar el servidor).

En la versión original, `server.ts` contenía tanto el arranque de la aplicación, la creación del modelo, los controladores y la tarea del service.

---

## O — Open/Closed Principle

### Las entidades de software deben estar abiertas a la extensión, pero cerradas a la modificación.

- El `EmployeeRepository` expone métodos (`getEmployees`, `getEmployeeById`, `createEmployee`) que el `EmployeeService` consume sin conocer los detalles de Mongoose. Si en el futuro se necesita agregar una nueva forma de consultar empleados, se puede agregar un nuevo método al repository sin modificar los métodos existentes y sin tocar lo que ya funciona correctamente.

---

## L — Liskov Substitution Principle 

### Los objetos de una clase deben poder ser reemplazados por instancias de sus subclases sin alterar el correcto funcionamiento del programa.


En el proyecto no se define jerarquías de herencia propias. Sin embargo, se respeta indirectamente, por ejemplo, la interfaz `EmployeeInterface` garantiza que cualquier objeto que se use como empleado en el sistema cumple siempre con la misma forma, por lo que puede pasarse entre `model`, `repository` y `service` sin romper el comportamiento esperado.

---

## I — Interface Segregation Principle 

### Ninguna clase debería verse obligada a depender de métodos que no utiliza.

- La interfaz `EmployeeInterface` contiene únicamente los campos estrictamente necesarios para describir a un empleado.
- Cada clase expone solamente los métodos que realmente usan: el controller solo llama a `createEmployee`, `getEmployees` y `getEmployeeById` del service.

---

## D — Dependency Inversion Principle 

### Los módulos de alto nivel no deben depender de módulos de bajo nivel, ambos deben depender de abstracciones.


- El **controller** (módulo de alto nivel) nunca importa `mongoose` ni el modelo `Employee`. Depende únicamente de `EmployeeService`.
- El **service** (módulo de nivel intermedio) nunca importa `mongoose` ni el modelo `Employee`. Depende únicamente de `EmployeeRepository`.
- El **repository** (módulo de bajo nivel) conoce a Mongoose y al modelo `Employee`. Es la única capa que sabe que la base de datos es MongoDB.

Gracias a esto, si se decidiera migrar de MongoDB a PostgreSQL, el único archivo a reescribir sería repository.ts. El servicio, los controladores y las rutas permanecerían intactos porque dependen de la abstracción intermedia.


---

