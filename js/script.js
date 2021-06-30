// Comprueba LocalStorage si existen contactos previos y los imprime, si no crea una lista.
if ((JSON.parse(localStorage.getItem('listaContactos'))) != null){
        console.log("Almacenados en LocalStorage")
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
        // console.table(JSON.parse(localStorage.getItem('listaContactos')))
        var listaContactos = JSON.parse(localStorage.getItem('listaContactos'));
    // // AGREGANDO UN ID
    //     for (let i = 0; i < listaContactos.length; i++) {
    //         listaContactos[i].id = i;
    //             // .toString(); // pasado a string para que funcione en buscador x el toLowerCase.
    //     }
        agregarId(listaContactos)
        console.log("Almacenados en memoria con nuevo ID")
        console.log(listaContactos);
        // alert()
        //A PARTIR DE LISTA ENCONTRADA FILTRA REPETIDOS
        const aMostrar = filtrarDuplicado(listaContactos)
    // A partir de la lista encontrada muestra en DOM
        render(aMostrar)
        badge(`CONTACTOS <span class="badge">${listaContactos.length}</span>`,nroContac);
}else{
        var listaContactos = [];
};

function agregarId (arr){
            for (let i = 0; i < arr.length; i++) {
            arr[i].id = i;
                // .toString(); // pasado a string para que funcione en buscador x el toLowerCase.
        }
}



// ---------------
console.log("Almacenados en memoria")
console.log(listaContactos)
// console.log("Almacenados en memoria"+ JSON.stringify(listaContactos))


// MUESTRA u OCULTA UNA SECCION
const bloques = $(".bloque");
const enlaces = $("#navegacion").find("a");
// console.log(enlaces)

enlaces.click(function(e){
    e.preventDefault();
    let iden = $(this).attr("href");
    bloques.filter(iden).addClass("visible").siblings().removeClass("visible");
    $(e.target.parentNode).removeClass("alert-primary alert-secondary border-bottom-0").siblings().removeClass("alert-primary alert-secondary border-bottom-0");
    $(e.target.parentNode).addClass("alert-primary border-bottom-0").siblings().addClass("alert-secondary")
})

// Contador de contactos
// const badge = document.getElementById('nroContac');
function badge(el1, el2){
    // var cuenta =`CONTACTOS <span class="badge">${listaContactos.length}</span>`;
    var cuenta = el1
    el2.innerHTML = cuenta;
}


// Filtra duplicados dentro de un array.
// -en la version inicial se podían guardar contactos identicos.
// -al momento de hacer una busqueda puede traer duplicados.

function filtrarDuplicado(arr){
// si el array contiene objetos iguales lo omite en un nuevo array
    let resultado = [];
    arr.forEach((item)=>{
        //resultado incluye ya al itmem? si es true pushea el item, pero al estar negado pushea cuando no lo incluye
        if(!resultado.includes(item)){
            resultado.push(item);
        }
    })
    console.log("Array sin repetidos")
    console.log(resultado);
    return resultado
};



// ORDENA EL ARRAY SEGUN APELLIDO Y LUEGO POR NOMBRE
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


// RENDERIZA UN ARRAY 
// SE OMITIÓ EL LA VARIABLE i, YA QUE AHORA UTILIZA EL id DENTRO DEL OBJETO PARA DISCRIMINAR.
// OMITÍ EL getElementById YA QUE AL USAR UN id HTML JS lo reconoce ¿?.
function render(arr){
    // const listado = document.getElementById('listado').
    ordenar(arr)
    // let i=0
    arr.forEach(list => {
    let card = document.createElement('article')
    card.innerHTML =
                    `
                        <div class="card mb-1">
                            <div class="card-header" id="heading${list.id}">
                                <h5 class="mb-0">
                                    <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${list.id}" aria-expanded="false" aria-controls="collapse${list.id}">
                                        <h4>${list.apellido}, ${list.nombre}</h4>
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse${list.id}" class="collapse" aria-labelledby="heading${list.id}" data-parent="#listado">
                                <div class="card-body">
                                    <p>Teléfono: ${list.telefono}</p>
                                    <p>Email: ${list.mail}</p>
                                <div class="d-flex justify-content-end">
                                   <!-- <button type="button" class="btn btn-primary btn-sm edit${list.id}">Editar</button> -->
                                    <button type="button" class="btn btn-danger btn-sm remov${list.id}" onclick="eliminarContac(${list.id})">Eliminar</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    `
    listado.appendChild(card)
    // i++
    })
};


function clear (id){
    // let element = document.getElementById("listado");
    while (id.firstChild) {
    id.removeChild(id.firstChild);
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
            console.log("el de abajo es el nuevo contacto")
            console.log(nuevoContacto);
            agregarId(listaContactos);
            listaContactos.push(nuevoContacto);
            localStorage.setItem ('listaContactos', JSON.stringify(listaContactos));
            console.log(JSON.parse(localStorage.getItem('listaContactos')));
            document.getElementById("Input1").value="";
            document.getElementById("Input2").value="";
            document.getElementById("Input3").value="";
            document.getElementById("Input4").value="";
            clear(listado);
            render(listaContactos);
            $("#respuestaGuardado").prepend(`
                <button type="button" class="btn btn-success">Contacto Guardado</button>
            `);
            $(".btn-success").fadeOut(4000);
        }
    }
    var nuevoContacto = new Contacto(nombre, apellido, telefono, mail);
    nuevoContacto.confirmarContacto();
    console.log(listaContactos.length);
    badge(`CONTACTOS <span class="badge">${listaContactos.length}</span>`,nroContac);
};



// var dataI = document.getElementById("idBuscar");
idBuscar.onkeyup = () => {buscar()};
idBuscar.onfocus = () => {idBuscar.value=""};

function buscar(){
    const data = document.getElementById("idBuscar").value;
    var listaEncontrados = [];
    clear(listado)
    for (const list of listaContactos) {
        for (const valor in list){
            if(valor != "id"){
                if ((list[valor].toLowerCase()).includes(data.toLowerCase())) {
                    // console.log(list)
                    listaEncontrados.push(list);
                    console.log("lista de encontrados")
                    console.log(listaEncontrados)
                }
            }
        }
    }
    let busqueda = filtrarDuplicado(listaEncontrados);
    // console.log(busqueda)
    render(busqueda);
};

function mostrasLista() {
    clear(listado);
    render(listaContactos);
};


// $(`#guardar`).on('click', function () {
//     $("#respuestaGuardado").prepend(`
//         <button type="button" class="btn btn-success">Contacto Guardado</button>
//     `);
//     $(".btn-success").fadeOut(4000)
// });

// ELIMINA CONTACTO MEDIANTE .splice A PARTIR DEL nuemero de index BORRA 1 OBJETO, EL ID DE CADA OBJETO SE HIZO COINCIDIR CON EL index DEL ARRAY.
//LA FUNCION ES LLAMADA mediante onclick html JUNTO CON EL PARAMETRO QUE ES RELLENADO AL CREAR EL DOM
function eliminarContac (desdeIndex){
        console.log("Al ejecutar eliminar Almacenados en LocalStorage antes del splice")
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
        console.log("Al ejecutar eliminar Almacenados en memoria antes del splice")
        console.log(listaContactos);
        alert("con alert detengo que se actualice consola para ver el array antes de splice")
    listaContactos.splice(desdeIndex, 1); // Para la posición  1 elimina 1 elemento
        console.log("Al ejecutar eliminar Almacenados en memoria luego del splice")
        console.log(listaContactos);
        alert("con alert detengo que se actualice consola para ver el array antes de reasignar id")
    agregarId(listaContactos);
    localStorage.setItem ('listaContactos', JSON.stringify(listaContactos))
        console.log("Al ejecutar eliminar luego de splice y reasignar id Almacenados en memoria")
        console.log(listaContactos);
        console.log("Al ejecutar eliminar luego de splice y reasignar id Almacenados en LocalStorage")
        console.log(JSON.parse(localStorage.getItem('listaContactos')))
    clear(listado)
    badge(`CONTACTOS <span class="badge">${listaContactos.length}</span>`,nroContac);
    render(listaContactos);
    $("#respuestaGuardado").prepend(`
        <button id="eliminado" type="button" class="btn btn-danger">Contacto Eliminado</button>
    `);
    $("#eliminado").fadeOut(4000)
}


