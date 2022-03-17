import Verwaltung from "./verwaltung.js";

/**
 * Start der Anwendung "Österreich impft!"
 */

//Die Anwendung wird als Property dem Browserwindow zugefügt, damit sie von der Konsole aus aufgerufen werden kann
window.verwaltung = new Verwaltung();

//Dialogfeld zum Termin-Erstellen zu Beginn der Anwendung verstecken
$('#neuerTermin').hide();


/**
 * Startet die Applikation, sobald das statische Dokument geladen ist
 */
$(document).ready(function (){

    //Initialisieren der Impftermin-Verwaltung
    verwaltung.init();

    //Dialogfeld "Termin erstellen" bei Klick auf "neuen Termin erstellen" einblenden
    $("#terminErstellen").click(function (e) {
        showTerminErstellen(e);
    });
});


/**
 * Funktion blendet das Dialogfeld "Termin erstellen" ein und aus
 * @param e ist der geklickte Button "neuen Termin erstellen"
 */
function showTerminErstellen(e){
    $('#neuerTermin').slideToggle();

    //console.log(e.currentTarget.innerText);
    if(e.currentTarget.innerText === "neuen Termin erstellen"){
        e.currentTarget.innerText = "schließen";
    }
    else
    {
        e.currentTarget.innerText = "neuen Termin erstellen";
    }

}