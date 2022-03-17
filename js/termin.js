export default class Termin {

    #id;
    #bezeichnung;
    #adresse;
    #datum;
    #zeitslot;
    #moeglichePlaetze;
    #anmeldungen;
    #angemeldetePersonen

    /**
     * Erstellt eine Instanz eines Termins
     * @constructor
     * @param {number} id
     * @param {string} bezeichnung
     * @param {string} adresse
     * @param {string} datum
     * @param {string} zeitslot
     * @param {number} moeglichePlaetze
     * @param {number} anmeldungen
     */
    constructor({id, bezeichnung, adresse, datum, zeitslot, moeglichePlaetze}) {
        this.#id = id;
        this.#bezeichnung = bezeichnung;
        this.#adresse = adresse;
        this.#datum = datum;
        this.#zeitslot = zeitslot;
        this.#moeglichePlaetze = moeglichePlaetze;
        this.#anmeldungen = 0;
        this.#angemeldetePersonen = [];
    }

    /**
     * Funktion liefert die eingetragene Person eines Impftermins anhand der mitgegebenen Person ID
     * @param personId
     * @returns {any} gefundene Person
     */
    getPersonById(personId){
        for(let i of this.#angemeldetePersonen.values()){
            if(i.personId == personId){
                return i;
            }
        }
    }

    /**
     * Funkttion liefert die ID eines Termins
     * @returns {*}
     */
    get id(){
        return this.#id;
    }

    /**
     * Funkttion liefert die möglichen Plätze eines Termins
     * @returns {*}
     */
    get moeglichePlaetze(){
        return this.#moeglichePlaetze;
    }

    /**
     * Funkttion liefert die Anmeldungen eines Termins
     * @returns {*}
     */
    get anmeldungen(){
        return this.#anmeldungen;
    }

    /**
     * Funktion fügt einen Impfwilligen in die Liste der angemeldeten Personen hinzu
     * @param {Impfwilliger} impfwilliger
     */
    addImpfwilligen(impfwilliger){
        this.#angemeldetePersonen.push(impfwilliger);
        this.#anmeldungen++;
    }

    /**
     * Funktion gibt die Termin-Eintrag in der Tabelle grafisch aus
     */
    print(){
        let neuerTermin = $(`
            <tr id="termin_${this.#id}">
                <td>${this.#bezeichnung}</td>
                <td>${this.#adresse}</td>
                <td>${this.#datum}</td>
                <td>${this.#zeitslot}</td>
                <td>${this.#moeglichePlaetze}</td>
                <td>${this.#anmeldungen}</td>
                <td>
                    <button type="button" class="btn btn-success" data-toggle="modal" 
                    data-target="#popUp_Termin${this.#id}">Verabreichung</button>
                    <button type="button" class="btn btn-danger">löschen</button>
                </td>
            </tr>
        `);

        $("table.table tbody").append(neuerTermin);
    }

    /**
     * Funktion gibt das PopUp und die angemeldeten Personen eines Termins im PopUp grafisch aus
     */
    printPopUp(){
        let div = $(`
            <div class="modal fade" id="popUp_Termin${this.#id}" tabindex="-1" role="dialog" 
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Impfung verabreicht?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        </div>
                    </div>
                </div>
             </div>
        `);

        $("#anmeldungen").append(div);

        if(this.#angemeldetePersonen.length != 0){
            for(let impfwilliger of this.#angemeldetePersonen.values()){
                impfwilliger.print(this.#id);
            }
        }
        else{
            //Keine Anmeldungen sind vorhanden
            $("#popUp_Termin" + this.#id + " .modal-body").append("Zu diesem Termin sind keine Personen angemeldet.");
        }
    }
}