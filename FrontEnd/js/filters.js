import { filteredWork } from "./works.js";

// gestion des filtres
export function filters(worksList) {
    let listFilter = whatFilters(worksList);
    createBtnFilters(listFilter);
    clickBtnFilters();
}

/**
 * détermine une liste de filtres
 * @param {object} worksList - liste des travaux
 * @returns {array} liste de noms des filtres
 */
function whatFilters(worksList) {
    let listAllFilter = [];
    for (let i = 0; i < worksList.length; i++)
        listAllFilter[i] = worksList[i].category.name;
    listAllFilter.sort();
    let listFilter = [];
    let j = 0;
    for(let i = 0; i < listAllFilter.length; i++) {
        if(listFilter[j-1] !== listAllFilter[i]) {
            listFilter[j] = listAllFilter[i];
            j++;
        }
    }
    return listFilter;
}

/**
 * création des boutons filtres
 * @param {array} listFilter - liste des noms des filtres
 */
function createBtnFilters(listFilter) {
    let listBtnFilter = document.createElement("ul");
    listBtnFilter.className = "list-filters";
    let portfolio = document.getElementById("portfolio");
    portfolio.insertBefore(listBtnFilter, portfolio.children[1]);

    let btnFilter = document.createElement("li");
    btnFilter.innerText = "Tous";
    btnFilter.className = "list-filters__filters list-filters__selectedFilters";
    listBtnFilter.appendChild(btnFilter);

    for(let i = 0; i < listFilter.length; i++) {
        btnFilter = document.createElement("li");
        btnFilter.innerText = listFilter[i];
        btnFilter.className = "list-filters__filters";
        if(listFilter[i].length > 7){
            btnFilter.classList.add("list-filters__longFilters");
        }
        listBtnFilter.appendChild(btnFilter);
    }
}

/**
 * fonction qui a l'aide d'un event listener change le filtres selectionné en utilisant la classe
 */
function clickBtnFilters() {
    let btnFilter = document.querySelectorAll(".list-filters__filters");
    for(let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].addEventListener("click", (event) => {
            if (!(event.target.classList.contains('list-filters__selectedFilters'))) {
                for (let j = 0; j < btnFilter.length; j++) {
                    btnFilter[j].classList.remove("list-filters__selectedFilters");
                }
                event.target.classList.add("list-filters__selectedFilters");
            }
            filteredWork();
        })
    }
}