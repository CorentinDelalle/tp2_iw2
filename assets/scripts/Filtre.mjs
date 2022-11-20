export default class Filtre{
    /**
     * Contient le noeud d'insertion du composant
     * @type HtmlElement
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
     * Configuration de la classe Filtre
     * @param {HTMLElement} domParent 
     */
    constructor(domParent){
        this.domParent = domParent;

    }

    /**
     * 
     * @param {Array} data 
     * @param {Object} oCatFiltre 
     * @param {String} oCatFiltre.cat - Nom de la propriété à filtrer
     * @param {String} oCatFiltre.valeur - Valeur pour le filtre
     * @returns {Array} - Les données filtrées
     */
    async appliquerFiltre(params){
        let data = await fetch('assets/data/rues.json');
        data = await data.json();
        const aRuesFiltre = data.filter((rues)=>{
            return (rues[params.cat] == params.valeur);
        });
        params.cb(aRuesFiltre);
    }

    /**
     * Création des valeurs de filtre
     * @param {Array} data 
     */
    async setCat(){
        
        let data = await fetch('assets/data/rues.json');
        data = await data.json();
        let valeurFiltre = [];
        data.forEach((axe)=>{
            valeurFiltre.push(axe.TYPE_AXE);
        })


        valeurFiltre = [...new Set(valeurFiltre)];
        data = [];

        // Crée le tableau des valeurs de filtre (pour afficher dans le DOM)
        valeurFiltre.forEach((element)=>{
            data.push(
                {
                    valeur : element, 
                    etiquette : element
                });
        });
        return data;
    }

    /**
     * Permet de faire le rendu des filtres dans l'application en fonction des données du filtre
  
    rendu(){
        let chaineHTML = `<div>Type d'axe<span class="material-icons">arrow_drop_down</span>`;
                
        this.#aData.forEach(cat => {
            chaineHTML += `<li class="choixFiltre" data-js-cat="TYPE_AXE" data-js-cat-valeur="${cat.valeur}" 
                                data-js-actif="0">${cat.etiquette}</li>`
        });
        chaineHTML += `</div>`;
        this.domParent.innerHTML = chaineHTML;
    }   */
}