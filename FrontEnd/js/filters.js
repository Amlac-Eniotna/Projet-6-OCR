export function filters(worksList) {
    let listFilter = whatFilters(worksList);
    createButtonFilters(listFilter);
}

/**
 * récupère la liste des travaux et renvoi la catégorie des travaux connaitre les filtres à appliquer
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

function createButtonFilters(listFilter) {
    let list = document.createElement("ul");
    list.id = "listFilters";
    let portfolio = document.getElementById("portfolio");
    portfolio.insertBefore(list, portfolio.children[1]);

    let btnFilter = document.createElement("li");
    btnFilter.innerText = "Tous";
    btnFilter.className = "filters selectedFilters";
    list.appendChild(btnFilter);

    for(let i = 0; i < listFilter.length; i++) {
        btnFilter = document.createElement("li");
        btnFilter.innerText = listFilter[i];
        btnFilter.className = "filters";
        if(listFilter[i].length > 7){
            btnFilter.classList.add("longFilters")
        }
        list.appendChild(btnFilter);
    }
}