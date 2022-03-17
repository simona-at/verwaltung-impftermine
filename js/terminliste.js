/**
 * Zählt die ID’s der zu erstellenden Termine hoch
 * @type {number}
 */
let terminIdCounter = 1;

export {
    terminIdCounter
}



export default class Terminliste {

    //Terminliste beinhaltet alle Termine
    #terminliste;

    /**
     * Erstellt eine Instanz einer Terminliste
     * @constructor
     */
    constructor() {
        this.#terminliste = new Map();
    }

    /**
     * Funktion fügt einen neuen Termin in die Terminliste ein
     * @param {Termin} neuerTermin
     */
    addTermin(neuerTermin){
        this.#terminliste.set(neuerTermin.id, neuerTermin);
        terminIdCounter++;
    }

    /**
     * Funktion liefert den Termin anhand der mitgegebenen Termin ID
     * @param terminId
     * @returns {*} gefundenen Termin
     */
    getTerminById(terminId){
        return this.#terminliste.get(terminId);
    }

    /**
     * Funktion liefert die eingetragene Person eines Impftermins anhand der mitgegebenen Person ID
     * @param personId
     * @returns {*|any} gefundene Person
     */
    getPersonById(personId){
        for(let i of this.#terminliste.values()){
            let person = i.getPersonById(personId);
            if(person){
                return person;
            }
        }
    }

    /**
     * Funktion gibt die Termin-Eintrag in der Tabelle und die angemeldeten Personen im PopUp grafisch aus
     */
    print(){
        $("table.table tbody").empty();
        $("#anmeldungen").empty();

        for(let termin of this.#terminliste.values()){
            termin.print();
            termin.printPopUp();
        }
    }

    /**
     * Funktion löscht einen Termin in der Tabelle
     * @param terminId ID des Termins, der gelöscht werden soll
     * @param parentElement Zeile in der Tabelle, die gelöscht werden soll
     */
    deleteTermin(terminId, parentElement){
        this.#terminliste.delete(terminId);
        parentElement.remove();
    }
}