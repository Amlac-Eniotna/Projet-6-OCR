import { works } from "./gallery/works.js";
import { modifier } from "./modal/modal.js";

async function main() {
    let worksList = await works();
    let token = localStorage.getItem("token");
    if(token !== null)
        modifier(worksList);
}

main();