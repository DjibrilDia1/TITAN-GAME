//--------------------------------------------------------------------------------------
// 1er partie: creation du plateau d'echiquier
// Sélectionne les éléments du DOM pour le plateau de jeu, l'affichage du joueur et l'affichage des informations
const gameBoard = document.querySelector("#gameBoard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");

// Définit la largeur du plateau de jeu (8x8 pour un échiquier)
const width = 8;

// Déclaration des pièces de jeu en tant qu'éléments HTML avec des icônes SVG
const king = '<div class="piece" id="king"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 0c17.7 0 32 14.3 32 32l0 16 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 48 152 0c22.1 0 40 17.9 40 40c0 5.3-1 10.5-3.1 15.4L368 400 80 400 3.1 215.4C1 210.5 0 205.3 0 200c0-22.1 17.9-40 40-40l152 0 0-48-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-16c0-17.7 14.3-32 32-32zM38.6 473.4L80 432l288 0 41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6L54.6 512C42.1 512 32 501.9 32 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div>';
const queen = '<div class="piece" id="queen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 0a56 56 0 1 1 0 112A56 56 0 1 1 256 0zM134.1 143.8c3.3-13 15-23.8 30.2-23.8c12.3 0 22.6 7.2 27.7 17c12 23.2 36.2 39 64 39s52-15.8 64-39c5.1-9.8 15.4-17 27.7-17c15.3 0 27 10.8 30.2 23.8c7 27.8 32.2 48.3 62.1 48.3c10.8 0 21-2.7 29.8-7.4c8.4-4.4 18.9-4.5 27.6 .9c13 8 17.1 25 9.2 38L399.7 400 384 400l-40.4 0-175.1 0L128 400l-15.7 0L5.4 223.6c-7.9-13-3.8-30 9.2-38c8.7-5.3 19.2-5.3 27.6-.9c8.9 4.7 19 7.4 29.8 7.4c29.9 0 55.1-20.5 62.1-48.3zM256 224s0 0 0 0s0 0 0 0s0 0 0 0zM112 432l288 0 41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6L86.6 512C74.1 512 64 501.9 64 489.4c0-6 2.4-11.8 6.6-16L112 432z"/></svg></div>';
const bishop = '<div class="piece" id="bishop"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 0C110.3 0 96 14.3 96 32c0 16.1 11.9 29.4 27.4 31.7C78.4 106.8 8 190 8 288c0 47.4 30.8 72.3 56 84.7L64 400l192 0 0-27.3c25.2-12.5 56-37.4 56-84.7c0-37.3-10.2-72.4-25.3-104.1l-99.4 99.4c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L270.8 154.6c-23.2-38.1-51.8-69.5-74.2-90.9C212.1 61.4 224 48.1 224 32c0-17.7-14.3-32-32-32L128 0zM48 432L6.6 473.4c-4.2 4.2-6.6 10-6.6 16C0 501.9 10.1 512 22.6 512l274.7 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L272 432 48 432z"/></svg></div>';
const knight = '<div class="piece" id="knight"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 48L82.7 61.3C70.7 73.3 64 89.5 64 106.5l0 132.4c0 10.7 5.3 20.7 14.2 26.6l10.6 7c14.3 9.6 32.7 10.7 48.1 3l3.2-1.6c2.6-1.3 5-2.8 7.3-4.5l49.4-37c6.6-5 15.7-5 22.3 0c10.2 7.7 9.9 23.1-.7 30.3L90.4 350C73.9 361.3 64 380 64 400l320 0 28.9-159c2.1-11.3 3.1-22.8 3.1-34.3l0-14.7C416 86 330 0 224 0L83.8 0C72.9 0 64 8.9 64 19.8c0 7.5 4.2 14.3 10.9 17.7L96 48zm24 68a20 20 0 1 1 40 0 20 20 0 1 1 -40 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512l370.7 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L384 432 64 432 22.6 473.4z"/></svg></div>';
const rook = '<div class="piece" id="rook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 192L32 48c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16l0 40c0 4.4 3.6 8 8 8l32 0c4.4 0 8-3.6 8-8l0-40c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16l0 40c0 4.4 3.6 8 8 8l32 0c4.4 0 8-3.6 8-8l0-40c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16l0 144c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144L80 400 96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96l32 0c8.8 0 16-7.2 16-16l0-48c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432l320 0 41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6L38.6 512C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div>';
const pawn = '<div class="piece" id="pawn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.5 224c29.2-18.4 48.5-50.9 48.5-88c0-57.4-46.6-104-104-104S56 78.6 56 136c0 37.1 19.4 69.6 48.5 88L96 224c-17.7 0-32 14.3-32 32c0 16.5 12.5 30 28.5 31.8L80 400l160 0L227.5 287.8c16-1.8 28.5-15.3 28.5-31.8c0-17.7-14.3-32-32-32l-8.5 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512l242.7 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L256 432 64 432 22.6 473.4z"/></svg></div>';


// Déclare la couleur du joueur qui commence la partie (ici "black")
let playerGo = 'black'; 
playerDisplay.textContent = 'black';  // Met à jour l'affichage pour indiquer quel joueur doit jouer

// Configuration initiale des pièces sur l'échiquier, en suivant l'ordre standard pour un jeu d'échecs
const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,  // Première rangée noire (rangée 8)
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,            // Deuxième rangée noire (rangée 7)
    '', '', '', '', '', '', '', '',                            // Rangées 3 à 6 (vides au début)
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,            // Deuxième rangée blanche (rangée 2)
    rook, knight, bishop, queen, king, bishop, knight, rook    // Première rangée blanche (rangée 1)
];

// Fonction pour créer et initialiser le plateau de jeu
function createPlateau() {
    // Parcourt chaque case du plateau et place la pièce correspondante
    startPieces.forEach((startPiece, index) => {
        const square = document.createElement('div');  // Crée un élément div pour chaque case
        square.classList.add('square');  // Ajoute la classe 'square' à la case
        square.innerHTML = startPiece;  // Insère la pièce dans la case (si une pièce est présente)
        square.firstChild?.setAttribute('draggable', true);  // Rends la pièce "draggable" si elle existe
        square.setAttribute('square-id', index);  // Attribue un ID unique à chaque case

        // Calcule la ligne de la case actuelle (de 1 à 8)
        const ligne = Math.floor((63 - index) / 8) + 1;

        // Ajoute des classes de couleur (beige ou marron) alternées aux cases pour simuler un échiquier
        if (ligne % 2 === 0) {
            square.classList.add(index % 2 === 0 ? "beige" : "brown");
        } else {
            square.classList.add(index % 2 === 0 ? "brown" : "beige");
        }

        // Attribue une classe de couleur (noir ou blanc) aux pièces selon leur position initiale
        if (index <= 15) {
            square.firstChild.firstChild.classList.add('black');  // Pièces noires (rangées 7 et 8)
        } else if (index >= 48) {
            square.firstChild.firstChild.classList.add('white');  // Pièces blanches (rangées 1 et 2)
        }

        // Ajoute la case au plateau de jeu dans le DOM
        gameBoard.append(square);
    });
}

// Appelle la fonction pour créer le plateau de jeu avec les pièces initiales
createPlateau();

//-----------------------------------------------------------------------------------------/
// 2 ieme partie : mouvement des joueurs

const allSquares = document.querySelectorAll(".square");

// Ajoute des écouteurs d'événements à chaque élément de la NodeList.
allSquares.forEach(square => {
    // Lors du démarrage d'un glisser-déposer, appelle la fonction dragStart.
    square.addEventListener('dragstart', dragStart);
    // Lorsqu'un élément est glissé sur la zone de la case, appelle la fonction dragOver.
    square.addEventListener('dragover', dragOver);
    // Lorsqu'un élément est lâché sur la case, appelle la fonction dragDrop.
    square.addEventListener('drop', dragDrop);
});

let startPositionId;
let draggedElement;

// Fonction appelée au début du glissement d'un élément.
function dragStart(e) {
    // Stocke l'ID de la case d'origine (où l'élément a commencé à être glissé).
    startPositionId = e.target.parentNode.getAttribute('square-id');
    // Stocke l'élément actuellement glissé.
    draggedElement = e.target; 
}

// Fonction appelée lorsqu'un élément est glissé sur une zone (empêche le comportement par défaut).
function dragOver(e) {
    e.preventDefault(); // Permet le dépôt en empêchant le comportement par défaut de l'événement.
}

// Fonction appelée lorsqu'un élément est lâché sur une zone.
function dragDrop(e) {
    e.stopPropagation(); // Empêche l'événement de se propager à d'autres éléments.
    
    // Vérifie si l'élément glissé est du bon joueur (la couleur correspond à celle du joueur actuel).
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    // Vérifie si la case de destination contient déjà une pièce.
    const taken = e.target.classList.contains('piece');
    // Vérifie si le mouvement est valide (selon les règles du jeu).
    const valid = checkIfValid(e.target);
    // Détermine la couleur de l'adversaire en fonction de la couleur du joueur actuel.
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    // Vérifie si la case de destination contient une pièce de l'adversaire.
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);

    // Si l'élément glissé est du joueur actuel.
    if (correctGo) {
        // Si la case de destination contient une pièce adverse et le mouvement est valide.
        if (takenByOpponent && valid) {
            // Déplace l'élément glissé sur la case de destination et retire l'ancienne pièce.
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            // Vérifie si le joueur a gagné.
            checkForWin();
            // Change de joueur.
            changePlayer();
            // Joue un bip sonore.
            jouerbip();
            return;
        }

        // Si la case de destination est déjà occupée par une pièce et ce n'est pas une pièce adverse.
        else if (taken && !takenByOpponent) {
            // Affiche un message d'erreur.
            infoDisplay.textContent = "Déplacement Invalide!";
            setTimeout(() => infoDisplay.textContent = "", 2000); // Efface le message après 2 secondes.
            return;
        }

        // Si le mouvement est valide.
        else if (valid) { 
            // Déplace l'élément glissé sur la case de destination.
            e.target.append(draggedElement);
            checkForWin();
            changePlayer();
            jouerbip();
            return;
        }
        
    }
}

//----------------------------------------------------------------------------------------------------------------
// 3 ieme partie : le mouvement des joueurs en fonction des régles du jeu
function checkIfValid(target){
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;

    switch(piece) {
        case 'pawn':
            const starterRow = [8,9,10,11,12,13,14,15];
            if (
                (starterRow.includes(startId) && startId + width * 2 === targetId) ||
                (startId + width === targetId) ||
                startId + width - 1  === targetId && document.querySelector(`[square-id ="${startId + width - 1}"]`).firstChild ||
                startId + width + 1  === targetId && document.querySelector(`[square-id ="${startId + width + 1}"]`).firstChild
                
            ) {
                return true; 
            }
        break;

        case 'knight':
            if(
                startId + width * 2 + 1 === targetId ||
                startId + width * 2 - 1 === targetId ||
                startId + width - 2 === targetId || 
                startId + width + 2 === targetId || 
                startId - width * 2 + 1 === targetId ||
                startId - width * 2 - 1 === targetId ||
                startId - width - 2 === targetId ||
                startId - width + 2 === targetId
            ){
                return true;
            }
            break;

            case 'bishop':
                if (
                    startId + width + 1 === targetId ||
                    startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                    startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                    startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                    startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                    startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                    startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild ||
                    
                    startId - width - 1 === targetId ||
                    startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                    startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild ||
                    startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
                    startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
                    startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
                    startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild ||
                    
                    startId - width + 1 === targetId ||
                    startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                    startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild ||
                    startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
                    startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
                    startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
                    startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild ||
                    
                    startId + width - 1 === targetId ||
                    startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                    startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild ||
                    startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
                    startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
                    startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
                    startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild
                ) {
                    return true;
                }
            
            break;

            case 'rook':
            if (
                // Déplacement vertical vers le bas
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 7}"]`).firstChild ||

                // Déplacement vertical vers le haut
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 7}"]`).firstChild ||

                // Déplacement horizontal vers la droite
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||

                // Déplacement horizontal vers la gauche
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ) {
                return true;
            }

        break;

        case 'queen': 
        if (
            // Déplacement vertical vers le bas
            startId + width === targetId ||
            startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
            startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
            startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
            startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild ||
            startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
            startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 7}"]`).firstChild ||
    
            // Déplacement vertical vers le haut
            startId - width === targetId ||
            startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
            startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
            startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
            startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild ||
            startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
            startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 7}"]`).firstChild ||
    
            // Déplacement horizontal vers la droite
            startId + 1 === targetId ||
            startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
            startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
            startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
            startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
            startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
            startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
    
            // Déplacement horizontal vers la gauche
            startId - 1 === targetId ||
            startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
            startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
            startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
            startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
            startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
            startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild ||
    
            // Déplacement diagonal vers le bas à droite
            startId + width + 1 === targetId ||
            startId + 2 * width + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
            startId + 3 * width + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width + 2}"]`).firstChild ||
            startId + 4 * width + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3 * width + 3}"]`).firstChild ||
            startId + 5 * width + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3 * width + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4 * width + 4}"]`).firstChild ||
            startId + 6 * width + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3 * width + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4 * width + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5 * width + 5}"]`).firstChild ||
            startId + 7 * width + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3 * width + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4 * width + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5 * width + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6 * width + 6}"]`).firstChild ||
    
            // Déplacement diagonal vers le bas à gauche
            startId + width - 1 === targetId ||
            startId + 2 * width - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
            startId + 3 * width - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width - 2}"]`).firstChild ||
            startId + 4 * width - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3 * width - 3}"]`).firstChild ||
            startId + 5 * width - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3 * width - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4 * width - 4}"]`).firstChild ||
            startId + 6 * width - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3 * width - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4 * width - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5 * width - 5}"]`).firstChild ||
            startId + 7 * width - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2 * width - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3 * width - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4 * width - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5 * width - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6 * width - 6}"]`).firstChild ||
    
            // Déplacement diagonal vers le haut à droite
            startId - width + 1 === targetId ||
            startId - 2 * width + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
            startId - 3 * width + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width + 2}"]`).firstChild ||
            startId - 4 * width + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3 * width + 3}"]`).firstChild ||
            startId - 5 * width + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3 * width + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4 * width + 4}"]`).firstChild ||
            startId - 6 * width + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3 * width + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4 * width + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5 * width + 5}"]`).firstChild ||
            startId - 7 * width + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3 * width + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4 * width + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5 * width + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6 * width + 6}"]`).firstChild ||
    
            // Déplacement diagonal vers le haut à gauche
            startId - width - 1 === targetId ||
            startId - 2 * width - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
            startId - 3 * width - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width - 2}"]`).firstChild ||
            startId - 4 * width - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3 * width - 3}"]`).firstChild ||
            startId - 5 * width - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3 * width - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4 * width - 4}"]`).firstChild ||
            startId - 6 * width - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3 * width - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4 * width - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5 * width - 5}"]`).firstChild ||
            startId - 7 * width - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2 * width - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3 * width - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4 * width - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5 * width - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6 * width - 6}"]`).firstChild) 
            {
            return true;
            }
        
        break;
        
        case 'king':
            if(
                startId + 1 === targetId || 
                startId - 1 === targetId || 
                startId + width === targetId || 
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId || 
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId 
            ){
                return true 
            }

        break;
    }

    return false;
}

function changePlayer() {
    if (playerGo === "black") {
        reverseIds();
        playerGo = "white";
        playerDisplay.textContent = 'white';
    } else {
        revertIds();
        playerGo = "black";
        playerDisplay.textContent = 'black';
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, index) => 
        square.setAttribute('square-id', (width * width - 1) - index));
}

function revertIds() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, index) => 
        square.setAttribute('square-id', index));
}
function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#king'));
    if (!kings.some(king => king.firstChild.classList.contains('white'))) {
        infoDisplay.innerHTML = "black player wins";
        stop();  // Arrête le chronomètre
        resetGame();
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false));
    }
    else if (!kings.some(king => king.firstChild.classList.contains('black'))) {
        infoDisplay.innerHTML = "white player wins";
        stop();  // Arrête le chronomètre
        resetGame()
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false));
    }
}

function resetGame() {
    // Réinitialiser le chronomètre
    reset();

    // Réinitialiser les IDs des cases
    revertIds();

    // Réinitialiser l'affichage des informations
    infoDisplay.innerHTML = "";

    // Réactiver le drag sur toutes les pièces
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => square.firstChild?.setAttribute('draggable', true));

    // Réinitialiser le plateau d'échecs
    initializeBoard();

    // Réactiver les boutons de contrôle du chronomètre
    btn_start.disabled = false;

    // Réinitialiser l'affichage du joueur
    playerGo = "white";
    playerDisplay.textContent = 'white';
}

// Exemple de fonction pour réinitialiser le plateau
function initializeBoard() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        // Suppression des pièces existantes
        while (square.firstChild) {
            square.removeChild(square.firstChild);
        }
    });

    // Remettre en place les pièces initiales (exemple pour les rois)
    let whiteKing = document.createElement('div');
    whiteKing.classList.add('piece', 'white', 'king');
    squares[4].appendChild(whiteKing); // Position initiale pour le roi blanc

    let blackKing = document.createElement('div');
    blackKing.classList.add('piece', 'black', 'king');
    squares[60].appendChild(blackKing); // Position initiale pour le roi noir
    
    // Ajouter d'autres pièces ici selon vos besoins
}


/*******************************************chronometre******************************************/
// les variables 
var sp, btn_start, btn_stop, t, ms, s, mn, h;

// fonctions pour initialiser les variables lors du chargement de la page
window.onload = function () {
    sp = document.getElementsByTagName('span');
    btn_start = document.getElementsByTagName('start')[0];
    btn_stop = document.getElementsByTagName('stop')[0];
    t;
    ms = 0, s = 0, mn = 0, h = 0;
}

// mettre en place le compteur
function update_chrono() {
    ms += 1;
    if (ms == 10) {
        ms = 1;
        s += 1;
    }
    if (s == 60) {
        s = 0;
        mn += 1;
    }
    if (mn == 60) {
        mn = 0;
        h += 1;
    }
    // insertion des valeurs dans les span
    sp[0].innerHTML = h + "h";
    sp[1].innerHTML = mn + "min";
    sp[2].innerHTML = s + "s";
    sp[3].innerHTML = ms + "ms";
}

// mise en place de la fonction du bouton start
function start() {
    t = setInterval(update_chrono, 100);
    btn_start.disabled = true;
}

// stop du chronomètre
function stop() {
    clearInterval(t);
    btn_start.disabled = false;
}

// initialisation des valeurs du compteur
function reset() {
    clearInterval(t);
    btn_start.disabled = false;
    ms = 0, s = 0, mn = 0, h = 0;
    sp[0].innerHTML = h + 'h';
    sp[1].innerHTML = mn + 'min';
    sp[2].innerHTML = s + 's';
    sp[3].innerHTML = ms + 'ms';
}

function jouerbip() {
    let bip = document.getElementById('bip');
    bip.play();
}