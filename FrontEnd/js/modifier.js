import { displayWork } from "./works.js"

export function modifier() {
    displayModifier();
    listenModifier();
}

function displayModifier() {
    let rmH = document.querySelector("#portfolio h2");
    rmH.remove();

    let penToSquare = '<i class="fa-regular fa-pen-to-square"></i>';
    let body = document.querySelector("body");
    let blockEdition = document.createElement("div");
    blockEdition.classList.add("block-edition");
    blockEdition.classList.add("block-edition__text");
    blockEdition.innerHTML = `${penToSquare}\n<p>Mode édition</p>`;
    body.insertBefore(blockEdition, body.children[0]);

    let textModifier = document.createElement("div");
    textModifier.classList.add("projet-edition__text");
    textModifier.innerHTML = `<h2 class="hedit">Mes Projets</h2><div class="block-edition__text">${penToSquare}\n<p>modifier</p></div>`;
    let portfolio = document.getElementById("portfolio");
    portfolio.insertBefore(textModifier, portfolio.children[0]);
}

function listenModifier() {
    let btnModifier = document.querySelectorAll(".block-edition__text");
    for (let i = 0; i < btnModifier.length ; i++) {
        btnModifier[i].addEventListener("click", (event) => {
            console.log("en cours...");
        });
    }
}