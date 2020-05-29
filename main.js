//Selecteurs
const Section = document.querySelector('section');
const H1 = document.querySelector('h1');
const Retry = document.querySelector('i');

//Déclaration
BonjourFinal =""

//Fonction random
const getRandomInt = max => { return Math.floor(Math.random() * Math.floor(max)); }


//Fonction pour générer le bonjour, autorise les doublons
const getJourBon = () => {
    const start = ['b', 'o', 'n', 'j', 'o', 'u', 'r'];
    const end = [];

    for (let i = 0; i < 7; i++) {
        const pos = Math.floor(Math.random() * start.length);
        if(i == 0){
            end.push(start[pos].toLocaleUpperCase());
        }
        else{
            end.push(start[pos]);
        }
        start.splice(pos, 1);
    }
    
    console.log(end.join(""));
    BonjourFinal = end.join("");
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

//Lance le générateur si on appuie sur espace
const keyPress = (e) => {
    if (e.keyCode === 32){
        getJourBon();
        loop();
    } 
};

//Declaration de deux variables pour l'animation du texte
let Jourbon = "";
let j = 0;

//Fonction récursive permettant d'afficher le texte au fur et à mesure
const animateText = () => {
    setTimeout(() => {
        if(j < BonjourFinal.length){
            Jourbon += BonjourFinal[j];
            H1.innerHTML = Jourbon;
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