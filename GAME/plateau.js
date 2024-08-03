// Sélectionne les éléments du DOM pour le plateau de jeu, l'affichage du joueur et l'affichage des informations
const gameBoard = document.querySelector("#gameBoard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");

// Définit la largeur du plateau de jeu (8x8 pour un échiquier)
const width = 8;

// Déclaration des pièces de jeu en tant qu'éléments HTML avec des icônes SVG
const king = '<div class="piece" id="king"><svg ...></svg></div>';
const queen = '<div class="piece" id="queen"><svg ...></svg></div>';
const bishop = '<div class="piece" id="bishop"><svg ...></svg></div>';
const knight = '<div class="piece" id="knight"><svg ...></svg></div>';
const rook = '<div class="piece" id="rook"><svg ...></svg></div>';
const pawn = '<div class="piece" id="pawn"><svg ...></svg></div>';

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


const allSquares = document.querySelectorAll(".square");

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();
    const correctGo = draggedElement.firstChild.classList.contains(playerGo); 
    const taken = e.target.classList.contains('piece') 
    const valid = checkIfValid(e.target);
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);

    if (correctGo) {
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            checkForWin();
            changePlayer();
            jouerbip();
            return
        }

        else if (taken && !takenByOpponent) {
            infoDisplay.textContent = "You cannot go here!";
            setTimeout(() => infoDisplay.textContent = "", 2000);
            return
        }

        else if (valid) { 
            e.target.append(draggedElement);
            checkForWin();
            changePlayer();
            jouerbip();
            return
        }
        
    }
}

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
