import { filters } from "./filters.js"

export async function works() {
    resetFrontWorks();
    let worksList = await getWorks();
    addWorks(worksList);
    filters(worksList);
}

/**
 * fonction d'appel api
 * @returns {object} liste des travaux
 */
async function getWorks() {
    let worksList = await fetch("http://localhost:5678/api/works").then(worksList => worksList.json()).catch(error => console.error(error));
    return(worksList);
}

// effacer le front deja présent
function resetFrontWorks() {
    let galleryWorks = document.querySelector("#portfolio .gallery");
    galleryWorks.innerHTML = "";
}

/**
 * fonction d'affichages des photo
 * @param {object} worksList liste des travaux
 */
function addWorks(worksList) {
    for (let i = 0; i < worksList.length; i++) {
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
}