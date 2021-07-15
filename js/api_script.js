$("document").ready(function($){

const APIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=-34.84&lon=-58.37&units=metric&appid=7f0a3742fd58ecbb39f4104f191a5716"; 

var current = {}
var minutely = []
var hourly = []
var daily = []
var alerts = []

if ((JSON.parse(localStorage.getItem('rtaAPI'))) != null){
		// console.log("API Almacenados en LocalStorage")
		// console.log(JSON.parse(localStorage.getItem('rtaAPI')))
		var misDatos = JSON.parse(localStorage.getItem('rtaAPI'));
		// console.log("API Almacenados en memoria")
		// console.log(misDatos);
		// console.log(misDatos.current.dt*1000)
		// console.log(Date.now())
		if (!(misDatos.current.dt*1000 < Date.now()+600000)) {
			// console.log("ok, voy a usar solicitar a la API")
			obtenerAPI();
		}else{
		// console.log("bueno, continuo con el localStorage")
		current = misDatos.current
		minutely = misDatos.minutely
		hourly = misDatos.hourly
		daily = misDatos.daily
		alerts = misDatos.alerts
		renderCurrent()

		badge(`CLIMA T ${current.temp}º ST ${current.feels_like}º`,temp)
		}
}else{
	var misDatos = {};
	obtenerAPI()
};

function obtenerAPI(){
	console.log('obteniendo')
	$.get(APIURL, function (respuesta, estado){
	console.log(estado)
	console.log(respuesta)
	if(estado === "success"){
		misDatos = respuesta;
		localStorage.setItem('rtaAPI', JSON.stringify(misDatos));
		current = misDatos.current
		minutely = misDatos.minutely
		hourly = misDatos.hourly
		daily = misDatos.daily
		alerts = misDatos.alerts

		// console.log("variables a partir de misDatos")
		// console.log(current)
		// console.log(minutely)
		// console.log(hourly)
		// console.log(daily)
		console.log(alerts)
		renderCurrent()

		badge(`CLIMA ${current.temp}º ST ${current.feels_like}º`,temp)
		}
	});
};





function renderCurrent(){
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
							<a id="actualizar" href="/" class="btn btn-primary">Actualizar</a>
						</div>
						<div class="card-footer text-muted">
							${dateActualizacion}
						</div>
					</div>
					`
	clima.appendChild(card)
};


		// console.log(daily)

		let carrousel = document.createElement('article')
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
			card.className = "carousel-item";
			card.innerHTML =
							`
								<div class="card d-block ">
									<div class="card-body text-center">
										
										<h6 class="card-subtitle mb-2 text-muted">${new Date(list.dt*1000)}</h6>
										<h5 class="card-title">${list.temp.day}ºC</h5>
										<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

									</div>
								</div>
							`
			carouselInner.appendChild(card);
		
		});

		 $('#carouselInner div').first().addClass('active');

$('#actualizar').click(obtenerAPI());
});

