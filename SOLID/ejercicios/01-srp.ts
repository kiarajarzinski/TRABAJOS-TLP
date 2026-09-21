//srp: responsabilidad unica, cada clase tiene una responsabilidad unica y no se mezcla con otras responsabilidades 
// esto nos sirve a medida que el proyecto crece, ya que si tenemos una clase con muchas responsabilidades, cuando queramos hacer un cambio en una de ellas, podemos romper otras funcionalidades de la clase
//una interfaz que define la estructura de un usuario
interface User {
    username: string;
    email: string;
}

//responsabilidad que valida el correo del usuario
class UserValidator {
    validate(email: string) {
        if (!email.includes("@")) {
            throw new Error("El correo no es valido");
        }
    }
}

// clase que guarda el usuario dentro de un array, simulando una base de datos
class UserRepository {

    users: User[] = [];
    //metodo que guarda al usuario, indicamos que debe recibir un objeto de tipo user que no devuelve nada
    save(user: User): void {
        this.users.push(user);
        console.log(`Usuario ${user.username} guardado en la base de datos.`);
    }
};

class EmailService {
    //metodo que envia un email de bienvenida
    sendWelcomeEmail(email: string): string {
        return `Email enviado a ${email}`;
    }
}

//clase que se encarga de registrar un nuevo usuario, esta clase tiene como responsabilidad única registrar un nuevo usuario, y para ello utiliza las otras clases que tienen responsabilidades únicas
class UserRegistrationService {
// el constructor sirve para inyectar las dependencias de las clases que tienen responsabilidades únicas, en este caso el repositorio de usuarios, el validador de usuarios y el servicio de correo electrónico
    constructor(
        public userRepository: UserRepository = new UserRepository(),
        public userValidator: UserValidator = new UserValidator(),
        public emailService: EmailService = new EmailService(),
    ) { };

//metodo que registra un nuevo usuario que recibe un objeto de tipo user, valida el correo del usuario, guarda al usuario en la base de datos y envia un correo de bienvenida
    newUser(user: User) {
        this.userValidator.validate(user.email);
        this.userRepository.save(user);
        return this.emailService.sendWelcomeEmail(user.email);

    }

}

//
const users = new UserRegistrationService();

const newUser = {
    username: "Juan",
    email: "juan@example.com"
}

users.newUser(newUser);

