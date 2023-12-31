import { filteredWork } from "./works.js";
import { filters } from "./filters.js"

let worksListGlobal;

export function modifier(worksList) {
    worksListGlobal = worksList;
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
            // gestion interne à la modale
            displayModale();
            exitModale();
            deleteWork();
            addWork();
        });
    }
}

/**
 * affiche la première page de la modale
 */
function displayModale() {
    let body = document.querySelector("body");
    body.classList.add("scroll-off")

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
 * ajouts d'eventlistener sur les poubelles et envoi l'ordre de suppression à l'api en cas de clique
 */
function deleteWork() {
    let trashBtn = document.querySelectorAll(".fa-trash-can");
    let token = localStorage.getItem("token");
    trashBtn.forEach((btn) => {
        btn.addEventListener("click", async function trashClick(event) {
            let reponse = await fetch('http://localhost:5678/api/works/' + btn.dataset.id, {
                method: 'delete',
                headers: {Authorization: `Bearer ${token}`}
            }).catch(() => { errorMessage("error"); });
            if(reponse.status == 204 || reponse.status == 200){                    // signalé 204
                let works = document.querySelectorAll(`[src="${event.target.parentElement.lastChild.src}"]`);
                works.forEach((work) => {
                    work.parentElement.remove();
                });
                for(let i = 0; i < worksListGlobal.length; i++) {
                    if(worksListGlobal[i] && worksListGlobal[i].imageUrl == event.target.parentElement.lastChild.src) {
                        worksListGlobal.splice(i, 1);
                    }
                }
                filters(worksListGlobal);
                filteredWork();
            } else {
                errorMessage(reponse);
            }
        });
    });
}

/* ---------------- ajout de travaux ---------------- */

function addWork() {
    let btnAddPicture = document.querySelector(".btn-ajout-photo");
    btnAddPicture.addEventListener("click", async function changeModale(event) {
        event.preventDefault();

        /* ------------ erreur message effacage -------*/

        if(document.querySelector(".erreur-modale"))
            document.querySelector(".erreur-modale").remove();

        /* --------------------------- */

        let modaleTitle = document.querySelector(".modale h3");
        modaleTitle.innerText = "Ajout photo";
        let blocCentral = document.querySelector(".modale__bloc-central");
        blocCentral.classList.remove("modale__grid");
        blocCentral.classList.add("modale__flex");
        blocCentral.innerHTML = "";

        /* -------------------*/

        let modale = document.querySelector(".modale");
        let backArrow = document.createElement("i");
        backArrow.className = "fa-solid fa-arrow-left fa-xl";
        modale.insertBefore(backArrow, modale.children[0]);
        backArrow.addEventListener('click', () => {
            let bgModale = document.querySelector(".bg-modale");
            bgModale.remove();
            displayModale();
            addWork();
            deleteWork();
            exitModale();
        });

/* --------------------------------- */
//input file
        let divAddPicture = document.createElement("div");
        divAddPicture.classList.add("modale__bloc-central--img-selection");

        divAddPicture.innerHTML = '<img id="svg-image" src="./assets/images/svg-ajout-photo.svg"><button type="button" disabled>+ Ajouter photo</button><p>jpg, png : 4mo max</p>';
        let inputSelectPicture = document.createElement("input");
        inputSelectPicture.type = "file";
        inputSelectPicture.name = "picture-selector";
        inputSelectPicture.id = "picture-selector";
        inputSelectPicture.classList.add("input-modale");
        inputSelectPicture.accept = "image/png, image/jpeg";
        divAddPicture.appendChild(inputSelectPicture);
        blocCentral.appendChild(divAddPicture);
        
        divAddPicture.addEventListener('click', () => {
            inputSelectPicture.addEventListener('change', () => {
                let reader = new FileReader();
                let imgSelected = document.querySelector(".img-select");
                if(imgSelected == null) {
                    imgSelected = document.createElement("img");
                    imgSelected.className = "img-select";
                }
                reader.addEventListener("load", () => {
                    imgSelected.src = reader.result;
                })
                reader.readAsDataURL(inputSelectPicture.files[0]);
                for(let i = 0; i < 3; i++) {
                    divAddPicture.children[i].classList.add("invisible");
                }
                divAddPicture.appendChild(imgSelected);
            })
        });

/* ----------------------------------- */

        let labelTitlePicture = document.createElement("label");
        let inputTitlePicture = document.createElement("input");

        labelTitlePicture.innerText = "Titre";
        labelTitlePicture.setAttribute('for', "title-picture-add");

        inputTitlePicture.type = "text";
        inputTitlePicture.id = "title-picture-add";
        inputTitlePicture.name = "title-picture-add";
        inputTitlePicture.classList.add("input-modale");
        
        blocCentral.appendChild(labelTitlePicture);
        blocCentral.appendChild(inputTitlePicture);

/* -------------------------------------------- */
        
        let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json()).catch(error => console.error(error));

        let labelCategoryPicture = document.createElement("label");
        let inputCategoryPicture = document.createElement("select");
        
        labelCategoryPicture.innerText = "Catégorie";
        labelCategoryPicture.setAttribute('for', "category-picture-add");

        inputCategoryPicture.id = "category-picture-add";
        inputCategoryPicture.name = "category-picture-add";
        inputCategoryPicture.classList.add("input-modale");

        let optionCategory = document.createElement("option");
        optionCategory.value = "";
        optionCategory.innerText = "";
        inputCategoryPicture.appendChild(optionCategory);

        categories.forEach((category) => {
            let optionCategory = document.createElement("option");
            optionCategory.value = category.id;
            optionCategory.innerText = category.name;
            inputCategoryPicture.appendChild(optionCategory);
        });

        blocCentral.appendChild(labelCategoryPicture);
        blocCentral.appendChild(inputCategoryPicture);
        
        
        btnAddPicture.innerText = "Valider";
        btnAddPicture.classList.add("btn-gris");
        btnAddPicture.removeEventListener("click", changeModale);
        btnAddPicture.addEventListener("click", (e) => e.preventDefault());
        checkForm();
    });
}

function checkForm() {
    let inputs = document.querySelectorAll('.input-modale');
    let completion = [false, false, false];
    let btnAddPicture = document.querySelector(".btn-ajout-photo");
    inputs.forEach((input, i) => {
        input.addEventListener('change', () => {
            if(input.value) {
                completion[i] = true;
            } else {
                completion[i] = false;
            }
            if(!(completion.includes(false))) {
                document.querySelector('.modale .btn-ajout-photo').classList.remove('btn-gris');
                btnAddPicture.addEventListener('click', sendWork);
            } else if(!(document.querySelector('.modale .btn-ajout-photo').classList.contains('btn-gris')) && completion.includes(false)) {
                document.querySelector('.modale .btn-ajout-photo').classList.add('btn-gris');
                btnAddPicture.removeEventListener('click', sendWork);
            }
        });
    });
}

async function sendWork(event) {
    event.preventDefault();
    let formData = new FormData();
    let file = document.getElementById("picture-selector").files[0];
    formData.append('image', document.getElementById("picture-selector").files[0]);
    formData.append('title', document.getElementById("title-picture-add").value);
    formData.append('category', parseInt(document.getElementById("category-picture-add").value));
    let token = localStorage.getItem("token");

    if(file.size <= 4194304 && (file.type == "image/png" || file.type == "image/jpeg")){
        let reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`},
            body: formData
        }).catch((e) => {
            errorMessage("error");
            console.log(e)
        });
        if(reponse.status == 201){
            reponse = await reponse.json();
            showNewWork(reponse);
        } else {
            errorMessage(reponse);
        }
    } else if (document.getElementById("picture-selector").files[0].size > 4194304) {
        errorMessage("bytes");
    } else {
        errorMessage("extension");
    }
}

/**
 * affiche les message d'erreur en fonction du paramètre reçu
 * @param {*} reponse - object si reponse de l'api ou string pour definir quel type d'erreur
 */
function errorMessage(reponse) {
    let messageError = document.querySelector(".erreur-modale");
    if(!(messageError)) {
        let modale = document.querySelector(".modale");
        messageError = document.createElement("p");
        messageError.className = "erreur-message erreur-modale";
        modale.insertBefore(messageError, modale.children[0]);
    }
    if(reponse.status == 401) {
        messageError.innerText = "Connexion expirée ou compte non autorisé";
    } else if(reponse == "error") {
        messageError.innerText = "Serveur indisponible";
    } else if(reponse == "extension") {
        messageError.innerText = "Mauvais type de fichier (veuillez vérifier l'extension)";
    } else if(reponse == "bytes") {
        messageError.innerText = "Fichier trop volumineux";
    }
}

function showNewWork(reponse) {
    reponse.categoryId = parseInt(reponse.categoryId);
    reponse.category = {
        "id": parseInt(reponse.categoryId),
        "name": document.getElementById("category-picture-add").options[document.getElementById("category-picture-add").selectedIndex].text
    }
    worksListGlobal[worksListGlobal.length + 1] = reponse;
    filters(worksListGlobal);
    filteredWork();
}