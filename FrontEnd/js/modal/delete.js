import { filteredWork } from "../gallery/works.js";
import { filters } from "../gallery/filters.js";
import { errorMessage } from "./modal";
import { worksListGlobal } from "./modal";

/**
 * ajouts d'eventlistener sur les poubelles et envoi l'ordre de suppression à l'api en cas de clique
 */
export function deleteWork() {
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