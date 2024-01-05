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
    let filters = [];
    // let filter = Object.create(null);
    let titleFilter = new Set;
    let categoryId = new Set;
    worksList.forEach((worksList) => {
        titleFilter.add(worksList.category.name);
        categoryId.add(worksList.category.id);
    });
    let arrayId = [...categoryId];
    let arrayTitle = [...titleFilter];
    for(let i = 0; i < categoryId.size; i++) {
        let filter = {
            'title': arrayTitle[i],
            'categoryId': arrayId[i]
        }
        filters.push(filter);
    }
    return filters;
}

/**
 * création des boutons filtres
 * @param {array} listFilter - tableaux d'objet contient titre et id des catégorie
 */
function createBtnFilters(listFilter) {
    let listBtnFilter = document.querySelector(".list-filters");
    if(!(listBtnFilter)){
        listBtnFilter = document.createElement("ul");
        listBtnFilter.className = "list-filters";
        let portfolio = document.getElementById("portfolio");
        portfolio.insertBefore(listBtnFilter, portfolio.children[1]);
    }
    listBtnFilter.innerHTML = "";
    let btnFilter = document.createElement("li");
    btnFilter.innerText = "Tous";
    btnFilter.className = "list-filters__filters list-filters__selectedFilters";
    listBtnFilter.appendChild(btnFilter);

    listFilter.forEach((filter) => {
        btnFilter = document.createElement("li");
        btnFilter.innerText = filter.title;
        btnFilter.className = "list-filters__filters";
        btnFilter.dataset.categoryId = filter.categoryId
        if(filter.title.length > 7)
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