// SLIDER
const Tableau = [
    {url : "assets/img/0.jpg"},
    {url : "assets/img/1.jpg"},
    {url : "assets/img/2.jpg"},
    {url : "assets/img/3.jpg"}
  ];
var diapo1 = new Diaporama(5000, Tableau, 'slider1');

const Tableau2 = [
    {url : "assets/img/0.jpg"},
    {url : "assets/img/1.jpg"},
    {url : "assets/img/2.jpg"},
    {url : "assets/img/3.jpg"}
  ];
var diapo2 = new Diaporama(1000, Tableau2, 'slider2');

    // MAPS
    maps.initMap();
    maps.apiMap();

    // RESERVATION
    reservation.localNameCheck();
    reservation.checkReservation();

    $('#form_contact').submit(function(e){
        reservation.localName();

        reservation.canvasBlock.style.display = "block";
        reservation.btnClick.style.display = "none";
        
        e.preventDefault();
    });

    $('#btnConfirm').click(function(e){
        reservation.startReservation();
    }); 

    $('#annuler').click(function(e){
        reservation.annuler();
    }); 


    // CANVAS
    canvasE.initCanvas();
