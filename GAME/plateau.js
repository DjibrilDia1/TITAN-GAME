const gameBoard = document.querySelector("#gameBoard");
const player = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
];

function createPlateau() {
    startPieces.forEach((startPiece, index) => {
        
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPiece;
        square.setAttribute('square-id', index); 

        const ligne = Math.floor(index / 8);

        if(ligne % 2 === 0) {
            square.classList.add(index % 2 === 0 ? "beige" : "brown");
        } else {
            square.classList.add(index % 2 === 0 ? "brown" : "beige");
        }

        if (index <= 15){
            if (startPiece) {
                square.firstChild.classList.add('white');
            }
        }

        if (index >= 48){
            if (startPiece) {
                square.firstChild.classList.add('black');
            }
        }
        
        gameBoard.append(square);

    });
}

createPlateau();

const allSquares = document.querySelectorAll("#gameBoard .square");

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop); 
});

let startPositionId;
let draggedElement;

function dragStart(e){
   startPositionId = e.target.parentNode.getAttribute('square-id'); 
   draggedElement = e.target;
}

function dragOver(e){
    e.preventDefault();
}

function dragDrop(e){
    e.stopPropagation();
    if (e.target.classList.contains('square')) {
        e.target.appendChild(draggedElement);
    } else {
        e.target.parentNode.appendChild(draggedElement);
    }
}
