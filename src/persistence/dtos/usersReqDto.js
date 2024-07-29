export default class UsersDTO {
    constructor(user) {
        this.nombre = user.first_name;
        this.apellido = user.last_name;
        this.email = user.email;
        this.edad = user.age;
        this.rol = user.role;
        this.carrito = user.cart;
    }
};