//Selecteurs
const Section = document.querySelector('section');
const Input = document.querySelector('input');
const Retry = document.querySelector('i');

//Déclaration
BonjourFinal =""

//Fonction pour mettre la première letre en majuscule
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const generateTab = () => {
    let Mot = Input.value;
    let MotTab = [];
    for(let i = 0; i < Mot.length; i++){
        MotTab.push(Mot[i].toLowerCase());
    }
    return MotTab;
}

//Fonction pour générer le bonjour, autorise les doublons
const getJourBon = () => {
    const start = generateTab();
    let longueur = start.length;
    const end = [];

    for (let i = 0; i < longueur; i++) {
        const pos = Math.floor(Math.random() * start.length);
        end.push(start[pos]);
        start.splice(pos, 1);
    }

    BonjourFinal = end.join("");
    BonjourFinal = capitalizeFirstLetter(BonjourFinal);
    updateClipboard(BonjourFinal);

    animateText();
}

//Faire une animation de rotation sur le bouton
const loop = () => {
    Retry.style.transition = "0.3s";
    Retry.classList.add('loop');

    setTimeout(() => {
        Retry.style.transition = "0s";
        Retry.classList.remove('loop');
        setTimeout(() => {
            Retry.style.transition = "0.3s";
        }, 300);
    }, 300);
}

//Lance le generateur si on appuie sur espace
const keyPress = (e) => {
    if ((e.keyCode === 32 && !(Input === document.activeElement)) || e.keyCode === 13){
        getJourBon();
        loop();
    } 
};

//Declaration de deux variables pour l'animation du texte
let Jourbon = "";
let j = 0;

//Fonction recursive permettant d'afficher le texte au fur et a mesure
const animateText = () => {
    setTimeout(() => {
        if(j < BonjourFinal.length){
            Jourbon += BonjourFinal[j];
            Input.value = Jourbon;
            j++;
            animateText();
        }
        else{
            Jourbon = "";
            j = 0;
        }
    }, 50);
}

//Listener
Retry.addEventListener("click", getJourBon);
Retry.addEventListener("click", loop);
document.addEventListener("keydown", keyPress);

//lancement initial de la fonction
setTimeout(() => {
    Section.classList.replace('section-hide', 'section-show');
    setTimeout(() => {
        getJourBon();
    }, 500);
}, 100);

//Fonctions pour copier le texte dans le presse papier

navigator.permissions.query({name: "clipboard-write"}).then(result => { 
    if (result.state == "granted" || result.state == "prompt") {
      /* write to the clipboard now */
    }
});

function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function() {
      /* clipboard successfully set */
    }, function() {
      /* clipboard write failed */
    });
}