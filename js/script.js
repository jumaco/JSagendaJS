

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

        const padre = document.getElementById('nroContac');
        var cuenta =`Contactos <span class="badge">${listaContactos.length}</span>`;
        padre.innerHTML =cuenta;

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
    const data = document.getElementById("idBuscar").value;

    // BUSCAR MEDIANTE "find"

    // const filtro = listaContactos.find(elemento => elemento.nombre === data);
    // console.log(filtro);

    // BUSCAR CON "for...each" DEFINIENDO EL NOMBRE DEL ELEMENTO Y COMPARANDOLO CON "data"

    // listaContactos.forEach(list=> {
    //     if (list.nombre == data || list.apellido == data || list.telefono == data || list.mail == data){
    //         console.log(list)
    //     }
    // })

    // BUSCAR CON "for...of" PARA RECORRER EL ARRAY, LUEGO MEDIANTE "for..in" RECORRE CADA ELEMENTO DEL ARRAY (objeto), SI ENCUENTRA CONDICION IMPRIME EL ELEMENTO DEL ARRAY(EN ESTE CASO UN OBJETO)

    for (const list of listaContactos) {
        for (const valor in list){
        // console.log(list[valor])
            if ((list[valor]) === data) {
            console.log(list)
            }else{
                console.log("sin coincidencia")
            }
        }
    }
    document.getElementById("idBuscar").value="";
}

function listar (){
    console.log(JSON.parse(localStorage.getItem('listaContactos')))
}
