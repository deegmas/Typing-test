let fs = require('fs');
let os = require('os');

var seconde = 60; // temps de jeu
var tps; // pause

var motCorrect = 0; // nombre de motCorrect saisis
var motIncorrect = 0; // nb de mot incorrect saisis
var totalFrappes = 0; // nb total de frappes
var frappesCorrect = 0; // nb de frappes Correct
var frappesIncorrect = 0; // nb de frappes Incorrect
var precision = 0; // précision 
var mpm = 0; // nb de mot pas minute

var cpt = 0;
var cptMotActuel = 0;

const word  = [ "voiture", "maison", "travail", "jouer", "clavier", "écran",
              "création", "application", "téléphone", "livraison", "équipe", "encore",
              "trier", "mot", "chiffre", "numéro", "connexion", "envoyer", "retirer",
              "programme", "site", "test", "element", "appeler", "saisir",
              "effacer", "nom", "détail", "délais", "écouteur", "rester",
              "niveau", "sport", "foot","tout", "tous", "ciel", "quitter", 
              "cinéma", "série", "film", "couleur", "étoile", "bon",
              "a", "à", "et", "est", "on", "ont", "pour", "car", "que", "qui", "quoi",
              "sortir", "puis", "oui", "non", "ici", "salut", "demain", "course", 
              "toujours", "là", "poids", "dans", "jusque", "ami", "vingt", "entrer", 
              "dire", "ce", "votre", "notre", "air", "chez", "tenir", "porter", "me",
              "trouver", "ainsi", "prendre", "lui", "rien", "ne", "lequel", "connaître",
              "enfin", "après", "du", "air", "vous", "petit", "passer", "nuit", "jour", 
              "pendant", "je", "devant", "trop", "il", "elle", "an", "pas", "regarder",
              "or", "courir", "demander", "reprendre", "mon", "sur", "arriver", "sans", 
              "où", "savoir", "mer", "plage", "lac", "côté", "rue", "manger", "modifier",
              "eau", "avion", "temps", "soir", "matin", "vers", "pouvoir", "quel", "sembler",
              "même", "un", "une", "tant", "aussi", "moment", "revenir", "peu", "cent",
              "beau", "si", "sinon", "falloir", "vie", "yeux", "chose", "donner", "supprimer",
              "cela", "deux", "trois", "mettre", "entendre", "parler", "sentir", "venir",
              "leur", "depuis", "autre", "tu", "sous", "plus", "hier", "comme", "devenir",
              "quatre", "coup", "ça", "le", "gens", "jeune", "ville", "durant",
              "voyage", "vacance", "alors", "rendre", "entre", "aller", "rechercher",
              "maintenant", "jamais", "bien", "par", "pays", "attendre", "quelque", "répondre",
              "grand", "vouloir", "premier", "monde", "avant", "comprendre", "regard", "quand" ];


// init theme 
(function () {
  if (localStorage.getItem('theme') === 'theme-blanc') {
      document.documentElement.className = "theme-blanc";
  } else {
      document.documentElement.className = "theme-noir";
  }
})();

shuffleWord();
document.getElementById("mot").children[cptMotActuel].classList.add("fond");
document.getElementById("maSaisie").focus();

function comparaison(cpt) {

  if (cpt == 8 ) { // 5
    var tmp = document.getElementById("mot").innerText.split("\n");
    var motActuel = tmp[0].split(' ')[cpt];
  }
  else {
    var motActuel = document.getElementById("mot").innerText.split(' ')[cpt];
  }

  var saisie  = document.getElementById("maSaisie").value.trim();

  // vérifier les deux saisies 
  if (saisie === motActuel) {
    // clear la saisie
    document.getElementById("maSaisie").value = "";
    document.getElementById("mot").children[cptMotActuel].classList.remove("incorrect");
    document.getElementById("mot").children[cptMotActuel].classList.remove("neutre");
    document.getElementById("mot").children[cptMotActuel].classList.add("correct");
    motCorrect++;
    frappesCorrect++;
  }
  else {
    document.getElementById("maSaisie").value = "";
    document.getElementById("mot").children[cptMotActuel].classList.remove("correct");
    document.getElementById("mot").children[cptMotActuel].classList.remove("neutre");
    document.getElementById("mot").children[cptMotActuel].classList.add("incorrect");
    motIncorrect++;
    frappesIncorrect++; // ajout du nombre d'erreur 
  }  
}

/**
 * Fonction permettant de contrôler et comparer l'input avec le mot actuel 
 */
function verificationText(event) {

  if ( seconde == 60 ) {
    myTimer();
  }

  // récupération des champs 
  if (cptMotActuel >= 9) { // 6
    cptMotActuel = 0;
    var mot     = document.getElementById("mot").innerText.split(' ')[cptMotActuel];
    var saisie  = document.getElementById("maSaisie").value;
  } 
  else {
    var meslignes = document.getElementById("mot").innerText.split('\n');
    var ligne1 = meslignes[0];
    var ligne2 = meslignes[1];
    var mot     = document.getElementById("mot").innerText.split(' ')[cptMotActuel];
    var saisie  = document.getElementById("maSaisie").value;
  }
 
  // récupération de l'indice actuel de l'input pour la vérif 
  var index = saisie.length;

  // récupération du caractère saisie
  var s = document.getElementById("maSaisie").value[index-1];

  // découpage du mot aléatoire en tableau de caractères
  var tabMot = mot.split('');

  // comparaison du caractère saisie avec le caractère du mot 
  // Si le caractère est strictement egal au caractère du mot alors le mot devient vert 
  // sinon le mot devient rouge 
  // valeur de départ blanc 
  if (index > 0) {
    if (tabMot[index-1] === s && document.getElementById("mot").children[cptMotActuel].classList.item(1) == "neutre"  ||
        tabMot[index-1] === s && document.getElementById("mot").children[cptMotActuel].classList.item(1) == "correct" ||
        tabMot[index-1] === s && document.getElementById("mot").children[cptMotActuel].classList.item(1) == undefined) {
          // remove class 
          document.getElementById("mot").children[cptMotActuel].classList.remove("incorrect");
          document.getElementById("mot").children[cptMotActuel].classList.remove("neutre");
          // add class
          document.getElementById("mot").children[cptMotActuel].classList.add("correct");
          frappesCorrect++;
    } 
    else {
      if (s != " ") {
        document.getElementById("mot").children[cptMotActuel].classList.remove("correct");
        document.getElementById("mot").children[cptMotActuel].classList.remove("neutre");
        document.getElementById("mot").children[cptMotActuel].classList.add("incorrect");
        frappesIncorrect++;
      }

      if (event.keyCode == 8) { // backspace
        frappesIncorrect--;
        if (saisie === mot.substring(0, index)) {
          document.getElementById("mot").children[cptMotActuel].classList.remove("incorrect");
          document.getElementById("mot").children[cptMotActuel].classList.add("correct");
          frappesCorrect++;
        }
      }
    }
  }
  else {
    document.getElementById("mot").children[cptMotActuel].classList.remove("incorrect");
    document.getElementById("mot").children[cptMotActuel].classList.remove("correct");
    document.getElementById("mot").children[cptMotActuel].classList.add("neutre");
  }

  // passer au mot suivant lors de l'appui sur la touche espace 
  if (s === " ") {
    if (cpt >= 8) { // 5
      comparaison(cpt);
      cpt = 0;
      shuffleLine(ligne2);
      cptMotActuel++;
      document.getElementById("maSaisie").value = "";
      document.getElementById("mot").children[0].classList.add("fond");
    }
    else {
      comparaison(cpt);
      cpt++;
      cptMotActuel++;
      document.getElementById("maSaisie").value = "";
      document.getElementById("mot").children[cptMotActuel-1].classList.remove("fond");
      document.getElementById("mot").children[cptMotActuel].classList.add("fond");
    }
  }
}

/**
 * Fonction permettant l'affichage du résultat à la fin de la partie (modal et résultat sur le côté)
 */
function affichageResultat() {

  // total frappes
  totalFrappes = frappesCorrect + frappesIncorrect;

  // calcul precision
  var nbFautes = totalFrappes - motIncorrect;
  var nbCorrection = totalFrappes + frappesIncorrect;
  precision = Math.round((nbFautes / nbCorrection) * 100);

  // calcul mpm
  var mpm = Math.round(frappesCorrect / 5); // 1 mot = 5 caractères 

  // inner 
  document.getElementById("mpm").innerText = mpm + " MPM";
  document.getElementById("frappes").innerText = frappesCorrect + "|" +
                                                 frappesIncorrect + " : " + 
                                                 totalFrappes;
  document.getElementById("precision").innerText = precision + " %";
  document.getElementById("motCorrect").innerText = motCorrect;
  document.getElementById("motIncorrect").innerText = motIncorrect;

  // affichage
  document.getElementsByClassName("resultat")[0].style.display = 'block';

  // enregistrement du resultat
  enregistrementResultat(mpm, precision);
}

/**
 * Fonction permettant d'enregistrer le résultat obtenu dans un fichier texte
 */
function enregistrementResultat(mpm, precision) {
  // date à garder pour les stats
  var d = new Date();
  var datecomplete = d.toLocaleDateString();
  var heure = d.toTimeString().substring(0,5);

  // enregistrement des données dans le fichier texte
  var home = os.homedir();
  var dir = home + "/typingtest";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  var filename = dir + "/stat.txt";
  fs.appendFileSync(filename, "\n" + datecomplete + " " + heure + "," + mpm + "," + precision + "," + 
                        frappesCorrect + "," + frappesIncorrect + "," + motCorrect + "," + 
                        motIncorrect, (err) => {
    if (err) console.log(err);
  })
}

/**
 * fonction permettant de relancer une partie
 */
function recommencer() {
  clearTimeout(tps);
  document.getElementById("temps").innerHTML = 60;
  seconde = 60;
  document.getElementById("maSaisie").value = "";
  cpt = 0;
  cptMotActuel = 0;
  frappesCorrect = 0;
  frappesIncorrect = 0;
  motCorrect = 0;
  motIncorrect = 0;
  shuffleWord();
  document.getElementById("mot").children[cptMotActuel].classList.add("fond");
  document.getElementById("maSaisie").style.display = 'block';
  document.getElementById("maSaisie").focus();
}

/**
 * Fonction permettant de faire écouler le temps de jeu en cours
 */
function myTimer() {
  if ( seconde >= 0 ){
    document.getElementById("temps").innerHTML = seconde;
    seconde--;
    tps = setTimeout(myTimer, 1000);
  }
  else {
    clearTimeout(tps);
    affichageResultat();
    document.getElementById("maSaisie").style.display = 'none';
  }
}

/**
 * fonction permettant d'afficer les lignes de mots
 */
function shuffleLine(ligne) {

  var motLigne = ligne.split(' ');

  var listeMot = [];

  for (i=0; i < 9; i++) { //6
    listeMot[i] = word[Math.floor((Math.random() * word.length))];
  }

  var maLigne = "";

  for (j=0; j < motLigne.length; j++) {
    if (j == motLigne.length -1) {
      maLigne += "<span>" + motLigne[j] + "</span>" + "<br>";
    } 
    else {
      maLigne += "<span>" + motLigne[j] + "</span>" + " ";
    }
  }

  for (k=0; k < 9; k++) { //6
    if (k == 8) { // 5
      maLigne += "<span>" + listeMot[k] + "</span>";
    }
    else {
      maLigne += "<span>" + listeMot[k] + "</span>" + " ";
    }
  }
  document.getElementById("mot").innerHTML = maLigne;
}

/**
 * fonction permettant de sortir des mots aléatoires lors de l'initialisation 
 */
function shuffleWord() {

  var mot = [];

  for (i=0; i < 18; i++) { // 12
    mot[i] = word[Math.floor((Math.random() * word.length))];
  }

  var ligne = "";

  for (j=0; j < 18; j++) { //12
    if (j == 8) {//5
      ligne += "<span>" + mot[j] + "</span>" + "<br>";
    }
    else if (j == 17) { // 11
      ligne += "<span>" + mot[j] + "</span>";
    }
    else {
      ligne += "<span>" + mot[j] + "</span>" + " ";
    }
  }

  document.getElementById("mot").innerHTML = ligne;
}