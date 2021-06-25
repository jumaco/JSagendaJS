
// Comprueba LocalStorage si existen contactos previos y los imprime, si no crea una lista.
if ((JSON.parse(localStorage.getItem('listaContactos'))) != null){
        console.log("Almacenados en LocalStorage")
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
        // console.table(JSON.parse(localStorage.getItem('listaContactos')))
        var listaContactos = JSON.parse(localStorage.getItem('listaContactos'));
// AGREGANDO UN ID
        for (var i = 0; i < listaContactos.length; i++) {
            // let num = i;
            // let numString = num.toString();
            listaContactos[i].id = i.toString();
        }
        console.log("Almacenados en localStorage con nuevo ID")
        console.log(listaContactos);
        // alert()



// A partir de la lista encontrada o creada muestra en DOM
        render(listaContactos)
        badge()
}else{
        var listaContactos = [];
};

console.log("Almacenados en memoria")
console.log(listaContactos)
// console.log("Almacenados en memoria"+ JSON.stringify(listaContactos))

// Contador de contactos
// const badge = document.getElementById('nroContac');
function badge(){
    var cuenta =`Ver contactos <span class="badge">${listaContactos.length}</span>`;
    nroContac.innerHTML = cuenta;
}




function filtrarDuplicado(arr){
// si el array contiene objetos iguales lo omite en un nuevo array
    let resultado = [];
    arr.forEach((item)=>{
        //resultado incluye ya al itmem? si es true pushea el item, pero al estar negado pushea cuando no lo incluye
        if(!resultado.includes(item)){
            resultado.push(item);
        }
    })
    // console.log(resultado);
    return resultado
};




function ordenar(arr){
    arr.sort((a, b) => {
        if(a.apellido.toLowerCase() < b.apellido.toLowerCase()) {
            return -1;
        }
        if(a.apellido.toLowerCase() > b.apellido.toLowerCase()){
            return 1;
        }
        if(a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return -1;
        }
        if(a.nombre.toLowerCase() > b.nombre.toLowerCase()){
            return 1;
        }
        return 0;
    })
}

function render(arr){
        // const listado = document.getElementById('listado')
        ordenar(arr)
        let i=0
        arr.forEach(list => {
            
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
                                <div>
                                   <!-- <button type="button" class="btn btn-primary btn-sm edit${i}">Editar</button> -->
                                    <button type="button" class="btn btn-danger btn-sm remov${i}" onclick="eliminarContac(${i})">Eliminar</button>
                                </div>
                            </div>
                        </div>
        `
        listado.appendChild(card)
        i++
    })
};


function clear (){
    // let element = document.getElementById("listado");
    while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
    }
};

// Crea nuevo contacto a partir de los inputs, crea un objeto "Contacto" y luego lo pushea a la "listaContactos" inicial.
// Limpia los inputs y luego remueve DOM creado para volver a ejecutar "render".
function agregar(){
    const nombre = $("#Input1").val();
    const apellido = $("#Input2").val();
    const telefono = $("#Input3").val();
    const mail = $("#Input4").val();

    class Contacto {
        constructor(nombre, apellido, telefono, mail) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.telefono = telefono;
            this.mail = mail;
        }
        confirmarContacto(){
            // if(!listaContactos.includes(nuevoContacto)){
            //     console.log(nuevoContacto)
            //     console.log(listaContactos.includes(nuevoContacto))
            //     alert("Contacto Existente")



            // }else{

                console.log(listaContactos.includes(nuevoContacto))
                
                console.log(nuevoContacto)
                listaContactos.push(nuevoContacto);
                // listaContactos.push(nuevoContacto);
                localStorage.setItem ('listaContactos', JSON.stringify(listaContactos))
                console.log(JSON.parse(localStorage.getItem('listaContactos')))
                document.getElementById("Input1").value="";
                document.getElementById("Input2").value="";
                document.getElementById("Input3").value="";
                document.getElementById("Input4").value="";
                clear()
                render(listaContactos)

            // }

        }
    }
    var nuevoContacto = new Contacto(nombre, apellido, telefono, mail);
    nuevoContacto.confirmarContacto();
    console.log(listaContactos.length);
    badge()
};



// var dataI = document.getElementById("idBuscar");
idBuscar.onkeyup = () => {buscar()};
idBuscar.onfocus = () => {idBuscar.value=""};

function buscar(){
    const data = document.getElementById("idBuscar").value;
    var listaEncontrados = [];
    clear()
    for (const list of listaContactos) {
        for (const valor in list){
            if ((list[valor].toLowerCase()).includes(data.toLowerCase())) {
                // console.log(list)
                listaEncontrados.push(list);
                // console.log(listaEncontrados)
            }
        }
    }
    let busqueda = filtrarDuplicado(listaEncontrados);
    // console.log(busqueda)
    render(busqueda);
};

function mostrasLista() {
    clear();
    render(listaContactos);
};


$(`#guardar`).on('click', function () {
    $("#respuestaGuardado").prepend(`
        <button type="button" class="btn btn-success">Contacto Guardado</button>
    `);
    $(".btn-success").fadeOut(4000)
});


function eliminarContac (desdeIndex){
        console.log("Almacenados en LocalStorage")
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
    listaContactos.splice(desdeIndex, 1); // Para la posición  1 elimina 1 elemento
        console.log("Almacenados en memoria")
        console.log(listaContactos)
    localStorage.setItem ('listaContactos', JSON.stringify(listaContactos))
        console.log("Almacenados en LocalStorage")
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
    clear()
    badge()
    render(listaContactos);
    $("#respuestaGuardado").prepend(`
        <button type="button" class="btn btn-warning">Contacto Eliminado</button>
    `);
    $(".btn-warning").fadeOut(4000)
}