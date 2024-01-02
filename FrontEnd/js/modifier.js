let worksListGlobal;

export function modifier(worksList) {
    worksListGlobal = worksList;
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
    textModifier.innerHTML = `<h2 class="hedit">Mes Projets</h2><div class="block-edition__text">${penToSquare}\n<a>modifier</a></div>`;
    let portfolio = document.getElementById("portfolio");
    portfolio.insertBefore(textModifier, portfolio.children[0]);
}

function listenModifier() {
    let btnModifier = document.querySelectorAll(".block-edition__text");
    for (let i = 0; i < btnModifier.length ; i++) {
        btnModifier[i].addEventListener("click", (event) => {
            // gestion de la modale
            displayModale();
            exitModale();
            deleteWork();
            addWork();
        });
    }
}

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

    let btnAddPicture = document.createElement("button");
    btnAddPicture.innerText = "Ajouter une photo";
    btnAddPicture.className = "btn-ajout-photo";
    btnAddPicture.href = "";
    modale.appendChild(btnAddPicture);
}

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

function deleteWork() {
    let trashBtn = document.querySelectorAll(".fa-trash-can");
    let token = localStorage.getItem("token");
    trashBtn.forEach((btn, i) => {
        btn.addEventListener("click", async (event) => {
            let reponse = await fetch('http://localhost:5678/api/works/' + btn.dataset.id, {
                method: 'delete',
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(reponse)
            if(reponse.status == 204)
                event.target.parentElement.remove();
        });
    });
}

/* ---------------- ajout de travaux ---------------- */

function addWork() {
    let btnAddPicture = document.querySelector(".btn-ajout-photo");
    btnAddPicture.addEventListener("click", function changeModale(event) {
        event.preventDefault();
        let modaleTitle = document.querySelector(".modale h3");
        modaleTitle.innerText = "Ajout photo";
        let blocCentral = document.querySelector(".modale__bloc-central");
        blocCentral.classList.remove("modale__grid");
        blocCentral.classList.add("modale__flex")
        blocCentral.innerHTML = "";

/* --------------------------------- */
//input file
        let divAddPicture = document.createElement("div");
        divAddPicture.classList.add("modale__bloc-central--img-selection");

        divAddPicture.innerHTML = '<img id="svg-image" src="./assets/images/svg-ajout-photo.svg"><button type="button" disabled>+ Ajouter photo</button><p>jpg, png : 4mo max</p>';
        let inputSelectPicture = document.createElement("input");
        inputSelectPicture.type = "file";
        inputSelectPicture.name = "picture-selector";
        inputSelectPicture.id = "picture-selector";
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
        
        blocCentral.appendChild(labelTitlePicture);
        blocCentral.appendChild(inputTitlePicture);

/* -------------------------------------------- */

        let labelCategoryPicture = document.createElement("label");
        let inputCategoryPicture = document.createElement("input");
        let listCategoryPicture = document.createElement("datalist");
        
        labelCategoryPicture.innerText = "Catégorie";
        labelCategoryPicture.setAttribute('for', "category-picture-add");

        inputCategoryPicture.setAttribute('list', "category-work");
        inputCategoryPicture.id = "category-picture-add";
        inputCategoryPicture.name = "category-picture-add";

        listCategoryPicture.id = "category-work";
        let categories = document.querySelectorAll(".list-filters__filters");
        categories.forEach(category => {
            if(category.innerText !== "Tous") {
                let optionCategory = document.createElement("option");
                optionCategory.value = category.innerText;
                listCategoryPicture.appendChild(optionCategory);
            }
        });

        blocCentral.appendChild(labelCategoryPicture);
        blocCentral.appendChild(inputCategoryPicture);
        blocCentral.appendChild(listCategoryPicture);
        
        
        btnAddPicture.innerText = "Valider";
        btnAddPicture.classList.add("btn-gris");
        btnAddPicture.removeEventListener("click", changeModale);
        btnAddPicture.addEventListener('click', function send(event) {
            event.preventDefault();
        });
    });
}

function checkForm() {
    
}

function selectPicture() {

}

function sendWork() {

}