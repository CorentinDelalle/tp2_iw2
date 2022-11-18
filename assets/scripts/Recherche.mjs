export default class Recherche{
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
     * Configuration de la classe Recherche
     * @param {HTMLElement} domParent 
     */
    constructor(domParent){
        // Assigne le noeud sur lequel le composant sera attaché
        this.domParent = domParent;
    }
    /**
     * Mutateur (setter) des rues de la recherche
     * @param {Array} data - Le tableau des rues
     */
    setRues(data){
        this.#aData = data;
        console.log(this.#aData);
    }

    // fonction qui recherche une correspondance entre la valeur recherchée et les données
    rechercheRues(params){
        let aRecherche;
        if(params.nom == 'NOM_PROJET'){
            aRecherche = this.#aData.filter(function(uneRue){
                let res = false,
                nomProjet = uneRue.NOM_PROJET.toLowerCase(),
                nomRecherche = params.valeur.toLowerCase();
            if (nomProjet.indexOf(nomRecherche) >= 0){
                res = true;
            }
    return res;
    }) 
        return aRecherche;
        }
    }

    /**
     * Permet de faire le rendu du catalogue dans l'application en fonction des données de la recherche
     */
    rendu(){
        let chaineHTML = "";
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