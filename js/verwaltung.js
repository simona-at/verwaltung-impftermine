import Terminliste from "./terminliste.js";
import Termin from "./termin.js";
import Impfwilliger from "./impfwilliger.js";
import {terminIdCounter} from "./terminliste.js";



export default class Verwaltung {

    //Terminliste beinhaltet alle Termine
    #terminliste;

    //AdminId ist die ID des aktuellen Admins, der das Verwaltungssystem bedient
    #adminId;


    /**
     * Erstellt eine Instanz der Verwaltung
     * @constructor
     */
    constructor() {
        this.#terminliste = new Terminliste();
        this.#adminId = 0;
    }


    /**
     * Initialisiertt alle verwendeten Funktionen
     */
    init(){
        this.#addTermin();
        this.#enableDeleteBtn();
        this.#checkStatus();
        this.#loadFromJSON();
    }


    /**
     * Funktion ermöglicht das Hinzufügen neuer Termine über das Dialogfeld
     */
    #addTermin(){
        $("#neuenTerminSpeichern").click(function(){

            let bezeichnung = $("#bezeichnung").val();
            let adresse = $("#adresse").val();
            let date = $("#datum").val();
            let zeitslot = $("#zeitslot").val();
            let moeglichePlaetze = $("#anzahl").val();

            let id = terminIdCounter;
            let anmeldungen = 0;

            //Validation
            let heute = todaysDate();
            if(bezeichnung != "" && adresse != "" && date >= heute && zeitslot != "" && moeglichePlaetze > 0){

                let dateComponents = date.split("-");
                let datum = dateComponents[2] + "." + dateComponents[1] + "." + dateComponents[0];

                let neuerTermin = new Termin({id, bezeichnung, adresse, datum, zeitslot, moeglichePlaetze, anmeldungen});
                verwaltung.#terminliste.addTermin(neuerTermin);
                verwaltung.#terminliste.print();
                verwaltung.#enableDeleteBtn();
            }
            else{
                alert("Um einen neuen Termin zu erstellen, müssen in allen Feldern gültige Werte angegeben sein.");
            }
        });
    }


    /**
     * Funktion ermöglicht das Löschen einzelner Termine in der Tabelle, wenn keine Anmeldungen vorhanden sind
     */
    #enableDeleteBtn(){
        $("tr").on("click", "button.btn-danger", (e)=>{

            let parentElement = e.currentTarget.parentElement.parentElement;
            let idString = parentElement.id;
            let id = idString.replace("termin_","");
            let terminId = parseInt(id);
            let anmeldezahl = $(parentElement).children().eq(5).html();

            if(anmeldezahl == 0) this.#terminliste.deleteTermin(terminId, parentElement);
            else alert("Termin kann nicht gelöscht werden, da Anmeldungen vorhanden sind.");
        });
    }


    /**
     * Funktion ermöglicht das Setzen des Impfstatus auf true oder false mittels abhaken einer Checkbox
     */
    #checkStatus(){
        $("div").on("click", "input[type=checkbox]", (e)=>{

            let checkbox = e.currentTarget;
            let idString = checkbox.id;
            let id = idString.replace("verabreichung_","");
            let personId = parseInt(id);

            let impfwilliger = this.#terminliste.getPersonById(personId);

            //Status auf true oder false setzen
            if(impfwilliger.impfstatus) impfwilliger.impfstatus = false;
            else impfwilliger.impfstatus = true;

            //Bestätigung über die Konsole
            console.log("Impfstatus der Person mit der ID \"" + personId + "\" wurde zu \"" + impfwilliger.impfstatus + "\" geändert.");
        });

    }

    /**
     * Funktion lädt alle bereits bestehenden Termine aus einem JSON-File, fügt die angemeldeten Personen hinzu
     * und druckt sowohl die Termine in der Tabelle, als auch die Personen im PopUp-Fenster aus
     */
    #loadFromJSON(){
        fetch("./json/termine.json").then((response)=>{
            return response.json();
        }).then(data =>{
            this.#adminId = data.adminId;
            for(let termin of data.termine){
                let neuerTermin = new Termin(termin);
                this.#terminliste.addTermin(neuerTermin);
                this.addPersonenToTermin(neuerTermin, termin);
            }
            this.#terminliste.print();
            this.#enableDeleteBtn();
        });
    }

    /**
     * Funktion fügt Personen zu einem Termin hinzu
     * @param {Termin} neuerTermin
     * @param {Termin} jsonTermin
     */
    addPersonenToTermin(neuerTermin, jsonTermin){
        for(let person of jsonTermin.angemeldetePersonen){
            let impfwilliger = new Impfwilliger(person);
            neuerTermin.addImpfwilligen(impfwilliger);
        }
    }

    /**
     * Funktion ermöglicht das Anmelden einer Person zu einem Impftermin, insofern noch Plätze frei sind (über die Konsole)
     * @param {number} terminId
     * @param {number }personId
     * @param {string} vorname
     * @param {string} nachname
     * @param {boolean} impfstatus
     * @returns {string} Ausgabe auf der Konsole
     */
    personAnmelden(terminId, personId, vorname, nachname, impfstatus){
        let impfwilliger = new Impfwilliger({personId, vorname, nachname, impfstatus});
        let termin = this.#terminliste.getTerminById(terminId);

        if(termin.anmeldungen < termin.moeglichePlaetze){
            termin.addImpfwilligen(impfwilliger);
            this.#terminliste.print();
            return vorname + " " + nachname + " wurde erfolgreich hinzugefügt.";
        }
        else{
            return vorname + " " + nachname + " konnte nicht hinzugefügt werden, da keine freien Plätze mehr verfügbar sind.";
        }

        //Die Methode kann über die Konsole wie folgt aufgerufen werden:
        //verwaltung.personAnmelden(2, 13, "Simona", "Ascher", true)
    }
}


/**
 * Funktion erzeugt das heutige Datum im Format YYYY-MM-DD und gibt es zurück
 * @returns {string}
 */
function todaysDate() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let heute = today.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;
    return heute;
}
