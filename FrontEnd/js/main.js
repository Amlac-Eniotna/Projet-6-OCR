import { works } from "./works.js";
import { modifier } from "./modifier.js";

async function main() {
    let worksList = await works();
    let token = localStorage.getItem("token");
    if(token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMzA3NzIwMSwiZXhwIjoxNzAzMTYzNjAxfQ.6uH6je01A1ALcMeGNDcDyH7kn_Ddg23sjcL6RBO_eHI")
        modifier(worksList);
}

main();