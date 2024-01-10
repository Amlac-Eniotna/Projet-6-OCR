import { deleteWork } from "./delete.js"
import { addWork } from "./add.js";

export let worksListGlobal;
export let categories;

export async function modifier(worksList) {
    worksListGlobal = worksList;
    categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json()).catch(error => console.error(error));
    displayModifier();
    listenModifier();
}

/**
 * créer les boutons pour ouvrir la modale
 */
function displayModifier() {
    if(worksListGlobal){
        //efface le titre pour le recreer dans un bloque après
        let portfolioHTwo = document.querySelector("#portfolio h2");
        let portfolioTitle = portfolioHTwo.innerText;
        portfolioHTwo.remove();

        //bouton d'ouverture de modale en haut de pages
        let penToSquare = '<i class="fa-regular fa-pen-to-square"></i>';
        let body = document.querySelector("body");
        let blockEdition = document.createElement("div");
        blockEdition.classList.add("block-edition");
        blockEdition.classList.add("block-edition__text");
        blockEdition.innerHTML = `${penToSquare}\n<p>Mode édition</p>`;
        body.insertBefore(blockEdition, body.children[0]);

        //texte cliquable à coté du titre de la section portfolio
        let textModifier = document.createElement("div");
        textModifier.classList.add("projet-edition__text");
        textModifier.innerHTML = `<h2 class="hedit">${portfolioTitle}</h2><div class="block-edition__text">${penToSquare}\n<a>modifier</a></div>`;
        let portfolio = document.getElementById("portfolio");
        portfolio.insertBefore(textModifier, portfolio.children[0]);
    }
}

/**
 * place un eventListener sur les boutons d'affiche de modale
 */
function listenModifier() {
    let btnModifier = document.querySelectorAll(".block-edition__text");
    for (let i = 0; i < btnModifier.length ; i++) {
        btnModifier[i].addEventListener("click", () => {
            internalModal();
        });
    }
}

// gestion interne à la modale
export function internalModal() {
    displayModale();
    exitModale();
    deleteWork();
    addWork();
}

/**
 * affiche la première page de la modale (page de suppression)
 */
function displayModale() {
    let body = document.querySelector("body");
    body.classList.add("scroll-off");

    let backgroundModale = document.createElement("aside");
    backgroundModale.classList.add("bg-modale");
    body.insertBefore(backgroundModale, body.children[0]);

    let modale = document.createElement("form");
    modale.classList.add("modale");
    modale.innerHTML = '<i class="fa-solid fa-xmark fa-xl"></i><h3>Galerie photo</h3>';
    backgroundModale.appendChild(modale);

    let grid = document.createElement("div");
    grid.className = "modale__grid modale__bloc-central";
    modale.appendChild(grid);

    for(let i = 0; i < worksListGlobal.length; i++) {
        if(worksListGlobal[i]){
            let trash = document.createElement("i");
            trash.className = "fa-solid fa-trash-can fa-xs";
            trash.dataset.id = worksListGlobal[i].id;
            let image = document.createElement("img");
            image.src = worksListGlobal[i].imageUrl;
            image.alt = worksListGlobal[i].title;
            let divImage = document.createElement("div");
            divImage.className = "modale__grid--img";
            divImage.appendChild(trash);
            divImage.appendChild(image);
            grid.appendChild(divImage);
        }
    }

    let btnAddPicture = document.createElement("button");
    btnAddPicture.innerText = "Ajouter une photo";
    btnAddPicture.className = "btn-ajout-photo";
    btnAddPicture.href = "";
    modale.appendChild(btnAddPicture);
}

/**
 * place des eventlistener pour fermé la modale
 */
function exitModale() {
    let body = document.querySelector("body");
    let backgroundModale = document.querySelector(".bg-modale");
    backgroundModale.addEventListener("click", (event) => {
        if (event.target === document.querySelector(".bg-modale")) {
            backgroundModale.remove();
            body.classList.remove("scroll-off");
        }
        if (event.target === document.querySelector(".fa-xmark")) {
            backgroundModale.remove();
            body.classList.remove("scroll-off");
        }
    });
}

/**
 * affiche les message d'erreur en fonction du paramètre reçu
 * @param {*} reponse - object si reponse de l'api ou string pour definir quel type d'erreur
 */
export function errorMessage(reponse) {
    let messageError = document.querySelector(".erreur-modale");
    if(!(messageError)) {
        let modale = document.querySelector(".modale");
        messageError = document.createElement("p");
        messageError.className = "erreur-message erreur-modale";
        modale.insertBefore(messageError, modale.children[0]);
    }
    if(reponse.status == 401) {
        messageError.innerText = "Connexion expirée ou compte non autorisé. Tentez de vous reconnecter";
    } else if(reponse == "error") {
        messageError.innerText = "Serveur indisponible.";
    } else if(reponse == "extension") {
        messageError.innerText = "Mauvais type de fichier (veuillez vérifier l'extension).";
    } else if(reponse == "bytes") {
        messageError.innerText = "Fichier trop volumineux.";
    } else if(reponse == "completion") {
        messageError.innerText = "Tous les champs ne sont pas remplis";
    } else {
        messageError.innerText = "Problème de communication avec le serveur, veuillez réessayer plus tard.";
    }
}