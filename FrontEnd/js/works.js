import { filters } from "./filters.js"

//pour faire des transfert
let worksListGlobale;

export async function works() {
    let worksList = await getWorks();
    worksListGlobale = worksList;
    filters(worksList);
    changeWorkByFilter("Tous");
    return worksListGlobale
}

/**
 * fonction d'appel api
 * @returns {object} liste des travaux
 */
async function getWorks() {
    let worksListFromApi = await fetch("http://localhost:5678/api/works").then(worksList => worksList.json()).catch(error => console.error(error));
    return (worksListFromApi);
}

// effacer le front deja présent
function resetFrontWorks() {
    let galleryWorks = document.querySelector("#portfolio .gallery");
    galleryWorks.innerHTML = "";
}

/**
 * fonction d'affichages des photo
 * @param {object} worksList - liste des travaux
 * @param {number} i - index du travail a partir de 0
 */
function displayWork(worksList, i) {
    let pictureWork = document.createElement("img");
    pictureWork.src = worksList[i].imageUrl;
    pictureWork.alt = worksList[i].title;
    pictureWork.crossOrigin = "anonymous";
    let titleWork = document.createElement("figcaption");
    titleWork.innerText = worksList[i].title;
    let work = document.createElement("figure");
    work.appendChild(pictureWork);
    work.appendChild(titleWork);
    let gallery = document.querySelector("#portfolio .gallery");
    gallery.appendChild(work);
}

/* --------------------------------------------------------------------------------------- */


export function filteredWork() {
    let filterSelected = whatFilterSelected();
    changeWorkByFilter(filterSelected);
}

/**
 * récupère le nom du filtres
 * @returns nom du filtre
 */
function whatFilterSelected() {
    let btnFilter = document.querySelectorAll(".list-filters__filters");
    for (let i = 0; i < btnFilter.length; i++) {
        if (btnFilter[i].classList.contains('list-filters__selectedFilters'))
            return(btnFilter[i].innerText);
    }
}

/**
 * affiche les travaux en fontion du filtre selectionné
 * @param {string} filterSelected - nom du filtre selectionné 
 */
function changeWorkByFilter(filterSelected) {
    let worksList = worksListGlobale;
    resetFrontWorks();
    for (let i = 0; i < worksList.length; i++) {
        if(worksList[i].category.name === filterSelected) {
            displayWork(worksList, i);
        } else if (filterSelected === "Tous") {
            displayWork(worksList, i);
        }
    }
}