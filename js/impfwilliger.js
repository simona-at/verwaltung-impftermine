export default class Impfwilliger {

    #personId;
    #vorname;
    #nachname;
    #impfstatus;

    /**
     * Erstellt eine Instanz eines Impfwilligen
     * @constructor
     * @param {number} personId
     * @param {string} vorname
     * @param {string} nachname
     * @param {boolean} impfstatus
     */
    constructor({personId, vorname, nachname, impfstatus}) {
        this.#personId = personId;
        this.#vorname = vorname;
        this.#nachname = nachname;
        this.#impfstatus = impfstatus;
    }

    /**
     * Funkttion liefert die ID einer Person
     * @returns {*}
     */
    get personId(){
        return this.#personId;
    }

    /**
     * Funktion liefern den Impfstatus einer Person
     * @returns {*}
     */
    get impfstatus(){
        return this.#impfstatus;
    }

    /**
     * Funktion setzt den Impfstatus einer Person neu
     * @param impfstatus
     */
    set impfstatus(impfstatus){
        this.#impfstatus = impfstatus;
    }

    /**
     * Funktion gibt die angemeldeten Personen eines Termins im PopUp grafisch aus
     * @param parentId
     */
    print(parentId){

        let parent = "#popUp_Termin" + parentId + " .modal-body";

        let impfstatus = "";
        if(this.#impfstatus == true) impfstatus = "checked";

        let div = $(`
            <div id="person_${this.#personId}" class="row">
                <div class="col-10">
                    <label for="verabreichung_${this.#personId}">${this.#vorname} ${this.#nachname}</label>
                </div>
                <div class="col-2">
                    <input type="checkbox" name="verabreichung_${this.#personId}" id="verabreichung_${this.#personId}" ${impfstatus}>
                </div>
            </div>
        `);

        $(parent).append(div);
    }
}