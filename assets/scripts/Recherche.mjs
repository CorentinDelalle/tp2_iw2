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


    // fonction qui recherche une correspondance entre la valeur recherchée et les données
    async rechercheRues(params){
        if (params.length != 0){
            let aRecherche;
            let data = await fetch('assets/data/rues.json');
            data = await data.json();
            if(params.nom == 'NOM_PROJET'){
                aRecherche = data.filter(function(uneRue){
                    let res = false,
                    nomProjet = uneRue.NOM_PROJET.toLowerCase(),
                    nomRecherche = params.valeur.toLowerCase();
                if (nomProjet.indexOf(nomRecherche) >= 0){
                    res = true;
                }
            return res;
            }) 
            params.cb(aRecherche);
            }
        }
    }

    /**
     * Permet de faire le rendu du catalogue dans l'application en fonction des données de la recherche
     */

}