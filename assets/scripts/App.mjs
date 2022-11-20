import DataFetch from "./DataFetch.mjs";
import Routeur from "./Routeur.mjs";
import Filtre from "./Filtre.mjs";
import Modal from "./Modal.mjs";
import Recherche from "./Recherche.mjs";
import Tri from "./Tri.mjs";
import Affichage from "./Affichage.mjs";


export default class App{
  /**
   * contient les données propres à l'application
   */
  #aData;
  
  constructor(){
    /*
    this.oData.getData((data)=>{
      this.coco(data)
      this.#aData = data;})*/

      const noeudCatalogue = document.querySelector(".catalogue");
      const noeudFiltre = document.querySelector(".liste-axe");

      const btnTriArrondissement = document.querySelector(".btn-tri-arrondissement");
      const btnTriHierarchie = document.querySelector(".btn-tri-hierarchie");
      const btnRecherche = document.querySelector('.btn-rechercher');
      const btnListe = document.querySelector('.bouton-liste');
      const btnGalerie = document.querySelector('.bouton-galerie');
      const gabarit = document.querySelector('#tmpl-affichage-catalogue');
      const gabaritFiltre = document.querySelector('#tmpl-affichage-filtre');


      this.routeur = new Routeur();
      this.routeur.ajouterRoute("recherche", this.routeRechercheNom.bind(this));
      this.routeur.ajouterRoute("liste", this.routeTriArrondissement.bind(this));
      this.routeur.ajouterRoute("liste", this.routeTriHierarchie.bind(this));

      this.routeur.ajouterRoute("", ()=>{
        this.routeur.naviguer("accueil", true);
      });
    
      this.routeur.demarrer();

      // Instanciation du filtre
      const oFiltre = new Filtre(noeudFiltre);    
      oFiltre.setCat().then(data => Affichage.afficher(gabaritFiltre, data, noeudFiltre));



      // Affichage du catalogue 
      this.oData = new DataFetch();
      this.oData.fetchData().then(data => Affichage.afficher(gabarit, data, noeudCatalogue));





      /* Instanciation du modal
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
      })*/

      // Gestion du tri par arrondissement
      //function triParArrondissement(){
      
        btnTriArrondissement.addEventListener("click",this.routeTriArrondissement.bind(this));
        btnTriHierarchie.addEventListener("click",this.routeTriHierarchie.bind(this));
        btnRecherche.addEventListener("click",this.routeRechercheNom.bind(this));
        noeudFiltre.addEventListener("click",this.routeFiltreTypeAxe.bind(this));
        
  

      // Gestion de l'affichage par liste ou galerie 
      btnListe.addEventListener('click', ()=>{
        document.querySelector('[data-js-catalogue]').classList.remove('catalogue');
        document.querySelector('[data-js-catalogue]').classList.add('catalogue-liste');
      })

      btnGalerie.addEventListener('click', ()=>{
        document.querySelector('[data-js-catalogue]').classList.remove('catalogue-liste');
        document.querySelector('[data-js-catalogue]').classList.add('catalogue');
      })



  } //fin contruct

  routeRechercheNom(){

    this.rechercheNom();
    let recherche = document.querySelector(".champs-rechercher").value;
    let infoRoute = this.routeur.getInfoRoute();
    this.routeur.naviguer(infoRoute.route+"?recherche="+recherche);
  }

  routeTriArrondissement(){

    this.triParArrondissement();
    let ordre = document.querySelector('input[type="radio"]:checked').value;
    let infoRoute = this.routeur.getInfoRoute();
    this.routeur.naviguer(infoRoute.route+"?liste=arrondissement"+"&ordre="+ordre);
  }

  routeTriHierarchie(){

    this.triParHierarchie();
    let ordre = document.querySelector('input[type="radio"]:checked').value;
    let infoRoute = this.routeur.getInfoRoute();
    this.routeur.naviguer(infoRoute.route+"?liste=hierarchie"+"&ordre="+ordre);
  }

  routeFiltreTypeAxe(e){
    let cible = e.target
    console.log(cible);
    this.FiltreTypeAxe(cible);
    let valeurFiltre = cible.dataset.jsCatValeur;
    let infoRoute = this.routeur.getInfoRoute();
    this.routeur.naviguer(infoRoute.route+"?filtre="+valeurFiltre);
  }

  rechercheNom(){
    const oRecherche = new Recherche();
    const noeudCatalogue = document.querySelector(".catalogue");
    const gabarit = document.querySelector('#tmpl-affichage-catalogue');
    let resultat;

    let recherche = {
      nom: 'NOM_PROJET',
      valeur: '',
      cb: function(data){
        console.log(data);
        Affichage.afficher(gabarit,data, noeudCatalogue);}.bind(this)
      }
    
    this.supprimerElementDom();

    recherche.valeur = document.querySelector('.champs-rechercher').value;
    resultat = oRecherche.rechercheRues(recherche);
  }


  triParArrondissement(){
    const oTri = new Tri();
    const noeudCatalogue = document.querySelector(".catalogue");
    const gabarit = document.querySelector('#tmpl-affichage-catalogue');
    this.supprimerElementDom();

            let resultat;
            let recherche = {
              type: "ARRONDISSEMENT",
              valeur: "",
              cb: function(data){
                Affichage.afficher(gabarit,data, noeudCatalogue);}.bind(this)
          }

          recherche.valeur = document.querySelector('input[type="radio"]:checked').value;
          resultat = oTri.listeTri(recherche);
  }

  triParHierarchie(){
    const oTri = new Tri();
    const noeudCatalogue = document.querySelector(".catalogue");
    const gabarit = document.querySelector('#tmpl-affichage-catalogue');
    this.supprimerElementDom();

            let resultat;
            let recherche = {
              type: "HIERARCHIE_ROUTIERE",
              valeur: "",
              cb: function(data){
                Affichage.afficher(gabarit,data, noeudCatalogue);}.bind(this)
          }

          recherche.valeur = document.querySelector('input[type="radio"]:checked').value;
          resultat = oTri.listeTri(recherche);
  }

  FiltreTypeAxe(cible){
    this.supprimerElementDom();
    const noeudCatalogue = document.querySelector(".catalogue");
    const gabarit = document.querySelector('#tmpl-affichage-catalogue');
    const oFiltre = new Filtre(); 
    
    if(cible.classList.contains("choixFiltre")){ 
        const dataFiltre = {    
                            cat : cible.dataset.jsCat,
                            valeur : cible.dataset.jsCatValeur,
                            cb: function(data){
                              console.log(data);
                              Affichage.afficher(gabarit,data, noeudCatalogue);}.bind(this)
                            };
       oFiltre.appliquerFiltre(dataFiltre);
  }
  }

  supprimerElementDom(){
    let elem = document.querySelectorAll('article');
    elem.forEach(article => {
        article.remove();
    });
}

}