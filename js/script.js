
// Comprueba LocalStorage si existen contactos previos y los imprime, si no crea una lista.
if ((JSON.parse(localStorage.getItem('listaContactos'))) != null){
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
        var listaContactos = JSON.parse(localStorage.getItem('listaContactos'));
        render()
    }else
        var listaContactos = [];

// A partir de la lista encontrada o creada muestra en DOM
function render(){
        const listado = document.getElementById('listado')
        let i=0
        listaContactos.forEach(list => {
            i++
        let card = document.createElement('article')
        card.innerHTML = `
                        <div class="card">
                            <div class="card-header" id="heading${i}">
                                <h5 class="mb-0">
                                    <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                                        <h4>${list.apellido}, ${list.nombre}</h4>
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#listado">
                                <div class="card-body">
                                <p>Teléfono: ${list.telefono}</p>
                                <p>Email: ${list.mail}</p>
                                </div>
                            </div>
                        </div>
        `
        listado.appendChild(card)
    })
        const padre = document.getElementById('nroContac');
        var cuenta =`Contactos <span class="badge">${listaContactos.length}</span>`;
        padre.innerHTML = cuenta;
}

// Crea nuevo contacto a partir de los inputs, crea un objeto "Contacto" y luego lo pushea a la "listaContactos" inicial.
// Limpia los inputs y luego remueve DOM creado para volver a ejecutar "render"
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
        console.log(listaContactos.length);
}

var dataI = document.getElementById("idBuscar");
dataI.onkeyup = () => {buscar()};


function buscar(){
    const data = document.getElementById("idBuscar").value;
    var listaEncontrados = [];
    let element = document.getElementById("listado");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    for (const list of listaContactos) {
        for (const valor in list){
            if ((list[valor]) === data) {
                console.log(list)
                listaEncontrados.push(list);
                console.log(listaEncontrados)
            }
        }
    }
    let i=0
    listaEncontrados.forEach(list => {
        i++
        let card = document.createElement('article')
        card.innerHTML = `
                        <div class="card">
                            <div class="card-header" id="heading${i}">
                                <h5 class="mb-0">
                                    <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                                        <h4>${list.apellido}, ${list.nombre}</h4>
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#listado">
                                <div class="card-body">
                                <p>Teléfono: ${list.telefono}</p>
                                <p>Email: ${list.mail}</p>
                                </div>
                            </div>
                        </div>
        `
        listado.appendChild(card)
    })

    dataI.onfocus = () => {document.getElementById("idBuscar").value=""};
}


