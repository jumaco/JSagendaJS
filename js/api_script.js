$("document").ready(function($){

const APIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=-34.84&lon=-58.37&units=metric&appid=7f0a3742fd58ecbb39f4104f191a5716"; 



if ((JSON.parse(localStorage.getItem('rtaAPI'))) != null){
        console.log("API Almacenados en LocalStorage")
        console.log(JSON.parse(localStorage.getItem('rtaAPI')))
        var misDatos = JSON.parse(localStorage.getItem('rtaAPI'));
        console.log("API Almacenados en memoria")
        console.log(misDatos);
}else{
    var misDatos = {};
    obtenerAPI()
};


function obtenerAPI(){
    $.get(APIURL, function (respuesta, estado){
    console.log(estado)
    console.log(respuesta)
    if(estado === "success"){
        misDatos = respuesta;
        localStorage.setItem('rtaAPI', JSON.stringify(misDatos));
        }
    });
};

//Agregamos un botón con jQuery
// $("#clima").prepend('<button id="btn1" class="btn btn-primary btn-sm">Obtener</button>');
//Escuchamos el evento click del botón agregado
// $("#btn1").click(obtenerApi());

const current = misDatos.current
const minutely = misDatos.minutely
const hourly = misDatos.hourly
const daily = misDatos.daily
const alerts = misDatos.alerts

console.log("variables a partir de misDatos")
console.log(current)
console.log(minutely)
console.log(hourly)
console.log(daily)
console.log(alerts)

badge(`CLIMA <span class="badge">${current.temp}º ST ${current.feels_like}º"</span>`,temp)
renderCurrent()

function renderCurrent(){
    let card = document.createElement('article')
    let dateActualizacion = new Date(current.dt*1000);
    card.innerHTML =`
                    <div class="card text-center">
                        <div class="card-header">
                            ${misDatos.timezone}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Temperatura: ${current.temp}ºC / Sensación Térmica: ${current.feels_like}ºC</h5>
                            <p class="card-text">${alerts[0].description}</p>
                            <a id="actualizar" href="#" class="btn btn-primary">Actualizar</a>
                        </div>
                        <div class="card-footer text-muted">
                            ${dateActualizacion}
                        </div>
                    </div>
                    `
    clima.appendChild(card)
};



// function render(arr){
//     ordenar(arr)
//     arr.forEach(list => {
//     let card = document.createElement('article')
//     card.innerHTML =
//                     `
//                     <div class="card-group">
//                         <div class="card">
//                             <img src="..." class="card-img-top" alt="...">
//                             <div class="card-body">
//                             <h5 class="card-title">Card title</h5>
//                             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                             <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//                         </div>
//                     </div>
//                     `
//     listado.appendChild(card)
//     })
// };


});