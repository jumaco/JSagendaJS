

const listaContactos = [];
console.log(listaContactos.length);
listaContactos.push({id: Math.random(), nombre: "yo", apellido: "yo+", telefono: 12345678, mail: "asd@qwe.com"})
console.log(listaContactos.length);


const nombre = prompt("Ingresa tu nombre")
const apellido = prompt("Ingresa tu apellido")
const telefono = prompt("Ingresa tu teléfono")
const mail = prompt("Ingresa tu mail")

class Contacto {
    constructor(id, nombre, apellido, telefono, mail) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.mail = mail;
    }
    confirmarContacto(){
        
        alert("Ingresado\nNombre: " + this.nombre + "\nApellido: " + this.apellido + "\nTeléfono: " + this.telefono + "\nE-Mail: " + this.mail);
    	listaContactos.push(nuevoContacto);
        localStorage.setItem ('listaContactos', JSON.stringify(listaContactos))
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
        }

}

var nuevoContacto = new Contacto(Math.random(), nombre, apellido, telefono, mail);

nuevoContacto.confirmarContacto();

console.log(nuevoContacto)
console.log(listaContactos.length);

const buscar = prompt("ingrese nombre a buscar")

const filtro = listaContactos.find(elemento => elemento.nombre === buscar);


console.log(filtro);

