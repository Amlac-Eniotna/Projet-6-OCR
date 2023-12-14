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
    let listAllFilter = new Set;
    worksList.forEach((worksList) => listAllFilter.add(worksList.category.name));
    let listFilter = Array.from(listAllFilter);
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

    listFilter.forEach((nameFilter) => {
        btnFilter = document.createElement("li");
        btnFilter.innerText = nameFilter;
        btnFilter.className = "list-filters__filters";
        if(nameFilter.length > 7)
            btnFilter.classList.add("list-filters__longFilters");
        listBtnFilter.appendChild(btnFilter);
    })
}

/**
 * fonction qui a l'aide d'un event listener change le filtres selectionné en utilisant la classe
 */
function clickBtnFilters() {
    let btnFilter = document.querySelectorAll(".list-filters__filters");
    btnFilter.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (!(event.target.classList.contains('list-filters__selectedFilters'))) {
                btnFilter.forEach((btnSelect) => {
                    btnSelect.classList.remove("list-filters__selectedFilters");
                });
                event.target.classList.add("list-filters__selectedFilters");
            }
            filteredWork();
        });
    })
}