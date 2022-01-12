let pruebaGlobal = 'hello';
// tic tictac
//     - se realizo todo el control, gana enpate o sigue;
//     - setPlayers: no me queda claro es necesaria setear los todos los valores de los players, de momento solo uno los aributos
//       nameClass y score de los obj player 1 y 2.
//     - addScore: de momento lo uso, no me queda claro si es necesario o se puede hacer en el endGame.

// User Interface
//     3.- hacer el display de los mensajes de Winner o Draw.
//     4.- hace falta refrescar la UI despues de terminada alguna ronda
//     5.- hacer control de todos los botones
//     5.- ver el funcionamiento de los label y posiblemene buscar otros stickesy paleta de color


// Cuando termines eso, mira las siguientes ideas
//     - dependiendo de como muestres el mensaje Winner o Draw. ver que hacer con los botones de Next Round
//     - ver de modificar la index para que muestre al lado de cada jugador cual animal eligieron.
//     - hacer el display de los mensajes de Winner o Draw.
//     colocar una lista que donde elijan cuantas rondas desea jugar. 3 5 7


const tictacControler = ( () => {
    const winCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [2, 5, 8], [1, 4, 7], [0, 3, 6]];
    const playerOne = { 
            nameClass: 'player-1', 
            animalClass: '', 
            imgSrc:'', 
            score: 0 
        },
        playerTwo = { 
            nameClass: 'player-2', 
            animalClass: '', 
            imgSrc:'', 
            score: 0 
        },
        activePlayer = {
            nameClass: '', 
            animalClass: '',
            imgSrc:'', 
            score: 0 
        };

    return {
        // Ramdon player go first
        ramdomPlayer: () => {
            // let actPlayer = (Math.random() >= 0.5) 
            // actPlayer >= 0.5 ? actPlayer = 'Player 1' : actPlayer = 'Player 2';
            // console.log('ramdom es: ' + actPlayer);
            // return actPlayer;
            let actPlayer = (Math.random() >= 0.5);
            if (actPlayer >= 0.5) {
                activePlayer.nameClass = playerOne.nameClass; // 'player-1'
            } else {
                activePlayer.nameClass = playerTwo.nameClass; // 'player-2'
            }
            console.log('ramdom es: ' + activePlayer.nameClass);
            return activePlayer;
        },
        setPlayers:(e, obj) => {
            if (e.classList.contains('modal-monkey')) {
                // set player active 
                activePlayer.animalClass = 'monkey-class';
                activePlayer.imgSrc = 'monkey.svg';
                if (obj.nameClass === 'player-1') { // 'player-1'
                    // set player 1
                    playerOne.animalClass = 'monkey-class';
                    playerOne.imgSrc = 'monkey.svg';
                    //set player 2
                    playerTwo.animalClass = 'squirrel-class';
                    playerTwo.imgSrc = 'squirrel.png';
                    
                } else { // its modal monkey player 2
                    // set player 1
                    playerOne.animalClass = 'squirrel-class';
                    playerOne.imgSrc = 'squirrel.png';
                    //set player 2;
                    playerTwo.animalClass = 'monkey-class';
                    playerTwo.imgSrc = 'monkey.svg';
                }                
            } else if (e.classList.contains('modal-squirrel')) {
                // set player active 
                activePlayer.animalClass = 'squirrel-class';
                activePlayer.imgSrc = 'squirrel.png';
                if (obj.nameClass === 'player-1') { // 'player-1'
                    // set player 1
                    playerOne.animalClass = 'squirrel-class';
                    playerOne.imgSrc = 'squirrel.png';
                    //set player 2
                    playerTwo.animalClass = 'monkey-class';
                    playerTwo.imgSrc = 'monkey.svg';
                } else {
                    // set player 1
                    playerOne.animalClass = 'monkey-class';
                    playerOne.imgSrc = 'monkey.svg';
                    //set player 2
                    playerTwo.animalClass = 'squirrel-class';
                    playerTwo.imgSrc = 'squirrel.png';
                }
            }
            return {playerOne,playerTwo, activePlayer};
        },
        // Get box
        boxClick: (e, obj) => {
            if (e.classList.contains('monkey-class')) {
                 return false;
            } else if (e.classList.contains('squirrel-class')) {
                 return false;
            } else {
                e.classList.add(obj.animalClass);
                return true;     
            }
        },
        checkWinner:(obj) => {
            const boxElements = document.querySelectorAll('.card');
            return winCombination.some(combination => {                
              return combination.every(index => {                
                return boxElements[index].classList.contains(obj.animalClass);
              })
            })
        },
        checkDraw: () =>  {
            const boxElements = document.querySelectorAll('.card');
            return [...boxElements].every(box => {
              return box.classList.contains('monkey-class') || box.classList.contains('squirrel-class')
            })
        },
        checkEndGame: (draw, obj) =>  {
            console.log(`entro a endGame`)
            if (draw) {
                console.log('Draw!')
                
            } else {
                
                console.log(`${obj.nameClass === 'player-1' ? "Player 1" : "Player 2"} Wins!`)
            }  
            
        },
        nextPlayer: (obj) => {
            obj.animalClass === 'monkey-class' ? obj.animalClass = 'squirrel-class' : obj.animalClass = 'monkey-class';
            obj.imgSrc === 'monkey.svg' ? obj.imgSrc = 'squirrel.png' : obj.imgSrc = 'monkey.svg';
            return obj;
        },
        addScore: (obj) => {
            obj.nameClass === 'player-1' ? playerOne.score += 1 : playerTwo.score += 1; 
            return {playerOne, playerTwo} ;
        }

    }
})();

const UIController = ( () => {
    const DOMstrings = {
        gameContainer: '.game-container',
        modalContainer: '.modal-container',
        btnModalClose: '.close',
        btnModalStart: '.btn-modal',
        btnNewGame: '.btn-new-game',
        btnNext: '.btn-next',
        btnReset: '.btn-reset',
        classOne:'.player-1',
        classTwo: '.player-2',
        playerActive: 'player-active',
        modal: '.modal',
        modalMsg: '.modal-msg',
        modalFirst: '.first-player',
        modalImg: '.modal-img',
        modalMonkey: '.modal-monkey',
        modalSquirrel: '.modal-squirrel',
        box: '.box',
        boxImage: '.image',
       
    }

    return {
        displayBoxCliked: (e,obj) => {
            //  e.innerHTML =  obj.animalClass; // Agrega en el HTML el valor del jugador
            const animalImg = e.lastElementChild.firstElementChild.src = obj.imgSrc
            e.style.transform =  'rotateY(180deg)';
        
        },
        displayScore: (obj) => {
            document.getElementById(obj.playerOne.nameClass).innerHTML = obj.playerOne.score;
            document.getElementById(obj.playerTwo.nameClass).innerHTML = obj.playerTwo.score;
            
        },
        displayIndex: (actPlayer, playerRoll, gameActive, boxCliked) => {
            const pOne = document.querySelector(DOMstrings.classOne),
                  pTwo = document.querySelector(DOMstrings.classTwo),
                  bNew = document.querySelector(DOMstrings.btnNewGame),
                  bNext = document.querySelector(DOMstrings.btnNext);
            // 1. Set Active player UI
            // if (actPlayer === 'Player 1') {
            //     pOne.classList.add(DOMstrings.playerActive);
            //     pTwo.classList.remove(DOMstrings.playerActive);
            // } else {
            //     pOne.classList.remove(DOMstrings.playerActive);
            //     pTwo.classList.add(DOMstrings.playerActive);
            // }
            // 2. Dislabled 'New Game' btn and Enable the 'Next round' btn 
            if(gameActive === true) {
                bNew.style.visibility = 'hidden';
                bNew.disabled = true;
                bNext.style.opacity = 0.5;
                bNext.style.visibility = 'visible';
                bNext.disabled = true;
            }
        },
        //------------MODAL--------------
        displayModal: (objActPlayer) => {
            const moContainer = document.querySelector(DOMstrings.modalContainer),
                  modal = document.querySelector(DOMstrings.modal),
                  modalPlayer = document.querySelector(DOMstrings.modalFirst),
                  boxContainer = document.querySelector(DOMstrings.gameContainer);
            //1. Open Modal windows
            moContainer.style.opacity = 1;
            moContainer.style.visibility = 'visible';
            modal.classList.toggle('modal-close');
            //2. Show the Active Player 
            // boxContainer.classList.remove('player-1');
            // boxContainer.classList.remove('player-2');
            // actPlayer === 'Player 1' ? boxContainer.classList.add('player-1') : boxContainer.classList.add('player-2');
            modalPlayer.innerText = `${objActPlayer.nameClass === 'player-1' ? 'Player 1' : 'Player 2'}`;
            //3. Clean animal selection
            document.querySelector(DOMstrings.modalMonkey).style.border = ''
            document.querySelector(DOMstrings.modalSquirrel).style.border = '' 
        },
        updateModalAnimal: (obj) => {
            const imgMonkey = document.querySelector(DOMstrings.modalMonkey),
                  imgSquirrel = document.querySelector(DOMstrings.modalSquirrel);
            // 1. Clean a set the Image Border      
            imgMonkey.style.border = '';
            imgSquirrel.style.border = '';      
            obj.animalClass === 'monkey-class' ? imgMonkey.style.border = '2px solid lime' : imgSquirrel.style.border = '2px solid lime';
        },
        closeModal: (e) => {
            document.querySelector(DOMstrings.modal).classList.toggle('modal-close');
            setTimeout(() => { // We set a timer to wait the transition effect
                document.querySelector(DOMstrings.modalContainer).style.opacity = 0;
                document.querySelector(DOMstrings.modalContainer).style.visibility = 'hidden';
            },900);
        },
        // ------- DOM Strings
        getDOMstrings:() => DOMstrings
    };    
})();

const controller = ((tictacCtrl, UICtrl) => {
    const DOM = UICtrl.getDOMstrings();
    let activePlayer, playerSelection, gameState = false;  
    let ctrlPlayerOne, ctrlPlayerTwo,  ctrlActivePlayer, ctrlboxCliked = true;
    // Event listener
    const setupEventListeners = () =>{
        //--- Modal Events----
        document.querySelector(DOM.modalImg).addEventListener('click', ctrlPlayerAnimal); // Animal Img click
        document.querySelector(DOM.btnModalStart).addEventListener('click', ctrlModalStart); //Btn-ModalStart click
        document.querySelector(DOM.btnModalClose).addEventListener('click', ctrlModalClose); //Btn-ModalClose click
        // --- Boxes click Events----
        document.querySelector(DOM.gameContainer).addEventListener('click', ctrlBoxClick); //Boxes click
        //--- Btn Game Events----
        document.querySelector(DOM.btnNewGame).addEventListener('click', ctrlNewGame); //Start-Btn click
        document.querySelector(DOM.btnReset).addEventListener('click', ctrlResetGame); //Reset-Btn click
    }
    //Game Contaner click
    const ctrlBoxClick = (e) => { 
        if (gameState === true ) {            
            // 1. controlo el box click
            ctrlboxCliked = tictacCtrl.boxClick(e.target, ctrlActivePlayer);
            if (ctrlboxCliked){
                // 2. Actulizo el boxUI
                UICtrl.displayBoxCliked(e.target, ctrlActivePlayer);
                // 3. Verificar el stado del juego, ganador empate o sigue 
                if (tictacCtrl.checkWinner(ctrlActivePlayer)) {
                    // 1. finaliza la ronda
                    tictacCtrl.checkEndGame(false, ctrlActivePlayer);
                    // 2. Suma punaje
                    const ctrlScore = tictacCtrl.addScore(ctrlActivePlayer);
                    // 3. Actuliza los UI Score
                    UICtrl.displayScore(ctrlScore);
                    // 4. desactiva el juego
                    gameState = false;
                } 
                else if (tictacCtrl.checkDraw()) {
                    tictacCtrl.checkEndGame(true);
                    gameState = false;
                } else {
                    ctrlActivePlayer = tictacCtrl.nextPlayer(ctrlActivePlayer);
                }            
            } 
        } 
    };
    //Btn-ModalStart cick
    const ctrlModalStart = (e) => {
        console.log('Start the Game');
        // 1. Update Game UI
        UICtrl.displayIndex(activePlayer)
        // 2.  Validate the player Roll selection and CLose the Modal
        if (playerSelection === '') {
            alert('Please select an Animal');
        } else {
            // ctrlActivePlayer = tictacCtrl.setPlayers(e.target, ctrlActivePlayer); // return OBJ selectClass, imgSrc
            UICtrl.closeModal();
            gameState = true;
        }
    };
    //Btn-ModalClose click
    const ctrlModalClose = (e) => {
        // 1. Close the Modal
        UICtrl.closeModal();
        // 2. Reset de values that the player
        controller.init();
    };
    //Moal-Images click
    const ctrlPlayerAnimal = (e) => {
        // 1. Mirar selecion de Jugador
        playerSelection = tictacCtrl.setPlayers(e.target, ctrlActivePlayer); // return OBJ selectClass, imgSrc
        ctrlPlayerOne = playerSelection.playerOne;
        ctrlPlayerTwo = playerSelection.playerTwo;
        ctrlActivePlayer = playerSelection.activePlayer;
        // 2. Update modal UI
        UICtrl.updateModalAnimal(ctrlActivePlayer); // need send an animal-class
    };
    //Start-Btn click
    const ctrlNewGame = (e) => {
        console.log('New Game');
        // 1. Select a ramdom Player to plat first
        ctrlActivePlayer = tictacCtrl.ramdomPlayer();
        // 2. Display the Modal        
        UICtrl.displayModal(ctrlActivePlayer);  
    };
    //Reset-Btn click
    const ctrlResetGame = (e) => {
        console.log('Reset');
        // 1. Reset UI and reset all variables
        controller.init();
    };   

    return {        
        init: () => { 
            console.log('App has started');
            activePlayer = '', playerSelection = '', gameActive = false;                               
            setupEventListeners(); 
            // ctrlStartGame();           

        }
    };

})(tictacControler,UIController);

controller.init();