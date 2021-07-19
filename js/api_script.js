
const Meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const Dias = [
"Domingo",
"Lunes",
"Martes",
"Miércoles",
"Jueves",
"Viernes",
"Sábado"]

// console.log(`${Dias[f.getDay()]} 18 de ${Meses[f.getMonth()]} `); // Devuelve el mes actual en formato de texto

const APIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=-34.84&lon=-58.37&units=metric&appid=7f0a3742fd58ecbb39f4104f191a5716"; 

// var misDatos ={};
// var {current, minutely, hourly, daily, alerts} = misDatos

// var current = {}
// var minutely = []
// var hourly = []
// var daily = []
// var alerts = []

$("document").ready(function(){
// console.log('ready')
});


if ((JSON.parse(localStorage.getItem('rtaAPI'))) != null){
		var misDatos = JSON.parse(localStorage.getItem('rtaAPI'));
		var {current, minutely, hourly, daily, alerts} = misDatos;
			if ((Date.now() - (misDatos.current.dt*1000)) > 600000) {
				obtenerAPI();
			}else{
			renderCurrent()
			badge(`CLIMA T ${current.temp}º ST ${current.feels_like}º`,temp)
			}
}else{
	obtenerAPI()
};

function obtenerAPI(){
	$.get(APIURL, function (respuesta, estado){
	// console.log(new Date(Date.now()))
	if(estado === "success"){
		let misDatos = respuesta;
		localStorage.setItem('rtaAPI', JSON.stringify(misDatos));
		let {current, minutely, hourly, daily, alerts} = misDatos;
		// console.log('obtenido ' + new Date(misDatos.current.dt*1000));
		clear(clima);
		renderCurrent();
		badge(`CLIMA T ${current.temp}º ST ${current.feels_like}º`,temp);
		// 
		}else{
			// console.log('fail')
		}
	});
	// console.log('obtenido' + new Date(misDatos.current.dt*1000));
};


function renderCurrent(){
	let misDatos = JSON.parse(localStorage.getItem('rtaAPI'));
	let {current, minutely, hourly, daily, alerts} = misDatos;
	// console.log(' render ' + new Date(misDatos.current.dt*1000))
	let card = document.createElement('article')
	let dateActualizacion = new Date(current.dt*1000);
	card.innerHTML =`
					<div class="card text-center">
						<div class="card-header">
							<p class="text-muted mb-0 pb-0">Temperatura actual para</p
							<h1>${misDatos.timezone}</h1>
						</div>
						<div class="card-body">
							<h5 class="card-title">T: ${current.temp}ºC / ST: ${current.feels_like}ºC</h5>
							<p class="card-text"></p>
							<a id="actualizar" href="#" class="btn btn-primary">Actualizar</a>
						</div>
						<div class="card-footer text-muted text-small">
							Actualizado el ${Dias[dateActualizacion.getDay()]} 
							${dateActualizacion.getDate()} 
							de ${Meses[dateActualizacion.getMonth()]} 
							a las ${dateActualizacion.toLocaleTimeString()}
						</div>
					</div>
					`
	clima.appendChild(card)

	document.getElementById("actualizar").onclick = function(){ obtenerAPI();}

	// console.log(daily)

	let carrousel = document.createElement('article')
	carrousel.className = "mt-3";
	carrousel.innerHTML =`
						<div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="3000">
							<div id="carouselInner" class="carousel-inner">
								
							</div>
							<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
								<span class="carousel-control-prev-icon" aria-hidden="true"></span>
								<span class="sr-only">Previous</span>
							</a>
							<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
								<span class="carousel-control-next-icon" aria-hidden="true"></span>
								<span class="sr-only">Next</span>
							</a>
						</div>
					`
	clima.appendChild(carrousel)

	daily.forEach(list => {
		let card = document.createElement('div')
		let fecha = new Date(list.dt*1000)
		card.className = "carousel-item";
		card.innerHTML =
						`
							<div class="card d-block ">
								<div class="card-body text-center">
									<h6 class="card-subtitle mb-2 text-muted">Previsión para el</>
									<h6 class="card-subtitle mb-2 text-muted">
										${Dias[fecha.getDay()]} 
										${fecha.getDate()} 
										de ${Meses[fecha.getMonth()]} 
										a las ${fecha.toLocaleTimeString()}
										</h6>
									<h5 class="card-title">${list.temp.day}ºC</h5>
									<p class="card-text">Este es el carrousel</p>

								</div>
							</div>
						`
		carouselInner.appendChild(card);
	
	});

	$('#carouselInner div').first().addClass('active');

};
