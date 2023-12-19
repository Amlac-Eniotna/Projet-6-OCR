import { works } from "./works.js";
import { modifier } from "./modifier.js";

async function main() {
    let token = localStorage.getItem("token");
    if(token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjkwMzQ0MiwiZXhwIjoxNzAyOTg5ODQyfQ.S8PTGRo-UjbTd-KruqFSqFkrLFRQzHE7HkYHyrLpigU")
        modifier();
    works();
}

main();