// CONSTANTES PARA ITERAR DATE
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

// DATE
var f = new Date();

// URL DE LA API OPENWEATHER
const APIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=-34.84&lon=-58.37&lang=sp&units=metric&appid=7f0a3742fd58ecbb39f4104f191a5716"; 

// EVALÚO SI HAY DATOS EN LOCAL STORAGE, O SIN ESTAN ACTUALIZADOS A 10MIN MAX DE LA HORA ACTUAL, PARA RENDERIZAR O LLAMAR A LA API
if ((JSON.parse(localStorage.getItem('rtaAPI'))) != null){
		let {current: {dt, temp, feels_like}} = JSON.parse(localStorage.getItem('rtaAPI'));
		if ((Date.now() - (dt*1000)) > 600000) {
			obtenerAPI();
		}else{
			renderCurrent();
			badge(`CLIMA T ${temp}º ST ${feels_like}º`,idTemp);
		}
}else{
	obtenerAPI();
};

// OBTENGO DATOS DE API Y LOS ALMACENA EN LOCALSTORAGE Y EJECUTO RENDERCURRENT
function obtenerAPI(){
	$.get(APIURL, function (respuesta, estado){
	if(estado === "success"){
		localStorage.setItem('rtaAPI', JSON.stringify(respuesta));
		let {current: {dt, temp, feels_like}} = respuesta;
		clear(clima);
		renderCurrent();
		badge(`CLIMA T ${temp}º ST ${feels_like}º`,idTemp);
		};
	});
};

// RENDERIZA TODA LA SECCION CLIMA A PARTIR DEL LOCAL STORAGE
function renderCurrent(){
	let {timezone, current: {dt, temp, feels_like, weather, sunrise, sunset, pressure, humidity, dew_point}, daily, alerts} = JSON.parse(localStorage.getItem('rtaAPI'));
	let [elem] = weather;
	let {description, icon} = elem;
	let timeZone = timezone.split('/');
	let ciudad = timeZone[timeZone.length -1];
	f = new Date();
	let descripcion = description.charAt(0).toUpperCase()+description.slice(1);
	let dateActualizacion = new Date(dt*1000);
	let amanecer = new Date(sunrise*1000);
	let atardecer = new Date(sunset*1000);
	let card = document.createElement('article')
	card.innerHTML =`
					<div class="card">
						<div class="card-group ">
								<div class="card border-0 p-1">
									<div class="card-header d-inline-flex justify-content-between">
										<p class="text-muted mb-0 pb-0">${ciudad}</p>
										<a id="actualizar" href="#" class="btn btn-sm btn-primary">Actualizar</a>
									</div>
										<div class="row">
											<div class="card-body pt-1 pb-0">
												<p class="m-0 p-0">
												${Dias[dateActualizacion.getDay()]}
												${dateActualizacion.getDate()} 
												de ${Meses[dateActualizacion.getMonth()]} 
												${f.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}hs
												</p>

												<div class="d-flex flex-column align-items-end mt-2">
													<h1 class="card-title mb-0">${temp}ºC</h1>
													<h6>ST: ${feels_like}ºC</h6>
												</div>

												<p class="m-0 p-0">Presión: ${pressure}hPa</p>
												<p class="m-0 p-0">Humedad: ${humidity}%</p>
												<p class="m-0 p-0">Punto de rocío: ${dew_point}ºc</p>

											</div>
											<div class="card-body text-center pt-1 pb-0">
												<h3 class="card-title mt-2">${descripcion}</h3>
												<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="100px">
												<p class="card-title">
													Amanecer ${amanecer.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
													/ Atardecer ${atardecer.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
												</p>
											</div>

										</div>
									<div class="card-footer text-muted text-small">
										Actualizado el ${Dias[dateActualizacion.getDay()]} 
										${dateActualizacion.getDate()} 
										de ${Meses[dateActualizacion.getMonth()]} 
										a las ${dateActualizacion.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
									</div>
								</div>
						</div>
					</div>

					`
	clima.appendChild(card);
	document.getElementById("actualizar").onclick = function(){ obtenerAPI()};
// CREA DOM CAROUSEL PREVIO A LOS CAROUSEL-ITEM
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
	clima.appendChild(carrousel);
// MEDIANTE forEach CREO LOS CAROUSEL-ITEM DEL CAROUSEL
	daily.forEach(list => {
		descriptionDaily = list.weather[0].description;
		descripcionDaily = descriptionDaily.charAt(0).toUpperCase()+descriptionDaily.slice(1);
		sunriseDaily = new Date(list.sunrise*1000);
		sunsetDaily = new Date(list.sunset*1000)
		let card = document.createElement('div');
		let fecha = new Date(list.dt*1000);
		card.className = "carousel-item";
		card.innerHTML =`
							<div class="card d-block ">
								<div class="card-body">
									<h6 class="card-title">
										${Dias[fecha.getDay()]} 
										${fecha.getDate()} 
										de ${Meses[fecha.getMonth()]} 
										a las ${fecha.toLocaleTimeString()}
									</h6>
									<div class="row">
										<div class="card-body text-center pt-1 pb-0">
											<p class="m-0 p-0">${descripcionDaily}</p>
											<img src="http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png" alt="${list.weather.description}" width="100px">
											<h5 class="card-title">${list.temp.day}ºC</h5>
										</div>
										<div class="card-body pt-1 pb-0">
											<p class="m-0 p-0">Sensación Termica: ${list.feels_like.day}ºc</p>
											<p class="m-0 p-0">Amanecer: ${sunriseDaily.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
											<p class="m-0 p-0">Atardecer: ${sunsetDaily.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
											<p class="m-0 p-0">Presión: ${list.pressure}hPa</p> 
											<p class="m-0 p-0">Humedad: ${list.humidity}%</p> 
											<p class="m-0 p-0">Punto de rocío: ${list.dew_point}ºc</p> 
										</div>	
									</div>										
											<p class="card-text text-center">
											</p>
								</div>
							</div>
						`
		carouselInner.appendChild(card);
	});
	$('#carouselInner div').first().addClass('active');
};