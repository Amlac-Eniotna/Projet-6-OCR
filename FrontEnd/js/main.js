import { works } from "./works.js";
import { modifier } from "./modifier.js";

async function main() {
    let worksList = await works();
    let token = localStorage.getItem("token");
    if(token !== null)
        modifier(worksList);
}

main();