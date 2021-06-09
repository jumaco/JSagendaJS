

if ((JSON.parse(localStorage.getItem('listaContactos'))) != null){
        console.log("agenda en Storage: " +JSON.parse(localStorage.getItem('listaContactos')).length);
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
        var listaContactos = JSON.parse(localStorage.getItem('listaContactos'))
        console.log("agenda actual: "+ listaContactos.length)
        render()
    }else
        var listaContactos = [];


function render(){
        const listado = document.getElementById('listado')
        listaContactos.forEach(list => {
        let card = document.createElement('article')
        card.innerHTML = `
                        <div class="card">
                          <div class="card-header">
                            ${list.apellido}
                          </div>
                          <div class="card-body">
                            <h3 class="card-title">${list.nombre}</h3>
                            <p class="card-text">${list.telefono}</p>
                            <p class="card-text">${list.mail}</p>
                          </div>
                        </div>
        `
        listado.appendChild(card)
    })
}


function agregar(){
    const nombre = document.getElementById("Input1").value;
    const apellido = document.getElementById("Input2").value;
    const telefono = document.getElementById("Input3").value;
    const mail = document.getElementById("Input4").value;

    class Contacto {
        constructor(nombre, apellido, telefono, mail) {
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
            document.getElementById("Input1").value="";
            document.getElementById("Input2").value="";
            document.getElementById("Input3").value="";
            document.getElementById("Input4").value="";
            let element = document.getElementById("listado");
            while (element.firstChild) {
              element.removeChild(element.firstChild);
            }
            render()
            }
    }
    var nuevoContacto = new Contacto(nombre, apellido, telefono, mail);
    nuevoContacto.confirmarContacto();
    console.log(nuevoContacto)
    console.log(listaContactos.length);
}

function buscar(){
    const buscar = document.getElementById("idBuscar").value;
    const filtro = listaContactos.find(elemento => elemento.nombre === buscar);
    console.log(filtro);
    document.getElementById("idBuscar").value="";
}

function listar (){
    console.log(JSON.parse(localStorage.getItem('listaContactos')))
}
