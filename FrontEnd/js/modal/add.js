import { works } from "../gallery/works.js";
import { errorMessage , internalModal , worksListGlobal , categories } from "./modal";

const FILE_SIZE_MAX = 4194304;

/**
 * modifie la modale pour afficher la parti d'ajout de travaux
 */
export function addWork() {
    let btnAddPicture = document.querySelector(".btn-ajout-photo");
    btnAddPicture.addEventListener("click", async function changeModale(event) {
        event.preventDefault();

        /* ------------ erreur message effacage ------------ */

        if(document.querySelector(".erreur-modale"))
            document.querySelector(".erreur-modale").remove();

        /* ------------ ajout de la flèche retour ------------ */

        arrowToBack();

        /* ------------ modification du titre de la modale ------------ */

        let modaleTitle = document.querySelector(".modale h3");
        modaleTitle.innerText = "Ajout photo";

        /* ------------ clear du bloc central et changement de grid vers flex ------------ */

        let blocCentral = document.querySelector(".modale__bloc-central");
        blocCentral.classList.remove("modale__grid");
        blocCentral.classList.add("modale__flex");
        blocCentral.innerHTML = "";

        //input file

        addImage(blocCentral);
        addTitle(blocCentral);
        addCategory(blocCentral);
        
        /* ------------ changement du bouton ------------ */

        btnAddPicture.innerText = "Valider";
        btnAddPicture.classList.add("btn-gris");
        btnAddPicture.removeEventListener("click", changeModale);
        btnAddPicture.addEventListener("click", (e) => e.preventDefault());

        checkForm();
    });
}

/**
 * ajout de l'input de selection des photo + affichage des photo
 * @param {dom} blocCentral 
 */
function addImage(blocCentral) {
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
}

/**
 * affiche l'input pour entrer le titre
 * @param {DOM} blocCentral 
 */
function addTitle(blocCentral) {
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
}

/**
 * affiche un select pour choisir la categorie
 * @param {DOM} blocCentral 
 */
function addCategory(blocCentral) {
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
}

/**
 * ajout d'un fleche retour qui efface la modale et la réimprime à la première pages
 */
function arrowToBack() {
    let modale = document.querySelector(".modale");
    let backArrow = document.createElement("i");
    backArrow.className = "fa-solid fa-arrow-left fa-xl";
    modale.insertBefore(backArrow, modale.children[0]);
    backArrow.addEventListener('click', () => {
        let bgModale = document.querySelector(".bg-modale");
        bgModale.remove();
        internalModal();
    });
}

/**
 * vérifie la completion des formulaires
 */
function checkForm() {
    let inputs = document.querySelectorAll('.input-modale');
    let completion = [false, false, false];
    let btnAddPicture = document.querySelector(".btn-ajout-photo");

    btnAddPicture.addEventListener('click', () => {
        if(btnAddPicture.classList.contains("btn-gris"))
            errorMessage("completion");
    });

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

/**
 * envoi le nouveaux travail à l'api
 * @param {*} event - event du clic sur le bouton
 */
async function sendWork(event) {
    event.preventDefault();
    let formData = new FormData();
    let file = document.getElementById("picture-selector").files[0];
    formData.append('image', document.getElementById("picture-selector").files[0]);
    formData.append('title', document.getElementById("title-picture-add").value);
    formData.append('category', parseInt(document.getElementById("category-picture-add").value));
    let token = localStorage.getItem("token");

    if(file.size <= FILE_SIZE_MAX && (file.type == "image/png" || file.type == "image/jpeg")){
        let reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`},
            body: formData
        }).catch((e) => {
            errorMessage("error");
        });
        if(reponse.status == 201){
            reponse = await reponse.json();
            showNewWork(reponse);
        } else {
            errorMessage(reponse);
        }
    } else if (document.getElementById("picture-selector").files[0].size > FILE_SIZE_MAX) {
        errorMessage("bytes");
    } else {
        errorMessage("extension");
    }
}

/**
 * reçoit la reponse de l'api, l'ajoute à worklist puis rafraichis les filtres et réaffiches les disparus
 * @param {object} reponse 
 */
function showNewWork(reponse) {
    reponse.categoryId = parseInt(reponse.categoryId);
    reponse.category = {
        "id": parseInt(reponse.categoryId),
        "name": document.getElementById("category-picture-add").options[document.getElementById("category-picture-add").selectedIndex].text
    }
    worksListGlobal[worksListGlobal.length + 1] = reponse;
    works();
}