let pruebaGlobal = 'hello';

const tictacControler = ( () => {
    const winCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [2, 5, 8], [1, 4, 7], [0, 3, 6]];
    const playerOne = { 
            nameCLass: '', 
            animalClass: '', 
            imgSrc:'', 
            score: 0 
        },
        playerTwo = { 
            nameCLass: '', 
            animalClass: '', 
            imgSrc:'', 
            score: 0 
        },
        activePlayer = {
            nameCLass: '', 
            animalClass: ''
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
                activePlayer.nameCLass = 'player-1';;
            } else {
                activePlayer.nameCLass = 'player-2';
            }
            console.log('ramdom es: ' + activePlayer.nameCLass);
            return activePlayer;
        },
        setPlayers:(e, firstPlayer) => {
            console.log(`antes select: ${e}, and: ${firstPlayer}`);
            if (e.classList.contains('modal-monkey')) {
                // set player active 
                activePlayer.animalClass = 'monkey-class';
                if (firstPlayer === 'Player 1') {
                    // set player 1
                    playerOne.nameCLass = 'player-1';
                    playerOne.animalClass = 'monkey-class';
                    playerOne.imgSrc = 'monkey.svg';
                    //set player 2
                    playerTwo.nameCLass = 'player-2';
                    playerTwo.animalClass = 'squirrel-class';
                    playerTwo.imgSrc = 'squirrel.png';
                    
                } else { // its modal monkey player 2
                    // set player 1
                    playerOne.nameCLass = 'player-1';
                    playerOne.animalClass = 'squirrel-class';
                    playerOne.imgSrc = 'squirrel.png';
                    //set player 2
                    playerTwo.nameCLass = 'player-2';
                    playerTwo.animalClass = 'monkey-class';
                    playerTwo.imgSrc = 'monkey.svg';
                }                
            } else if (e.classList.contains('modal-squirrel')) {
                // set player active 
                activePlayer.animalClass = 'squirrel-class';
                if (firstPlayer === 'Player 1') {
                    // set player 1
                    playerOne.nameCLass = 'player-1';
                    playerOne.animalClass = 'squirrel-class';
                    playerOne.imgSrc = 'squirrel.png';
                    //set player 2
                    playerTwo.nameCLass = 'player-2';
                    playerTwo.animalClass = 'monkey-class';
                    playerTwo.imgSrc = 'monkey.svg';
                } else {
                    // set player 1
                    playerOne.nameCLass = 'player-1';
                    playerOne.animalClass = 'monkey-class';
                    playerOne.imgSrc = 'monkey.svg';
                    //set player 2
                    playerTwo.nameCLass = 'player-2';
                    playerTwo.animalClass = 'squirrel-class';
                    playerTwo.imgSrc = 'squirrel.png';
                }
            }
            return {playerOne,playerTwo, activePlayer};
        },
        // Get box
        boxClick: (clickedBox, actPlayer, actClass) => {
            const elementBox = clickedBox.classList.add(actClass);
        },
        checkWinner:(actClass) => {
            const boxElements = document.querySelectorAll('.box');
            return winCombination.some(combination => {                
              return combination.every(index => {                
                return boxElements[index].classList.contains(actClass)
              })
            })
        },
        checkDraw: () =>  {
            const boxElements = document.querySelectorAll('.box');
            return [...boxElements].every(box => {
              return box.classList.contains('monkey-class') || box.classList.contains('squirrel-class')
            })
        },
        checkEndGame: (draw, activePlayer) =>  {
            console.log(`entro a endGame`)
            if (draw) {
                console.log('Draw!')
                
            } else {
                console.log(` variable activePlayer es: ${activePlayer}`)
                console.log(`${activePlayer === "Player 1" ? "Player 1" : "Player 2"} Wins!`)
            }  
        },
        nextPlayer: (actPlayer, actClass) => {
            actPlayer === 'Player 1' ? actPlayer = 'Player 2' : actPlayer = 'Player 1';
            actClass === 'monkey-class' ? actPlayer = 'squirrel-class' : actPlayer = 'monkey-class'
            return actPlayer, actClass;
        },
        addScore: (winnerPlayer) => {
            let score = [,];
            winnerPlayer === 'Player 1' ? score[0] += 1 : score[1] += 1;
            return score[0,1];
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
        displayBoxCliked: (clickedBox,actPlayer) => {
            if (clickedBox.classList.contains('box')) {
                
                clickedBox.innerHTML =  actPlayer// Agrega en el HTML el valor del jugador
               

            }
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
            modalPlayer.innerText = `${objActPlayer.nameCLass === 'player-1' ? 'Player 1' : 'Player 2'}`;
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
    let ctrlPlayerOne, ctrlPlayerTwo,  ctrlActivePlayer;
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
    let globalScore = []
    const ctrlBoxClick = (e) => { 
        if (gameState === true) {            
            // 1. controlo el box click
            const boxCliked = tictacCtrl.boxClick(e.target, activePlayer);
            // 2. Actulizo el boxUI
            UICtrl.displayBoxCliked(e.target, activePlayer);
            // 3. Verificar el stado del juego, ganador empate o sigue 
            if (tictacCtrl.checkWinner(activePlayer)) {
                gameState = tictacCtrl.checkEndGame(false, activePlayer);
            } 
            else if (tictacCtrl.checkDraw()) {
                gameState = tictacCtrl.checkEndGame(true);
                // globalScore = tictacCtrl.addScore(activePlayer);
            } else {
                activePlayer = tictacCtrl.nextPlayer(activePlayer);
                console.log('activePlayer: ' + activePlayer);
            }            
        } 
        // console.log(`score player 1 ${globalScore[0]} and score player 2 ${globalScore[1]}`)
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
            // playerSelection = tictacCtrl.setPlayers(e.target, activePlayer); // return OBJ selectClass, imgSrc
            // ctrlPlayerOne = playerSelection.playerOne;
            // ctrlPlayerTwo = playerSelection.playerTwo;
            activePlayer.selectClass === 'monkey-class' ? activePlayer = 'monkey-class' : activePlayer = 'squirrel-class';
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
        playerSelection = tictacCtrl.setPlayers(e.target, activePlayer); // return OBJ selectClass, imgSrc
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