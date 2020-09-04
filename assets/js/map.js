var maps = {
	mymap : "",
	marker :  "",

	nullstation : document.getElementById('nullstation'),
	formulaire : document.getElementById('reservation_1'),
	formulaire2 : document.getElementById('reservation_2'),

	h3name : document.getElementById('h3name'),
	padresse : document.getElementById('padresse'),
	pvelo : document.getElementById('pvelo'),
	pplace : document.getElementById('pplace'),

	lat : Number(),
	lng : Number(),

	vDispo : Number(),
	addressStation : "",
	placeStation : "",
	nameStation : "",
	nameStation2 : sessionStorage.getItem("StationName"),
	statusStation : "",

	markerOpenAdd(){
		openIcon = L.icon({
			iconUrl: 'assets/icon/open.png',

			iconSize:     [38, 38],
			iconAnchor:   [22, 37],
		});
		this.marker = L.marker([this.lat, this.lng], {icon: openIcon}).addTo(this.mymap);
	},

	markerClosedAdd(){
		closedIcon = L.icon({
			iconUrl: 'assets/icon/closed.png',
			
			iconSize:     [38, 38],
			iconAnchor:   [22, 37],
		});
		this.marker = L.marker([this.lat, this.lng], {icon: closedIcon}).addTo(this.mymap);
	},

	markerBuildAdd(){
		buildIcon = L.icon({
			iconUrl: 'assets/icon/work.png',
			
			iconSize:     [38, 38],
			iconAnchor:   [22, 37],
		});
		this.marker = L.marker([this.lat, this.lng], {icon: buildIcon}).addTo(this.mymap);
	},

	markerRuptureAdd(){
		RuptureIcon = L.icon({
			iconUrl: 'assets/icon/stockend.png',
			
			iconSize:     [38, 38],
			iconAnchor:   [22, 37],
		});
		this.marker = L.marker([this.lat, this.lng], {icon: RuptureIcon}).addTo(this.mymap);
	},

	initMap(){

		this.mymap = L.map('mapid').setView([47.218371, -1.553621], 13);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiZ29kcmFkZSIsImEiOiJjanp5dDF1bTUwazE5M21xdDM4eWs4aDg3In0.ScKYdQCEER2NQ2wNF_f1Kg'
	}).addTo(this.mymap);

	},

	apiMap(){

		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=3004d8625ccf4f882979d8301b4c7ff6aa98206c", function (reponse) {
			const info = JSON.parse(reponse);

			for (let i = 0; i < info.length; i++) {

				maps.lat = info[i].position.lat;
				maps.lng = info[i].position.lng;

				if(info[i].status === "OPEN"){
					if(info[i].available_bikes === 0){
						maps.markerRuptureAdd();
					}else{
					maps.markerOpenAdd();
					}
				}else if(info[i].status === "CLOSED"){
					maps.markerClosedAdd();
				}else {
					maps.markerBuildAdd();
				}

				btnElt = document.createElement('button');

				$(maps.marker).click(function(){
					maps.nameStation = info[i].name;
					maps.addressStation = info[i].address;
					maps.vDispo = info[i].available_bikes;
					maps.placeStation = info[i].bike_stands;
					maps.statusStation = info[i].status;

					maps.systemForm();
				});
			}
		})
	},

	systemForm(){
		maps.nullstation.style.display = "none";

		if(maps.statusStation !== "OPEN"){
			maps.formulaire.style.display = "none";
			maps.formulaire2.style.display = "none";

			maps.padresse.textContent = `Réservation impossible station fermer ou en travaux !`
			maps.pvelo.textContent = ``
			maps.pplace.textContent = ``

		}else if(maps.vDispo === 0){
			maps.formulaire.style.display = "none";
			maps.formulaire2.style.display = "none";

			maps.padresse.textContent = `Réservation impossible vélo indisponible !`
			maps.pvelo.textContent = ``
			maps.pplace.textContent = ``

		}else{
			maps.formulaire.style.display = "block";

			if(maps.nameStation === sessionStorage.getItem("StationName")){
				maps.padresse.textContent = `Adresse : ${maps.addressStation}`
				maps.pvelo.textContent = `Vélo disponible : ${sessionStorage.getItem("VéloDisponible")}`
				maps.pplace.textContent = `Places : ${maps.placeStation}`
			}else{
				maps.padresse.textContent = `Adresse : ${maps.addressStation}`
				maps.pvelo.textContent = `Vélo disponible : ${maps.vDispo}`
				maps.pplace.textContent = `Places : ${maps.placeStation}`
			}
		}
		
	},
}
