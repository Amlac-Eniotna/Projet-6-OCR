// fonction main
function login() {
    // se lance au click du bouton de login
    let btnLogin = document.getElementById("btn-login");
    btnLogin.addEventListener("click", (event) => {
        event.preventDefault();
        asyncEventListen();
    });
}

/**
 * asynchroniser l'eventlistener du btn login
 */
async function asyncEventListen() {
    // zone d'appel des fonctions
    let inputValues = getInputLogin();
    let reponse = await sendInput(inputValues);
    if(reponse.status == 401 || reponse.status == 404)
        showFailMessage(reponse);
    if(reponse.status == 200)
        storageToken(reponse);
}

/**
 * récupère les valeurs des input email et mot de passe
 * @returns Object avec pour valeur l'email et le mot de passe
 */
function getInputLogin() {
    let email = document.getElementById("email");
    let mdp = document.getElementById("password");
    let inputValues = {"email": email.value, "password": mdp.value};
    return(inputValues);
}

/**
 * envoi les valeurs d'input et récupère 
 * @param {object} inputValues - Object avec pour valeur l'email et le mot de passe
 * @returns la reponse de l'api
 */
async function sendInput(inputValues) {
    let reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValues)
    });
    return(reponse);
}

/**
 * afficher le message d'erreur
 * @param {object} reponse - reponse de l'api
 */
function showFailMessage() {
        let email = document.getElementById("email");
        let mdp = document.getElementById("password");
        let errorMessage = document.createElement("p");
        email.classList.add("bad-input");
        mdp.classList.add("bad-input");
        errorMessage.className = "error-msg";
        errorMessage.innerText = "Mauvais email ou mot de passe";
        let logZone = document.getElementById("login");
        logZone.insertBefore(errorMessage, logZone.children[1]);
}

/**
 * sauvegarde le token et redirige vers la pages principales
 * @param {object} reponse - reponse de l'api 
 */
async function storageToken (reponse) {
    // localStorage.setItem("token", reponse.token)
    let token = await reponse.json();
    localStorage.setItem("token", token.token);
    window.location.href = "../index.html";
}

login();