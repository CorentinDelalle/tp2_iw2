import DataFetch from "./DataFetch.mjs";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Modal from "./Modal.mjs";
import Recherche from "./Recherche.mjs";
import Tri from "./Tri.mjs";


export default class App{
  /**
   * contient les données propres à l'application
   */
  #aData;
  
  constructor(){
    this.oData = new DataFetch();
    this.oData.getData((data)=>{
      this.#aData = data;

      const noeudCatalogue = document.querySelector(".catalogue");
      const noeudFiltre = document.querySelector(".liste-axe");
      const noeudModal = document.querySelector('.sectionModal');

      const btnTriArrondissement = document.querySelector(".btn-tri-arrondissement");
      const btnTriHierarchie = document.querySelector(".btn-tri-hierarchie");
      const btnRecherche = document.querySelector('.btn-rechercher');
      const btnListe = document.querySelector('.bouton-liste');
      const btnGalerie = document.querySelector('.bouton-galerie');

      // Instanciation du catalogue
      const oCatalogue = new Catalogue(noeudCatalogue);           
      oCatalogue.setRues(this.#aData);       
      oCatalogue.rendu();                     

      // Instanciation du filtre
      const oFiltre = new Filtre(noeudFiltre);    
      const oElem = {
        type : "TYPE_AXE", 
      }
      oFiltre.setCat(this.#aData, oElem);
      oFiltre.rendu();

      // Instanciation de la recherche
      const oRecherche = new Recherche(noeudCatalogue);
      oRecherche.setRues(this.#aData); 
      oRecherche.rendu();

      // Instanciation du tri
      const oTri = new Tri(noeudCatalogue);
      oTri.setRues(this.#aData);
      oTri.rendu();

      // Instanciation du modal
      const oModal = new Modal(noeudModal);
      oModal.setRues(this.#aData);

      // Gestion du modal
      noeudCatalogue.addEventListener('click',(e)=>{
        let cible = e.target;
        let cibleId = e.target.dataset.jsId;

        if (cible.classList.contains('boutonModal')){
          oModal.setRues(this.#aData);
          let resultat = oModal.infoModal(cibleId);
          oModal.setRues(resultat);
          oModal.renduModal();
          let btnFermeModal = document.querySelector('.btn-ferme-modal');
          oModal.fermeModal(btnFermeModal)
        }
      })

      // Gestion du filtre
      noeudFiltre.addEventListener("click", (e)=>{
          let cible = e.target;   
          if(cible.classList.contains("choixFiltre")){ 
              const dataFiltre = {    
                                  cat : cible.dataset.jsCat,
                                  valeur : cible.dataset.jsCatValeur
                                  };
              const aRuesFiltre = oFiltre.appliquerFiltre(this.#aData, dataFiltre);
              oCatalogue.setRues(aRuesFiltre);
              oCatalogue.rendu(); 
          }
      });

      // Gestion du tri par arrondissement
      btnTriArrondissement.addEventListener("click", ()=>{

          let recherche = {
            type: "ARRONDISSEMENT",
            valeur: ""
        }

        recherche.valeur = document.querySelector('input[type="radio"]:checked').value;
        let resultat = oTri.listeTri(recherche);
        oTri.setRues(resultat);
        oTri.rendu();
      });

      // Gestion du tri par hierarchie routière
      btnTriHierarchie.addEventListener('click', ()=>{

          let recherche = {
            type: 'HIERARCHIE_ROUTIERE',
            valeur: ''
        }

        recherche.valeur = document.querySelector('input[type="radio"]:checked').value;
        let resultat = oTri.listeTri(recherche);
        oTri.setRues(resultat);
        oTri.rendu();
      });

      // Gestion de la recherche sur une donnée
      btnRecherche.addEventListener('click', ()=>{
        let resultat;

        let recherche = {
          nom: 'NOM_PROJET',
          valeur: ''
        }

        recherche.valeur = document.querySelector('.champs-rechercher').value;
        resultat = oRecherche.rechercheRues(recherche);

        if (resultat.length != 0){
          oCatalogue.setRues(resultat);
          oCatalogue.rendu();
        }
      })

      // Gestion de l'affichage par liste ou galerie 
      btnListe.addEventListener('click', ()=>{
        document.querySelector('[data-js-catalogue]').classList.remove('catalogue');
        document.querySelector('[data-js-catalogue]').classList.add('catalogue-liste');
      })

      btnGalerie.addEventListener('click', ()=>{
        document.querySelector('[data-js-catalogue]').classList.remove('catalogue-liste');
        document.querySelector('[data-js-catalogue]').classList.add('catalogue');
      })


    })
}
}