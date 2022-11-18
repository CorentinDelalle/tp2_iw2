export default class Tri{
    /**
     * Contient le noeud d'insertion du composant
     * @type {HTMLElement}
     * @public
     */
    domParent;

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
    setRues(data){
        this.#aData = data;
        console.log(this.#aData);
    }

    //fonction de tri
    listeTri(params) {

        let aRecherche;

        // tri des arrondissements en ordre alphabétique ascendant
        if (params.type == 'ARRONDISSEMENT' && params.valeur == 'ASC'){
            aRecherche = this.#aData.sort(function (a, b) {
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
            aRecherche = this.#aData.sort(function (a, b) {
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
            aRecherche = this.#aData.sort(function (a, b) {
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
            aRecherche = this.#aData.sort(function (a, b) {
                if (a.HIERARCHIE_ROUTIERE < b.HIERARCHIE_ROUTIERE) {
                return -1;
                }
                if (a.HIERARCHIE_ROUTIERE > b.HIERARCHIE_ROUTIERE) {
                return 1;
                }
                return 0;
            });
        }
        return aRecherche;
    }

    /**
     * Permet de faire le rendu du catalogue dans l'application en fonction des données du tri
     */
    rendu(){
        let chaineHTML = '';
        this.#aData.forEach(rues => {
                chaineHTML += `<article class="carte">
                                <header>
                                    <h4>${rues.NOM_PROJET} <small>(${rues.ARRONDISSEMENT})</small></h4>
                                    
                                </header>
                                <img src="${rues.PHOTO}">
                                <div class="contenu">
                                    <p><i>${rues.TYPE_REPARTAGE}</i></p>
                                    <p><strong>Hiérarchie routière : </strong>${rues.HIERARCHIE_ROUTIERE}</p>
                                    <p><strong>Année d'implantation : </strong>${rues.ANNEE_IMPLANTATION_1}</p>
                                    <p><strong>Attrait(s) :</strong> ${rues.ATTRAIT}</p>
                                    
                                </div>
                                
                                <footer class="action"><button class="boutonModal" data-js-id="${rues.ID_PROJET}">Plus d'informations</button></footer>
                            </article>`
        });

        

        this.domParent.innerHTML = chaineHTML;
    }
}