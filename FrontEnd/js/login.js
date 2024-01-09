// fonction main
function login() {
    // se lance au click du bouton de login
    let btnLogin = document.getElementById("btn-login");
    btnLogin.addEventListener("click", (event) => {
        event.preventDefault();
        asyncEventListen();
        loading("click");
    });
}

/**
 * change le text du bouton en fonction de se qu'il se passe
 * @param {string} action - reçois "click" pour le gif de chargement ou "reset" pour reproposer de se connecter
 */
function loading(action) {
    let btn = document.getElementById("btn-login")
    if(action == "click"){
        btn.innerHTML = '<img src="../assets/images/load-38_256.gif" alt="chargement..." class="chargement">';
    }
    if(action == "reset"){
        btn.innerHTML = 'Se connecter';
    }
}

/**
 * asynchroniser l'eventlistener du btn login
 */
async function asyncEventListen() {
    // zone d'appel des fonctions
    let inputValues = getInputLogin();
    let reponse = await sendInput(inputValues);
    if(reponse.status == 200)
        storageToken(reponse);
    else
        showFailMessage(reponse);
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
    }).catch(() => { showFailMessage("error"); });
    return(reponse);
}

/**
 * afficher le message d'erreur
 * @param {object} reponse - reponse de l'api ou string "error" si api injoignable
 */
function showFailMessage(reponse) {
    let errorMessage = document.querySelector(".error-msg");
    if(!(errorMessage)) {
        errorMessage = document.createElement("p");
        errorMessage.className = "error-msg";
        let logZone = document.getElementById("login");
        logZone.insertBefore(errorMessage, logZone.children[1]);
    }
    if(reponse.status == 401 || reponse.status == 404){
        let email = document.getElementById("email");
        let mdp = document.getElementById("password");
        email.classList.add("bad-input");
        mdp.classList.add("bad-input");
        errorMessage.innerText = "Mauvais email ou mot de passe";
    } else if(reponse == "error") {
        errorMessage.innerText = "Connexion indisponible";
    }
    loading("reset");
}

/**
 * sauvegarde le token et redirige vers la pages principales
 * @param {object} reponse - reponse de l'api 
 */
async function storageToken (reponse) {
    let token = await reponse.json();
    localStorage.setItem("token", token.token);
    window.location.href = "../index.html";
}

login();