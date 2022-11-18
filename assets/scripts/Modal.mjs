export default class Modal{

  /**
   * Les données du composant
   * @type {Array}
   * @private
   */
  #aData

  constructor(domParent){
      this.domParent = domParent;
  }

  setRues(data){
    this.#aData = data;
    console.log(this.#aData);
  }

  //récupère les infos du modal en fonction de la carte selectionné
  infoModal(params){
    let aRecherche;
        aRecherche = this.#aData.filter(function(uneRue){
            let res = false,
            idRue = uneRue.ID_PROJET,
            idRueRecherche = params;
            if (idRue == idRueRecherche ){
                res = true;
            }
        return res;
        }) 
    return aRecherche;
  }

  //Permet de créer le modal en fonction des données
  renduModal(){
    let chaineHTML = '';
    this.#aData.forEach(rues => {
    chaineHTML = `            
                  <dialog open class="modal">
                    <h3>${rues.NOM_PROJET}</h3>
                    <p><strong>Type de site d'intervention : </strong>${rues.TYPE_SITE_INTERVENTION}</p>
                    <p><strong>Passe de bus : </strong>${rues.PASSAGE_BUS}</p>
                    <p><strong>Voie cyclable : </strong>${rues.VOIE_CYCLABLE}</p>
                    <p><strong>Objectif thematique : </strong>${rues.OBJECTIF_THEMATIQUE}</p>
                    <button class="btn-ferme-modal">Fermer</button>
                  </dialog>`;
    })
    this.domParent.innerHTML = chaineHTML;
  }

  //ferme le modal suite au clic du bouton associé
  fermeModal(btnFermeModal){
    let modal = document.querySelector('dialog');

    btnFermeModal.addEventListener('click', ()=>{
      modal.close();
    })
  }

}