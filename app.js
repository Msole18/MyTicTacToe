const tictacControler = ( () => {
    const winCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [2, 5, 8], [1, 4, 7], [0, 3, 6]];
    const data = {
        activePlayer: {
            nameClass: '', 
            animalClass: '',
            imgSrc:'', 
            score: 0 
        },
        totalScore:{ 
            scoreOne: 0 , 
            scoreTwo: 0  
        }
    }

    return {
        // Ramdon player go first
        randomPlayer: () => {
            let actPlayer = (Math.random() >= 0.5);
            if (actPlayer >= 0.5) {
                const domPlayerOne = document.querySelectorAll('.player-1');
                domPlayerOne.forEach( dom => dom.classList.add('active-player'));
                data.activePlayer.nameClass = 'player-1'; 
            } else {
                const domPlayerTwo = document.querySelectorAll('.player-2');  
                domPlayerTwo.forEach( dom => dom.classList.add('active-player'));
                data.activePlayer.nameClass = 'player-2';  
            }
            prinTest('ramdom es: ' + data.activePlayer.nameClass);
            return data;
        },
        setPlayers:(e, obj) => { // set active player animal selection
            if (e.target.classList.contains('modal-monkey')) {
                data.activePlayer.animalClass = 'monkey-class';
                data.activePlayer.imgSrc = 'monkey.svg';
            } 
            if (e.target.classList.contains('modal-squirrel')) {
                data.activePlayer.animalClass = 'squirrel-class';
                data.activePlayer.imgSrc = 'squirrel.png';
            }
            return obj;
        },
        // Get box
        boxClick: (e, obj) => { // Add or not the current animal Class in the box that was clicked
            if (e.target.classList.contains('monkey-class')) return false;
            if (e.target.classList.contains('squirrel-class')) return false;
            e.target.classList.add(obj.activePlayer.animalClass);
            return true;     
        },
        nextPlayer: (obj) => { // Set the next active player
            const domPlayerOne = document.querySelectorAll('.player-1'),
                  domPlayerTwo = document.querySelectorAll('.player-2');
                  
            obj.activePlayer.nameClass === 'player-1' ? data.activePlayer.nameClass = 'player-2':
                                                        data.activePlayer.nameClass = 'player-1';
            obj.activePlayer.animalClass === 'monkey-class' ? data.activePlayer.animalClass = 'squirrel-class': 
                                                              data.activePlayer.animalClass = 'monkey-class';
            obj.activePlayer.imgSrc === 'monkey.svg' ? data.activePlayer.imgSrc = 'squirrel.png':
                                                       data.activePlayer.imgSrc = 'monkey.svg';
            domPlayerOne.forEach( dom => dom.classList.toggle('active-player'));
            domPlayerTwo.forEach( dom => dom.classList.toggle('active-player'));
            return obj;
        },
        checkWinner:(obj) => {
            const boxElements = document.querySelectorAll('.card');
            return winCombination.some(combination => {                
              return combination.every(index => {                
                return boxElements[index].classList.contains(obj.activePlayer.animalClass);
              })
            })
        },
        checkDraw: () =>  {
            const boxElements = document.querySelectorAll('.card');
            return [...boxElements].every(box => {
              return box.classList.contains('monkey-class') || box.classList.contains('squirrel-class')
            })
        },
        addScore: (obj) => {
            if  (obj.activePlayer.nameClass === 'player-1') data.totalScore.scoreOne += 1;
            if  (obj.activePlayer.nameClass === 'player-2') data.totalScore.scoreTwo += 1; 
            return obj;
        },
        resetTicTac:(obj) => {
            Object.assign(data, {activePlayer: {nameClass: '', animalClass: '', imgSrc:'', score: 0},
                                 totalScore: {scoreOne: 0 , scoreTwo: 0 }})
        }              
    }
})();

const UIController = ( () => {
    const DOMstrings = {
        gameContainer: '.boxes-container',
        modalImg: '.modal-img',
        btnModalClose: '.btn-close-modal',
        btnModalStart: '.btn-start-modal',
        btnNewGame: '.btn-new-game',
        btnNextWinner: '.btn-next-winner',
        btnNextDraw: '.btn-next-draw',
        btnReset: '.btn-reset',
        modalContainer: '.modal-container',
        card: '.card',
        playerOne:'.player-1',
        playerTwo: '.player-2',
        actPlayer: '.active-player',
        actTurn: '.active-turn',
        actImg: '.active-img',
        modal: '.modal',
        modalFirst: '.first-player',
        modalMonkey: '.modal-monkey',
        modalSquirrel: '.modal-squirrel',
        animalImg:'.animal-img',
        drawContainer: '.draw-container',
        drawModal: '.draw-modal',
        winnerContainer: '.winner-container',
        winnerModal: '.winner-modal',
        winnerImg: '.winner-img', 
        playerOneID:'player-1',
        playerTwoID: 'player-2',
        winnerPlayerID: 'winner-player'      
    }

    return {
        displayBoxCliked: (e,obj) => { 
            // 1. Click Box
            e.target.lastElementChild.firstElementChild.src = obj.activePlayer.imgSrc;
            e.target.style.transform = 'rotateY(180deg)';
        },
        displayActPlayer: (obj) => {
            const domActPlayer = document.querySelectorAll(DOMstrings.actPlayer),
                  domPlayerOne = document.querySelectorAll(DOMstrings.playerOne),
                  domPlayerTwo = document.querySelectorAll(DOMstrings.playerTwo);
            domPlayerOne.forEach( dom => {
                if (dom.classList.contains('active-turn')) dom.innerText = '';
                if (dom.classList.contains('active-img')) {
                    dom.src = ''; 
                    dom.style.visibility = 'hidden';
                }
            });
            domPlayerTwo.forEach( dom => {
                if (dom.classList.contains('active-turn')) dom.innerText = '';
                if (dom.classList.contains('active-img')) {
                    dom.src = ''; 
                    dom.style.visibility = 'hidden';
                }
            });
            domActPlayer.forEach( dom => {
                if (dom.classList.contains('active-turn')) dom.innerText = 'Your turn!';
                if (dom.classList.contains('active-img')) {
                    dom.src = obj.activePlayer.imgSrc;
                    dom.style.visibility = 'visible';
                } 
            });
        },
        displayReset: (reset) => {
            const domBtnNew = document.querySelector(DOMstrings.btnNewGame),
                  domBtnReset = document.querySelector(DOMstrings.btnReset),
                  domCard = document.querySelectorAll(DOMstrings.card),
                  domAnimalImg = document.querySelectorAll(DOMstrings.animalImg),
                  domActTurn = document.querySelector(DOMstrings.actTurn),
                  domActImg = document.querySelector(DOMstrings.actImg);
                  
            // 1. Reset the game boxes      
            domCard.forEach( dom => {
                dom.classList.remove('monkey-class')
                dom.classList.remove('squirrel-class')
                dom.style.transform =  'none';
            });
            setTimeout(() => domAnimalImg.forEach( dom => dom.src = ''), 200);
            // 2. Reset score labels
            if(reset) {
                document.getElementById(DOMstrings.playerOneID).innerHTML = 0;
                document.getElementById(DOMstrings.playerTwoID).innerHTML = 0; 
                // Swap buttons (Reset >> New Game)
                domActTurn.textContent = '';
                domActImg.style.visibility = 'hidden';
                domActImg.src = ''; 
                domBtnReset.style.visibility = 'hidden';
                setTimeout(() => { 
                    domBtnNew.style.visibility = 'visible'
                }, 100);     
            }  
        },
        displayEndGame: (obj, draw) => {
            if (draw) { 
                const domDrawContainer = document.querySelector(DOMstrings.drawContainer),
                      domDrawModal = document.querySelector(DOMstrings.drawModal);
                // 1. Open Draw Modal
                domDrawContainer.style.opacity = 1;
                domDrawContainer.style.visibility = 'visible';
                domDrawModal.classList.toggle('modal-close');
                return;
            } 
            const domWinnerContainer = document.querySelector(DOMstrings.winnerContainer),
                  domWinnerModal = document.querySelector(DOMstrings.winnerModal),
                  domWinnerImg = document.querySelector(DOMstrings.winnerImg),
                  domWinnerPlayer = document.getElementById(DOMstrings.winnerPlayerID);
                 
            // 1. Open Winner Modal
            domWinnerContainer.style.opacity = 1;
            domWinnerContainer.style.visibility = 'visible';
            domWinnerModal.classList.toggle('modal-close');
            // 2. Update the winner score
            if(obj.activePlayer.nameClass === 'player-1') {
                document.getElementById(obj.activePlayer.nameClass).innerHTML = obj.totalScore.scoreOne;
            }
            if(obj.activePlayer.nameClass === 'player-2') {
                document.getElementById(obj.activePlayer.nameClass).innerHTML = obj.totalScore.scoreTwo;
            }
            // 3. Show the winner player
            domWinnerPlayer.innerText = obj.activePlayer.nameClass === 'player-1' ? 'Player 1' : 'Player 2';
            domWinnerImg.src = obj.activePlayer.imgSrc;                         
        }, 
        // ==================== MODAL ==================== 
        displayModal: (obj, gameState) => {
            const modalContainer = document.querySelector(DOMstrings.modalContainer),
                  modal = document.querySelector(DOMstrings.modal),
                  modalPlayer = document.querySelector(DOMstrings.modalFirst);

            //1. Open Modal windows
            modalContainer.style.opacity = 1;
            modalContainer.style.visibility = 'visible';
            modal.classList.toggle('modal-close');
            //2. Show the Active Player
            modalPlayer.innerText = `${obj.activePlayer.nameClass === 'player-1' ? 'Player 1' : 'Player 2'}`;
            //3. Clean animal selection
            if(gameState === false) {
                document.querySelector(DOMstrings.modalMonkey).style.border = ''
                document.querySelector(DOMstrings.modalSquirrel).style.border = '' 
            }
        },
        updateModalAnimal: (obj) => {
            const imgMonkey = document.querySelector(DOMstrings.modalMonkey),
                  imgSquirrel = document.querySelector(DOMstrings.modalSquirrel),
                  imgborder = '2px solid #ff0846b2';
            // 1. Clean a set the Image Border      
            imgMonkey.style.border = '';
            imgSquirrel.style.border = '';      
            obj.activePlayer.animalClass === 'monkey-class' ? imgMonkey.style.border = imgborder : imgSquirrel.style.border = imgborder;
        },
        closeModal: (e) => {
            if(e.target.classList.contains('btn-start-modal')) {
                const domModalContainer = document.querySelector(DOMstrings.modalContainer),
                      domModal = document.querySelector(DOMstrings.modal),
                      bNew = document.querySelector(DOMstrings.btnNewGame),
                      bReset = document.querySelector(DOMstrings.btnReset);
                
                bNew.style.visibility = 'hidden';
                bReset.style.visibility = 'visible';

                domModal.classList.toggle('modal-close');
                setTimeout(() => { // We set a timer to wait the transition effect
                    domModalContainer.style.opacity = 0;
                    domModalContainer.style.visibility = 'hidden';
                },900);
            }
            if(e.target.classList.contains('btn-next-winner')) {
                const domWinnerContainer = document.querySelector(DOMstrings.winnerContainer),
                      domWinnerModal = document.querySelector(DOMstrings.winnerModal);

                domWinnerModal.classList.toggle('modal-close');
                setTimeout(() => { // We set a timer to wait the transition effect
                    domWinnerContainer.style.opacity = 0;
                    domWinnerContainer.style.visibility = 'hidden';
                },900); 
            }
            if(e.target.classList.contains('btn-next-draw')) {
                const domDrawContainer = document.querySelector(DOMstrings.drawContainer),
                      domDrawModal = document.querySelector(DOMstrings.drawModal);
                
                domDrawModal.classList.toggle('modal-close');
                setTimeout(() => { // We set a timer to wait the transition effect
                    domDrawContainer.style.opacity = 0;
                    domDrawContainer.style.visibility = 'hidden';
                },900);
            } 
            if(e.target.classList.contains('btn-close-modal')) {
                const domModalContainer = document.querySelector(DOMstrings.modalContainer),
                      domModal = document.querySelector(DOMstrings.modal);
                
                domModal.classList.toggle('modal-close');
                setTimeout(() => { // We set a timer to wait the transition effect
                    domModalContainer.style.opacity = 0;
                    domModalContainer.style.visibility = 'hidden';
                },900);
            } 
        },
        // ==================== DOM Strings ====================
        getDOMstrings:() => DOMstrings
    };    
})();

const controller = ((tictacCtrl, UICtrl) => {
    const DOM = UICtrl.getDOMstrings();
    let gameState = false, ctrlboxCliked = true, playerScore, activePlayer;
    // Event listener
    const setupEventListeners = () => {
        document.querySelector(DOM.gameContainer).addEventListener('click', ctrlBoxClick); //Boxes click
        document.querySelector(DOM.btnNewGame).addEventListener('click', ctrlNewGame); //Btn-New Game click
        document.querySelector(DOM.btnReset).addEventListener('click', ctrlResetGame); //Btn-Reset click
        document.querySelector(DOM.btnModalStart).addEventListener('click', ctrlStart); //Btn-Start click
        document.querySelector(DOM.modalImg).addEventListener('click', ctrlPlayerAnimal); //Modal-Images click
        document.querySelector(DOM.btnModalClose).addEventListener('click', ctrlModalClose); //Btn-CloseModal click
        document.querySelector(DOM.btnNextWinner).addEventListener('click', ctrlNextRound); //Btn-Next Winner click
        document.querySelector(DOM.btnNextDraw).addEventListener('click', ctrlNextRound); //Btn-Next Draw click
    }
    //Btn-Next Round click
    const ctrlNextRound = (e) => {
        prinTest('Next round');
        // 1. Select a random Player to plat first
        UICtrl.displayReset(false)
        // 2. Close the modal UI                     
        UICtrl.closeModal(e);
        // 3. Activate de game state
        gameState = true;
    };   
    //Game Contaner click
    const ctrlBoxClick = (e) => { 
        if (gameState === true ) {            
            // 1. Here we control a show the cliked box
            ctrlboxCliked = tictacCtrl.boxClick(e, activePlayer);
            UICtrl.displayBoxCliked(e, activePlayer);
            if (ctrlboxCliked) {
                // 1. Chek if we have a Winner player
                if (tictacCtrl.checkWinner(activePlayer)) {
                    // 1. Add 1 point to the Winner player
                    playerScore = tictacCtrl.addScore(activePlayer);
                    // 2. Show the UI winner message
                    UICtrl.displayEndGame(playerScore,false);
                    // 4. Deactivate the game
                    return gameState = false;
                }
                // 2. Chek if we have a Draw
                if (tictacCtrl.checkDraw()) {
                    // 1. Show the UI winner message
                    UICtrl.displayEndGame(playerScore,true);
                    // 2. Deactivate the game
                    return gameState = false;
                }
                // 3. If we don't have a Winner or a Draw, we set a next player a refresh the UI
                activePlayer = tictacCtrl.nextPlayer(activePlayer);
                UICtrl.displayActPlayer(activePlayer);          
            } 
        } 
    };
    //Btn-New Game click
    const ctrlNewGame = (e) => {
        prinTest('New Game');
        // 1. Select a random Player to plat first
        activePlayer = tictacCtrl.randomPlayer();
        // 2. Display the Modal        
        UICtrl.displayModal(activePlayer,gameState);  
    };   
    //Btn-Start click
    const ctrlStart = (e) => {
        prinTest('Start the Game');
        // 1. Check if the active player selected an animal 
        if (activePlayer.activePlayer.animalClass === "") return alert('Please select an Animal');
        // 3. Activate de game state
        gameState = true;
        // 2. Close the modal UI  
        UICtrl.closeModal(e);
        // 4. Refresh de UI to show de curren player turn
        UICtrl.displayActPlayer(activePlayer);
    };
    //Modal-Images click
    const ctrlPlayerAnimal = (e) => {
        // 1. Set the animal selected to the active player and the other animal to the other player
        activePlayer = tictacCtrl.setPlayers(e, activePlayer); 
        // 2. Update modal UI
        UICtrl.updateModalAnimal(activePlayer); // need send an animal-class
    };
    //Btn-Reset click
    const ctrlResetGame = (e) => {
        prinTest('Reset');
        // 1. Reset UI and reset all variables
        controller.init();
    }; 
    //Btn-CloseModal click
    const ctrlModalClose = (e) => {
        // 1. Close the Modal
        UICtrl.closeModal(e);
        // 2. Reset the game
        controller.init();//
    };      

    return {        
        init: () => { 
            prinTest('App has started');
            ctrlplayerSelection = '', gameState = false, ctrlboxCliked = true,  
            activePlayer = '', ctrlPlayerOne = '', ctrlPlayerTwo = '';
            tictacCtrl.resetTicTac(); 
            UICtrl.displayReset(true);
            setupEventListeners(); 
           
        }
    };

})(tictacControler,UIController);

controller.init();

