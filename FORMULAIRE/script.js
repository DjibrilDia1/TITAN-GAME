document.getElementById('inscription').addEventListener('submit',inscrireutilisateur);
document.getElementById('connexion').addEventListener('submit', verifieconexion);



function inscrireutilisateur(evenement){
    evenement.preventDefault();
    let donees = JSON.parse(localStorage.getItem('donnees'))|| [];
    let mail =document.getElementById('imail').value;
    let motdepasse=document.getElementById('ipasse').value;
    let cofirmation= document.getElementById('confirme').value;

    if (motdepasse!==cofirmation) {
        document.getElementById('monmessage').textContent='les mots de passe ne correspondent pas.';
        return;
    }
    for(let i=0;i<donees.length;i++){
        if(donees[i].lemail===mail){
            document.getElementById('monmessage').textContent='Email deja utilise';
            return;
        }
    }
    let donnee={
        lemail: mail,
        lepassword: motdepasse
    };
    
    donees.push(donnee);
    localStorage.setItem('donnees',JSON.stringify(donees));
    document.getElementById('inscription').reset();

    document.getElementById('monmessage').textContent='Inscription reussie!';
}

function verifieconexion(evenement){
    evenement.preventDefault();
    let email=document.getElementById('cmail').value;
    let password= document.getElementById('cpasse').value
    let donnees=JSON.parse(localStorage.getItem('donnees'))||[];
    
    for(let i=0;i<donnees.length;i++){
        if(donnees[i].lemail===email && donnees[i].lepassword===password){
            document.getElementById('monmessages').textContent='connexion reussite!';
           
            
                setTimeout(function(){
                    window.location.href='Accueil.html';
                },1000);
               
                
            
            
         return;
            
        }
       
    }
        
    
    document.getElementById('monmessages').textContent='Email ou mot de passe incorrect.';
}

document.addEventListener('DOMContentLoaded', (event) => {
    const audioElement = document.getElementById('backgroundMusic');
    let volume = parseFloat(localStorage.getItem('volume'));
    if (isNaN(volume)) {
        volume = 1.0;
    }
    audioElement.volume = volume;
    audioElement.muted = localStorage.getItem('mute') === 'true';
    audioElement.play().catch(error => {
        console.log('Erreur lors du démarrage audio:', error);
    });

    // Update audio settings when changed in localStorage
    window.addEventListener('storage', (e) => {
        if (e.key === 'volume') {
            audioElement.volume = parseFloat(e.newValue);
        }
        if (e.key === 'mute') {
            audioElement.muted = e.newValue === 'true';
        }
    });
});

let tabs = document.querySelectorAll(".tab-link:not(.desactive)");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        unSelectAll();
        tab.classList.add("active");
        let ref = tab.getAttribute("data-ref");
        document.querySelector(`.tab-body[data-id='${ref}']`).classList.toggle('active'); // Corrected line
    });
});

function unSelectAll() {
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
    let tabBodies = document.querySelectorAll(".tab-body"); // Corrected class name
    tabBodies.forEach((tabBody) => {
        tabBody.classList.remove("active");
    });
}

document.querySelector('.tab-link[data-ref="connexion"]').setAttribute('href', 'javascript:void(0)');
document.querySelector('.tab-link[data-ref="inscription"]').setAttribute('href', 'javascript:void(0)');