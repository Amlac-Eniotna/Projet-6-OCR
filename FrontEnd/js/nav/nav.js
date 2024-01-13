// check et change au besoin le mot login en logout
// puis place un eventlistener qui réagit en fonction du mot
export function navbar(){
    let token = localStorage.getItem("token");
    let loginNav = document.querySelectorAll("header li");
    loginNav.forEach((li) => {  
        if(token) {
            if(li.innerText == "login"){
                li.innerText = "logout";
                li.addEventListener("click", navLogout);
            }
        } else {
            if(li.innerText == "login")
                li.addEventListener("click", navLogin);
        }
    });
}

function navLogin(){
    window.location.href = "./pages/login.html";
}

function navLogout(){
    localStorage.removeItem("token");
    location.reload();
}