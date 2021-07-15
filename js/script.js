// COMPRUEBA LOCALSTORAGE SI EXISTEN CONTACTOS PREVIOS Y LOS ALMACENA EN UNA VARIABLE, SI NO CREA UN LISTA NUEVA ARRAY.
if ((JSON.parse(localStorage.getItem('listaContactos'))) != null){
        var listaContactos = JSON.parse(localStorage.getItem('listaContactos'));
    //A PARTIR DE LISTA ENCONTRADA FILTRA REPETIDOS
        let aMostrar = filtrarDuplicado(listaContactos);
    // A partir de la lista encontrada muestra en DOM
        render(aMostrar);
        badge(`CONTACTOS ${listaContactos.length}`,nroContac);
}else{
        var listaContactos = [];
};

// MUESTRA U OCULTA UNA SECCIÓN.
const bloques = $(".bloque");
const enlaces = $("#navegacion").find("a");
enlaces.click(function(e){
    e.preventDefault();
    let iden = $(this).attr("href");
    bloques.filter(iden).addClass("visible").siblings().removeClass("visible");
    $(e.target.parentNode).removeClass("alert-primary alert-secondary border-bottom-0").siblings().removeClass("alert-primary alert-secondary border-bottom-0");
    $(e.target.parentNode).addClass("alert-primary border-bottom-0").siblings().addClass("alert-secondary")
})

// ------------------------EVENTOS------------------------

// CAPTURA EVENTOS y EJECUTA
idBuscar.onkeyup = () => {buscar()};
idBuscar.onfocus = () => {idBuscar.value=""};

// ------------------------FUNCIONES------------------------

// A CADA OBJETO DEL ARRAY LE CREA UN NUEVO ID O SOBREESCRIBE PARA QUE COINCIDA CON EL INDEX DEL ARRAY.
function agregarId (arr){
    for (let i = 0; i < arr.length; i++) {
    arr[i].id = i;
    };
};

// AGREGA UN BADGE(el1) AL FINAL DEL ELEMENTO HTML ESPECIFICADO POR ID(el2)
function badge(el1, el2){
    var cuenta = el1
    el2.innerHTML = cuenta;
}

// FILTRA DUPLICADOS DENTRO DE UN ARRAY.
// -AL MOMENTO DE HACER UNA BUSQUEDA PUEDE TRAER DUPLICADOS.
function filtrarDuplicado(arr){
// SI EL ARRAY CONTIENE OBJETOS IGUALES LO OMITE EN UN NUEVO ARRAY.
    let resultado = [];
    arr.forEach((item)=>{
//RESULTADO[] INCLUYE YA AL ITEM? SI ES TRUE PUSHEA EL ITEM, PERO AL ESTAR NEGADO PUSHEA CUANDO NO LO INCLUYE.
        if(!resultado.includes(item)){
            resultado.push(item);
        }
    })
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

// RENDERIZA EL ARRAY (QUE SE ESPECIFICA EN EL PARAMETRO DE LA FUNCION).
function render(arr){
    ordenar(arr)
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
    })
};

// LIMPIA EL DOM SEGÚN EL ID ESPECIFICADO COMO PARÁMETRO.
function clear (id){
    while (id.firstChild) {
    id.removeChild(id.firstChild);
    }
};

// CREA NUEVO CONTACTO A PARTIR DE LOS INPUTS, CREA UN OBJETO "CONTACTO" Y LUEGO LO PUSHEA A LA "LISTACONTACTOS" INICIAL.
// LIMPIA LOS INPUTS Y LUEGO REMUEVE DOM CREADO PARA VOLVER A EJECUTAR "RENDER" Y CREA UNA NOTIFICACIÓN QUE SE GUARDÓ.
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
            agregarId(listaContactos);
            listaContactos.push(nuevoContacto);
            localStorage.setItem ('listaContactos', JSON.stringify(listaContactos));
            $("#Input1").val('');
            $("#Input2").val('');
            $("#Input3").val('');
            $("#Input4").val('');
            clear(listado);
            render(listaContactos);
            $("#respuestaGuardado").prepend(`<button type="button" class="btn btn-success">Contacto Guardado</button>`);
            $(".btn-success").fadeOut(4000);
        }
    }
    var nuevoContacto = new Contacto(nombre, apellido, telefono, mail);
    nuevoContacto.confirmarContacto();
    badge(`CONTACTOS ${listaContactos.length}`,nroContac);
};

// BUSCADOR
// DENTRO DE CADA ELEMENTO DE ARRAY(OBJETO) BUSCA LO INGRESADO EN EL VALOR DE LA KEY, LO ALMACENA EN UN NUEVO ARRAY, FILTRA REPETIDOS, RENDER AL NUEVO ARRAY
function buscar(){
    const data = document.getElementById("idBuscar").value;
    var listaEncontrados = [];
    clear(listado)
    for (const list of listaContactos) {
        for (const valor in list){
            if(valor != "id"){
                if ((list[valor].toLowerCase()).includes(data.toLowerCase())) {
                    listaEncontrados.push(list);
                }
            }
        }
    }
    let busqueda = filtrarDuplicado(listaEncontrados);
    render(busqueda);
};

// LA FUNCION ESTA INTEGRADA EN EL HTML AL PRESIONAR VER CONTACTOS, LIMPIA Y RENDERIZA LA LISTA
function mostrasLista() {
    clear(listado);
    render(listaContactos);
};

// ELIMINA CONTACTO MEDIANTE .SPLICE A PARTIR DEL NÚMERO DE INDEX BORRA 1 OBJETO, EL ID DE CADA OBJETO SE HIZO COINCIDIR CON EL INDEX DEL ARRAY.
//LA FUNCIÓN ES LLAMADA MEDIANTE ONCLICK HTML JUNTO CON EL PARÁMETRO QUE ES RELLENADO AL CREAR EL DOM.
function eliminarContac (desdeIndex){
    listaContactos.splice(desdeIndex, 1); // Para la posición  1 elimina 1 elemento
    agregarId(listaContactos);
    localStorage.setItem ('listaContactos', JSON.stringify(listaContactos))
    clear(listado)
    badge(`CONTACTOS ${listaContactos.length}`,nroContac);
    render(listaContactos);
    $("#respuestaGuardado").prepend(`<button id="eliminado" type="button" class="btn btn-danger">Contacto Eliminado</button>`);
    $("#eliminado").fadeOut(4000);
}

// VALIDACIÓN DE FORMULARIO NUEVO CONTACTO
const inputs = $('form').find('input');

function validar(){
    let reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+.)+[A-Z]{2,4}$/i;
    // console.log(inputs);
    // alert('stop')
    for (let input of inputs) {
        // console.log(input.value);
        // console.log($(input).attr('id'));
        if((($(input).attr('id')) == 'Input3') && (isNaN(parseInt($(input).val().trim())))) {
            $(input).addClass("border border-danger");
        }else if((($(input).attr('id')) == 'Input4') && !reg.test($(input).val().trim()) ) {
            $(input).addClass("border border-danger");
        }else if($(input).val().trim() == '' ){
            $(input).addClass("border border-danger");
        }else {
            $(input).removeClass("border border-danger");
        };
    };
    if (!inputs.hasClass('border-danger')){
        $('#guardar').removeAttr("disabled");
    };
};

// LLAMADO A FUNCION VALIDAR
$(inputs).blur(function(e){
    e.preventDefault();
    // pendiente: sí pasó el último input validar para que no resalte luego del primer blur
    validar();
})


// addContact.onclick= () => {
//     const labels = $("label");
//     const inputs = $("form").find("input");
//     console.log(inputs)
//     console.log(labels)

//     for (const input of inputs) {
//         console.log(input)
//         let valor = (input.$("input")).attr("id");
//         console.log(valor)


//     }
// }

// inputs.blur(function(e){
//     e.preventDefault();
//     let iden = $(this).attr("id");
//     labels.filter(iden).addClass("border border-danger");
//     $(e.target.parentNode).removeClass("alert-primary alert-secondary border-bottom-0").siblings().removeClass("alert-primary alert-secondary border-bottom-0");
//     $(e.target.parentNode).addClass("alert-primary border-bottom-0").siblings().addClass("alert-secondary")
// })


// addContact.onclick= () => {
//     let reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+.)+[A-Z]{2,4}$/i;

//     console.log("corriendo validacion")
//     $('#Input1').blur(function() {
//         if($("#Input1").val().trim() == '' ){
//             $(this).addClass("border border-danger");
//         }else {
//             $(this).removeClass("border border-danger");
//             $('#guardar').removeAttr("disabled");
//         }
//     });
//     $('#Input2').blur(function() {
//         if($("#Input2").val().trim() == '' ){
//             $(this).addClass("border border-danger");
//             $('#guardar').attr("disabled","disabled");
//         }else {
//             $(this).removeClass("border border-danger");
//             $('#guardar').removeAttr("disabled");
//         }
//     });

//     $('#Input3').blur(function() {
//         console.log (parseInt($("#Input3").val().trim()))

//         if(($("#Input3").val().trim() == '') || (isNaN(parseInt($("#Input3").val().trim()))) ){
//             $(this).addClass("border border-danger");
//             $('#guardar').attr("disabled","disabled");
//         }else {
//             $(this).removeClass("border border-danger");
//             $('#guardar').removeAttr("disabled");
//         }
//         })

//     $('#Input4').blur(function() {
//         if($("#Input4").val().trim() == '' ){
//             $(this).addClass("border border-danger");
//             $('#guardar').attr("disabled","disabled");
//         }else {
//             $(this).removeClass("border border-danger");
//             $('#guardar').removeAttr("disabled");
//         }
//         })

//     $('#Input4').blur(function() {
//         mail = $("#Input4").val().trim()
//         if(mail != '' && reg.test(mail)){
//             $(this).removeClass("border border-danger");
//             $('#guardar').removeAttr("disabled");
//         }else {
//             $(this).addClass("border border-danger");
//             $('#guardar').attr("disabled","disabled");
//         }
//         })
//     if (($("#Input1").val() == '')||($("#Input2").val() == '')||($("#Input3").val() == '')||($("#Input4").val() == '')) {
//         $('#guardar').attr("disabled","disabled");
//     }
// }


    // }else if(mail.trim() == '' ){
    //     alert('Por favor, ingresa tu email.');
    //     $('#Input4').focus();
    //     return false;
    // }else if(mail.trim() != '' && !reg.test(mail)){
    //     alert('Por favor, ingresa un email válido.');
    //     $('#Input4').focus();
    //     return false;
    // }else if(apellido.trim() == '' ){
    //     alert('Por favor, ingresa un mensaje.');
    //     $('#Input2').focus(); 
    //     return false;
    // }else{
    //     $('#guardar').removeAttr("disabled");

    // }



