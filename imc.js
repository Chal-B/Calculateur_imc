// Projet : calculateur d'IMC interactif
// Formule utilisée : IMC = poids / (taille × taille)

const sortie = document.querySelector("#sortie");
const formulaire = document.querySelector("#formulaire-imc");
const champPoids = document.querySelector("#poids");
const champTaille = document.querySelector("#taille");

// Remplace le contenu du panneau de droite
function afficher(html) {
  sortie.innerHTML = html;
}

function arrondir(nombre) {
  return nombre.toFixed(1).replace(".", ",");
}

function ecrireTaille(taille) {
  return taille.toFixed(2).replace(".", ",");
}

function trouverZone(imc) {
  if (imc < 18.5) {
    return "maigreur";
  } else if (imc < 25) {
    return "normal";
  } else if (imc < 30) {
    return "surpoids";
  } else {
    return "obesite";
  }
}

function nommerZone(zone) {
  if (zone === "maigreur") {
    return "Maigreur";
  } else if (zone === "normal") {
    return "Corpulence normale";
  } else if (zone === "surpoids") {
    return "Surpoids";
  } else {
    return "Obésité";
  }
}

function decrireZone(zone) {
  if (zone === "maigreur") {
    return "Votre IMC est inférieur à 18,5.";
  } else if (zone === "normal") {
    return "Votre IMC se situe entre 18,5 et 24,9.";
  } else if (zone === "surpoids") {
    return "Votre IMC se situe entre 25 et 29,9.";
  } else {
    return "Votre IMC est supérieur ou égal à 30.";
  }
}

function dessinerSilhouette() {
  return `
    <svg class="silhouette" viewBox="0 0 120 200" aria-hidden="true">
      <path class="membre bras bras-gauche" d="M44 48 C34 58 30 76 31 96"></path>
      <path class="membre bras bras-droit" d="M76 48 C86 58 90 76 89 96"></path>
      <path class="membre jambe jambe-gauche" d="M50 102 C47 130 45 158 46 182"></path>
      <path class="membre jambe jambe-droite" d="M70 102 C73 130 75 158 74 182"></path>
      <ellipse class="tete" cx="60" cy="22" rx="12" ry="14"></ellipse>
      <path class="torse" d="M60 38 C71 38 78 44 80 54 C82 66 82 78 79 88 C78 96 80 102 79 106 L41 106 C40 102 42 96 41 88 C38 78 38 66 40 54 C42 44 49 38 60 38 Z"></path>
      <ellipse class="ventre" cx="60" cy="82" rx="21" ry="22"></ellipse>
    </svg>
  `;
}

function calculerIMC(poids, taille) {
  const imc = poids / (taille * taille);
  const zone = trouverZone(imc);

  console.log(`${poids} kg | ${taille} m → IMC ${imc.toFixed(1)} → ${zone}`);

  afficher(`
    <article class="fiche ${zone}">
      <div class="fiche-bandeau">
        <span class="fiche-numero">RÉSULTAT</span>
        <span class="fiche-zone-tag">${nommerZone(zone)}</span>
      </div>
      ${dessinerSilhouette()}
      <div class="fiche-detail">
        <p class="valeur-imc"><strong>${arrondir(imc)}</strong><span>IMC</span></p>
        <p class="categorie">${nommerZone(zone)}</p>
        <p class="message">${decrireZone(zone)}</p>
        <div class="mesures">
          <p class="mesure"><strong>${arrondir(poids)} kg</strong><span>Poids</span></p>
          <p class="mesure"><strong>${ecrireTaille(taille)} m</strong><span>Taille</span></p>
        </div>
        <div class="jauge">
          <span class="segment segment-maigreur">Maigreur</span>
          <span class="segment segment-normal">Normal</span>
          <span class="segment segment-surpoids">Surpoids</span>
          <span class="segment segment-obesite">Obésité</span>
        </div>
      </div>
    </article>
  `);

  return zone;
}

function lireValeurs() {
  const poids = Number(champPoids.value);
  const taille = Number(champTaille.value);

  if (Number.isNaN(poids) || Number.isNaN(taille)) {
    afficher(`<p class="erreur">Saisissez un poids et une taille valides.</p>`);
    return;
  }

  if (poids < 30 || poids > 250) {
    afficher(`<p class="erreur">Le poids doit être entre 30 et 250 kg.</p>`);
    return;
  }

  if (taille < 1 || taille > 2.5) {
    afficher(`<p class="erreur">La taille doit être entre 1 et 2,5 m.</p>`);
    return;
  }

  calculerIMC(poids, taille);
}

// Au clic sur le bouton, on calcule sans recharger la page
formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault();
  lireValeurs();
});

// Premier affichage avec les valeurs déjà présentes dans les champs
lireValeurs();
