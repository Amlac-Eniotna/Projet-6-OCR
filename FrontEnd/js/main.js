import { works } from "./gallery/works.js";
import { modifier } from "./modal/modal.js";
import { navbar } from "./nav/nav.js"

async function main() {
    let token = localStorage.getItem("token");
    let worksList = await works();
    navbar();
    if(token !== null) {
        modifier(worksList);
    }
}

main();