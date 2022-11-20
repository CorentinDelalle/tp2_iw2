export default class Tri{
    /**
     * Contient le noeud d'insertion du composant
     * @type {HTMLElement}
     * @public
     */
    domParent;
    gabarit;

    /**
     * Les données du composant
     * @type {Array}
     * @private
     */
    #aData;
    /**
     * Configuration de la classe Tri
     * @param {HTMLElement} domParent 
     */
    constructor(domParent){
        // Assigne le noeud sur lequel le composant sera attaché
        this.domParent = domParent;
    }
    /**
     * Mutateur (setter) des rues du tri
     * @param {Array} data - Le tableau des rues
     */


    //fonction de tri
    async listeTri(params) {

        let aRecherche;
        let data = await fetch('assets/data/rues.json');
        data = await data.json();

        // tri des arrondissements en ordre alphabétique ascendant
        if (params.type == 'ARRONDISSEMENT' && params.valeur == 'ASC'){
            aRecherche = data.sort(function (a, b) {
                if (a.ARRONDISSEMENT > b.ARRONDISSEMENT) {
                return -1;
                }
                if (a.ARRONDISSEMENT < b.ARRONDISSEMENT) {
                return 1;
                }
                return 0;
            });
        }

        // tri des arrondissements en ordre alphabétique descendant
        if (params.type == 'ARRONDISSEMENT' && params.valeur == 'DESC'){
            aRecherche = data.sort(function (a, b) {
                if (a.ARRONDISSEMENT < b.ARRONDISSEMENT) {
                return -1;
                }
                if (a.ARRONDISSEMENT > b.ARRONDISSEMENT) {
                return 1;
                }
                return 0;
            });
        }

        // tri de la hierachie routière en ordre alphabétique ascendant
        if (params.type == 'HIERARCHIE_ROUTIERE' && params.valeur == 'ASC'){
            aRecherche = data.sort(function (a, b) {
                if (a.HIERARCHIE_ROUTIERE > b.HIERARCHIE_ROUTIERE) {
                return -1;
                }
                if (a.HIERARCHIE_ROUTIERE < b.HIERARCHIE_ROUTIERE) {
                return 1;
                }
                return 0;
            });
        }

        // tri de la hierachie routière en ordre alphabétique descendant
        if (params.type == 'HIERARCHIE_ROUTIERE' && params.valeur == 'DESC'){
            aRecherche = data.sort(function (a, b) {
                if (a.HIERARCHIE_ROUTIERE < b.HIERARCHIE_ROUTIERE) {
                return -1;
                }
                if (a.HIERARCHIE_ROUTIERE > b.HIERARCHIE_ROUTIERE) {
                return 1;
                }
                return 0;
            });
        }
        params.cb(aRecherche);;
    }


}