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
            let actPlayer = (Math.random() >= 0.5);
            if (actPlayer >= 0.5) {
                const domPlayerOne = document.querySelectorAll('.player-1');               
                for (let act of domPlayerOne){
                    act.classList.add('active-player');
                }
                activePlayer.nameClass = playerOne.nameClass; // 'player-1'

            } else {
                const domPlayerTwo = document.querySelectorAll('.player-2');               
                for (let act of domPlayerTwo){
                    act.classList.add('active-player');
                }
                activePlayer.nameClass = playerTwo.nameClass; // 'player-2'
            }
            console.log('ramdom es: ' + activePlayer.nameClass);
            return activePlayer;
        },
        setPlayers:(e, obj) => { // set active player animal selection
            if (e.classList.contains('modal-monkey')) {
                activePlayer.animalClass = 'monkey-class';
                activePlayer.imgSrc = 'monkey.svg';
            } else if (e.classList.contains('modal-squirrel')) {
                activePlayer.animalClass = 'squirrel-class';
                activePlayer.imgSrc = 'squirrel.png';
            }
            return activePlayer
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
        nextPlayer: (obj) => {
            const domActPlayer = document.querySelectorAll('.active-player'),
                  domPlayerOne = document.querySelectorAll('.player-1'),
                  domPlayerTwo = document.querySelectorAll('.player-2');
            obj.animalClass === 'monkey-class' ? obj.animalClass = 'squirrel-class' : obj.animalClass = 'monkey-class';
            obj.imgSrc === 'monkey.svg' ? obj.imgSrc = 'squirrel.png' : obj.imgSrc = 'monkey.svg';
            for (let playerOne of domPlayerOne) { // player-1
                playerOne.classList.toggle('active-player')
            }
            for (let playerTwo of domPlayerTwo) { // player-2
                playerTwo.classList.toggle('active-player')
            }
            
            return obj;
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
        addScore: (obj) => {
            obj.nameClass === 'player-1' ? obj.score += 1 : obj.score += 1; 
            return obj;
        },
        resetTicTac:(obj) => {
            Object.assign(playerOne, {animalClass: '', imgSrc: '', score: 0})
            Object.assign(playerTwo, {animalClass: '', imgSrc: '', score: 0})
            Object.assign(activePlayer, {nameClass: '', animalClass: '', imgSrc: '', score: 0})
        }              

    }
})();

const UIController = ( () => {
    const DOMstrings = {
        gameContainer: '.boxes-container',
        modalContainer: '.modal-container',
        btnModalClose: '.btn-close-modal',
        btnModalStart: '.btn-start-modal',
        btnNewGame: '.btn-new-game',
        btnNext: '.btn-next',
        btnReset: '.btn-reset',
        playerOne:'.player-1',
        playerTwo: '.player-2',
        activePlayer: '.active-player',
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
        displayBoxCliked: (clikedBox,obj) => { 
            // 1. Click Box
            clikedBox.lastElementChild.firstElementChild.src = obj.imgSrc
            clikedBox.style.transform = 'rotateY(180deg)';
        },
        displayTurn: (obj) => {
            const domActPlayer = document.querySelectorAll(DOMstrings.activePlayer),
                  domPlayerOne = document.querySelectorAll(DOMstrings.playerOne),
                  domPlayerTwo = document.querySelectorAll(DOMstrings.playerTwo);
            // 2. Active Player Panels
            // setTimeout(() => { 
                for (let playerOne of domPlayerOne) { // player-1
                    if (playerOne.classList.contains('active-turn')) playerOne.innerText = '';
                    if (playerOne.classList.contains('active-img')) {
                        playerOne.src = ''; 
                        playerOne.style.visibility = 'hidden';
                    }
                };
                for (let playerTwo of domPlayerTwo) { // player-2
                    if (playerTwo.classList.contains('active-turn')) playerTwo.innerText = '';
                    if (playerTwo.classList.contains('active-img')) {
                        playerTwo.src = ''; 
                        playerTwo.style.visibility = 'hidden';
                    }
                };
                for (let actPlayer of domActPlayer) { // active-player
                    if (actPlayer.classList.contains('active-turn')) actPlayer.innerText = 'Your turn!';
                    if (actPlayer.classList.contains('active-img')) {
                        actPlayer.src = obj.imgSrc;
                        actPlayer.style.visibility = 'visible';
                    } 
                };
            // },950);
        },
        displayEndGame: (obj, draw) => {
            const domModalContainer = document.querySelector(DOMstrings.modalContainer),
                  domModal = document.querySelector(DOMstrings.modal);
            let newHTML = '';

            // 1. Open Modal windows
            domModalContainer.style.opacity = 1;
            domModalContainer.style.visibility = 'visible';
            domModal.classList.toggle('modal-close');
            // 2. Clear Modal windows
            while (domModal.firstChild) {
                    domModal.removeChild(domModal.firstChild);
            }           
            // 4. Show a End Game message
            if (draw) { //empate
                newHTML = 
                `<div class="modal-text" id="end-msg"> 
                    <div class="end-title">
                        <h2 class="first-player">Draw!!</h3>
                    </div>        
                    <div class="end-msg">
                        <h1 class="first-player">No one Wins</h1>
                    </div>
                    <div class="draw-img">
                        <img class="modal-monkey " src="monkey.svg" alt="">
                        <img class="modal-squirrel" src="squirrel.png" alt="">
                    </div>         
                    <div class='end-btn'>
                        <div class="btn-container">
                            <button class="btn btn-next-modal">Next Round</button>
                        </div>
                    </div>
                </div>`
            } else {
                // 3. actualiza score
                document.getElementById(obj.nameClass).innerHTML = obj.score;   
                newHTML = 
                `<div class="modal-text" id="end-msg"> 
                    <div class="end-title">
                        <h2 class="first-player">${obj.nameClass === 'player-1' ? "Player 1" : "Player 2"}</h3>
                    </div>        
                    <div class="end-img">
                        <img class="win-img" src=${obj.imgSrc} alt="">
                    </div>
                    <div class="end-msg">
                        <h1 class="first-player">Wins</h1>
                    </div>          
                    <div class='end-btn'>
                        <div class="btn-container">
                            <button class="btn btn-next-modal">Next Round</button>
                        </div>
                    </div>
                </div>`
            }            
            domModal.insertAdjacentHTML('beforeend',newHTML);           
        },
        displayReset: () => {
            const cardsDOM = document.querySelectorAll('.card');
                imgDOM = document.querySelectorAll('.animal-img');
            for (let card of cardsDOM) {
                card.classList.remove("monkey-class")
                card.classList.remove("squirrel-class")
                card.style.transform =  'none';
            }
            setTimeout(() => { // We set a timer to wait the flip effect
                for (let img of imgDOM) {
                    img.src = '';
                }
            },200);
            document.getElementById('player-1').innerHTML = 0;
            document.getElementById('player-2').innerHTML = 0; 
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
        // ==================== MODAL ==================== 
        displayModal: (objActPlayer) => {
            const modalContainer = document.querySelector(DOMstrings.modalContainer),
                  modal = document.querySelector(DOMstrings.modal),
                  modalPlayer = document.querySelector(DOMstrings.modalFirst);

            //1. Open Modal windows
            modalContainer.style.opacity = 1;
            modalContainer.style.visibility = 'visible';
            modal.classList.toggle('modal-close');
            //2. Show the Active Player
            modalPlayer.innerText = `${objActPlayer.nameClass === 'player-1' ? 'Player 1' : 'Player 2'}`;
            //3. Clean animal selection
            document.querySelector(DOMstrings.modalMonkey).style.border = ''
            document.querySelector(DOMstrings.modalSquirrel).style.border = '' 
        },
        updateModalAnimal: (obj) => {
            const imgMonkey = document.querySelector(DOMstrings.modalMonkey),
                  imgSquirrel = document.querySelector(DOMstrings.modalSquirrel),
                  imgborder = '2px solid #ff0846b2';
            // 1. Clean a set the Image Border      
            imgMonkey.style.border = '';
            imgSquirrel.style.border = '';      
            obj.animalClass === 'monkey-class' ? imgMonkey.style.border = imgborder : imgSquirrel.style.border = imgborder;
        },
        closeModal: (obj) => {
            const domModalContainer = document.querySelector(DOMstrings.modalContainer),
                  domModal = document.querySelector(DOMstrings.modal);

            domModal.classList.toggle('modal-close');
            setTimeout(() => { // We set a timer to wait the transition effect
                domModalContainer.style.opacity = 0;
                domModalContainer.style.visibility = 'hidden';
            },900);            
        },
       
        // ==================== DOM Strings ====================
        getDOMstrings:() => DOMstrings
    };    
})();

const controller = ((tictacCtrl, UICtrl) => {
    const DOM = UICtrl.getDOMstrings();
    let gameState = false, ctrlboxCliked = true, ctrlScore,
        ctrlPlayerOne, ctrlPlayerTwo, ctrlplayerSelection;
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
                    ctrlScore = tictacCtrl.addScore(ctrlActivePlayer);
                    // 2. Suma punaje
                    UICtrl.displayEndGame(ctrlScore,false);
                    // 4. desactiva el juego
                    gameState = false;
                } else if (tictacCtrl.checkDraw()) {
                    tictacCtrl.checkEndGame(true);

                    UICtrl.displayEndGame(ctrlScore,true);
                    gameState = false;
                } else {
                    ctrlActivePlayer = tictacCtrl.nextPlayer(ctrlActivePlayer);
                    UICtrl.displayTurn(ctrlActivePlayer);
                }            
            } 
        } 
    };
    //Btn-ModalStart cick
    const ctrlModalStart = (e) => {
        console.log('Start the Game');
        // 1. Update Game UI
        // UICtrl.displayIndex(ctrlActivePlayer);
        // 2.  Validate the player Roll selection and CLose the Modal
        if (ctrlActivePlayer.animalClass === '') {
            alert('Please select an Animal');
        } else {
            // ctrlActivePlayer = tictacCtrl.setPlayers(e.target, ctrlActivePlayer); // return OBJ selectClass, imgSrc
            UICtrl.closeModal(ctrlActivePlayer);

            UICtrl.displayTurn(ctrlActivePlayer);
            gameState = true;
        }
    };
    //Btn-ModalClose click
    const ctrlModalClose = (e) => {
        // 1. Close the Modal
        // UICtrl.closeModal();
        // 2. Reset de values that the player
        // controller.init();//

         UICtrl.clearModal();
         UICtrl.displayEndGame()
    };
    //Moal-Images click
    const ctrlPlayerAnimal = (e) => {
        // 1. Mirar selecion de Jugador
        ctrlActivePlayer = tictacCtrl.setPlayers(e.target, ctrlActivePlayer); // return OBJ selectClass, imgSrc
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
        // controller.init();
        // 1. Reset UI and reset all variables
        controller.init();

    };   

    return {        
        init: () => { 
            console.log('App has started');
            ctrlplayerSelection = '', gameState = false, ctrlboxCliked = true,  
            ctrlActivePlayer = '', ctrlPlayerOne = '', ctrlPlayerTwo = '';
            tictacCtrl.resetTicTac(); 
            UICtrl.displayReset()
            setupEventListeners(); 

            // UICtrl.displayEndGame(ctrlScore,true);
            // UICtrl.displayModal(ctrlActivePlayer); 
            // UICtrl.quitarCSS()
            
            
        }
    };

})(tictacControler,UIController);

controller.init();

// me falta controlar los botones de next round y de reset
// y los @media querys