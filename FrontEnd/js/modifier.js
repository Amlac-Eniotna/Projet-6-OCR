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
        });
    }
}

function displayModale() {
    let body = document.querySelector("body");
    let backgroundModale = document.createElement("aside");
    backgroundModale.classList.add("bg-modale");
    body.insertBefore(backgroundModale, body.children[0]);

    let modale = document.createElement("div");
    modale.classList.add("modale");
    modale.innerHTML = '<i class="fa-solid fa-xmark fa-xl"></i><h3>Galerie photo</h3>';
    backgroundModale.appendChild(modale);

    let grid = document.createElement("div");
    grid.className = "modale__grid";
    modale.appendChild(grid);

    for(let i = 0; i < worksListGlobal.length; i++) {
        let trash = document.createElement("i");
        trash.className = "fa-solid fa-trash-can fa-xs";
        let image = document.createElement("img");
        image.src = worksListGlobal[i].imageUrl;
        image.alt = worksListGlobal[i].title;
        let divImage = document.createElement("div");
        divImage.className = "modale__grid--img";
        divImage.appendChild(trash);
        divImage.appendChild(image);
        grid.appendChild(divImage);
    }

    let btnAddPicture = document.createElement("a");
    btnAddPicture.innerText = "Ajouter une photo";
    btnAddPicture.className = "btn-ajout-photo";
    btnAddPicture.href = "";
    modale.appendChild(btnAddPicture);
}

function exitModale() {
    let backgroundModale = document.querySelector(".bg-modale");
    backgroundModale.addEventListener("click", (event) => {
        console.log(event.target)
        if (event.target === document.querySelector(".bg-modale"))
            backgroundModale.remove();
        if (event.target === document.querySelector(".fa-xmark"))
            backgroundModale.remove();
    })
}