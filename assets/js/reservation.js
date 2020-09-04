var reservation = {

    // Rerservation
    reservationStatut : sessionStorage.getItem("reservation"),
    stationBike : "",
    stationName : "",
    canvasCheck : "",

    stationAffichage : document.getElementById('station'),
    timerAffichage : document.getElementById('timerp'),
    
    // Formulaire
    nom : "",
    prenom : "",

    inputNom : document.getElementById('nom'),
    inputPrenom : document.getElementById('prenom'),
    canvasBlock : document.getElementById('reservation_2'),
    myReservation : document.getElementById('reserv'),
    btnClick : document.getElementById('btnClick'),
    confirmBlock : document.getElementById('confirmationBlock'),


    // Minuteur
    minute : 1,
    seconde : 0,
    temps : 1000,


    // PARTIE SYSTEM

    // On récupère les informations des Input pour les mèttre en LocalStorage
    localName(){
        const form = document.querySelector('form');

        this.nom = form.elements.nom.value;
        this.prenom = form.elements.prenom.value;

        localStorage.setItem("nom", this.nom);
        localStorage.setItem("prenom", this.prenom);
    },

    // On vérif si que localStorage n'est pas = a null pour pre remplire les input
    localNameCheck(){
        if(localStorage !== null){
            this.inputNom.value = localStorage.getItem("nom");
            this.inputPrenom.value = localStorage.getItem("prenom");
        }
    },

    // On vérif si une reservation est deja en cours
    checkReservation(){
        if(this.reservationStatut === "true"){
            this.seconde = sessionStorage.getItem('s');
            this.minute = sessionStorage.getItem('m');
            this.startTimer();
            this.affichageReservation();
            this.myReservation.style.display = "block";
        }
    },

    // On lance toute les function pour lancer la reservation
    startReservation(){
        if (reservation.canvasCheck !== "OK") {
            alert("Vous devez remplir le champ de signature pour continuer");
        }else{
            if (sessionStorage.getItem("reservation") === "true") {
                //Si OK alors on lance une nouvelle reservation sinon on fais rien
                reservation.confirmBlock.style.display = "block";
                $('#yes').click(function()
                {
                    reservation.stopTimer();
                    reservation.minute = 20;
                    reservation.seconde = 0;
                    reservation.informationReservation();
                    reservation.actionReservation();
                    reservation.confirmBlock.style.display = "none";
                });

                $('#no').click(function(){
                    reservation.confirmBlock.style.display = 'none';
                    reservation.annuler();
                });
            // Si reservationStatut n'est pas = a true alors on lance la reservation
            }else{
                this.informationReservation();
                this.actionReservation();
            }
        }
    },

    // On fais une selection des function requit pour la reservation 
    actionReservation(){
        this.annuler();
        reservation.reservationStatut = sessionStorage.setItem("reservation", "true");
        this.myReservation.style.display = "block";
        this.affichageReservation();
        this.startTimer();
    },

    // On retire le block du Canvas et re affiche le bouton suivant
    annuler(){
        this.btnClick.style.display = "block";
        this.canvasBlock.style.display = "none";
        canvasE.clear();
        this.canvasCheck = "";
    },

    // On set le nom de la station et le nombre de vélo pour la reservation
    informationReservation(){
        sessionStorage.setItem("StationName", maps.nameStation);
        sessionStorage.setItem("VéloDisponible", maps.vDispo -1);
        maps.pvelo.textContent = `Vélo disponible : ${sessionStorage.getItem("VéloDisponible")}`
    },

    // Texte a afficher durant la reservation
    affichageReservation(){
        this.stationAffichage.textContent = `Vélo réserver à la station ${sessionStorage.getItem("StationName")}, par ${localStorage.getItem("nom")} ${localStorage.getItem("prenom")}`;
    },

    // On stop le Timer
    stopTimer(){
        clearInterval(timer);
    },

    // On lance le timer
    startTimer(){
        timer = setTimeout(this.timerSystem, this.temps);
    },

    // On reset les secondes a 59
    resetSeconde(){
        this.seconde = 59
    },

    // System du timer
    timerSystem(){
        // Si seconde est plus petit que 1 on reset et suprime 1 a minute on set les sessions storage pour quand on refresh reprendre le temps restant
        // et relancer le timer
        if(reservation.seconde < 1){
            reservation.resetSeconde();
            reservation.minute--;
            this.timerp.textContent = `Temps restant : ${reservation.minute}m${reservation.seconde}s`;
            sessionStorage.setItem("s", reservation.seconde);
            sessionStorage.setItem("m", reservation.minute);
            reservation.startTimer();

            // Sinon on retire 1 à seconde on update les sessions et relance le timer
        }else{
            reservation.seconde--;
            this.timerp.textContent = `Temps restant : ${reservation.minute}m${reservation.seconde}s`;
            sessionStorage.setItem("s", reservation.seconde);
            sessionStorage.setItem("m", reservation.minute);
            reservation.startTimer();
        }
        // Si minute est plus petit que 0 on stop le timer & supprime les session storage de la reservation
        if(reservation.minute < 0){
            reservation.stopTimer();
            this.timerp.textContent = `Réservation terminée`;
            sessionStorage.removeItem("s");
            sessionStorage.removeItem("m");
            sessionStorage.removeItem("reservation");
        }
    },
}