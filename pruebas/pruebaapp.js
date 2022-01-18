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
        randomPlayer: () => {
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
            if (e.target.classList.contains('modal-monkey')) {
                activePlayer.animalClass = 'monkey-class';
                activePlayer.imgSrc = 'monkey.svg';
            } else if (e.target.classList.contains('modal-squirrel')) {
                activePlayer.animalClass = 'squirrel-class';
                activePlayer.imgSrc = 'squirrel.png';
            }
            return activePlayer
        },
        // Get box
        boxClick: (e, obj) => { // Add or not the current animal Class in the box that was clicked
            if (e.target.classList.contains('monkey-class')) return false;
            if (e.target.classList.contains('squirrel-class')) return false;
            e.target.classList.add(obj.animalClass);
            return true;     
        },
        nextPlayer: (obj) => { // Set the next active player
            const domPlayerOne = document.querySelectorAll('.player-1'),
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
        displayBoxCliked: (e,obj) => { 
            // 1. Click Box
            e.target.lastElementChild.firstElementChild.src = obj.imgSrc
            e.target.style.transform = 'rotateY(180deg)';
        },
        displayActPlayer: (obj) => {
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
        displayPrueba: () => {

            const domModalContainer = document.querySelector(DOMstrings.modalContainer),
                  domModal = document.querySelector(DOMstrings.modal);
                   domText = document.querySelectorAll('.modal-text');
            let newHTML = '';

            // 1. Open Modal windows
            UIController.displayModal(false);
            // 2. Clear Modal windows
            //  alert(domText.firstChild)
            // while (domText.firstChild) {
            //     if  (domText.firstChild.contains(document.getElementById('btn-modal'))) alert("los tengo")
            //     domText.removeChild(domText.firstChild);

            // }      

            const p = domModal.some((domText) => {
                console.log("muestra el x:" + domText.classList)
            })     
            // 4. Show a End Game message
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
                            <button class="btn btn-next-modal" id="btn-modal">Next Round</button>
                        </div>
                    </div>
                </div>`
            
            domModal.insertAdjacentHTML('beforeend',newHTML);           
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
            const cardsDOM = document.querySelectorAll('.card'),
                  bNew = document.querySelector(DOMstrings.btnNewGame),
                  bReset = document.querySelector(DOMstrings.btnReset),
                  imgDOM = document.querySelectorAll('.animal-img');
            // Reset the game boxes      
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
            // Reset score labels
            document.getElementById('player-1').innerHTML = 0;
            document.getElementById('player-2').innerHTML = 0; 
            // Swap buttons (Reset >> New Game)
            document.querySelector('.active-turn').textContent = '';
            document.querySelector('.active-img').style.visibility = 'hidden';
            document.querySelector('.active-img').src = ''; 
            bReset.style.visibility = 'hidden';
            setTimeout(() => { 
                bNew.style.visibility = 'visible'
            }, 100);     
        },
        displayIndex: (gameActive) => {
            const pOne = document.querySelector(DOMstrings.classOne),
                  pTwo = document.querySelector(DOMstrings.classTwo),
                  bNew = document.querySelector(DOMstrings.btnNewGame),
                  bReset = document.querySelector(DOMstrings.btnReset),
                  bNext = document.querySelector(DOMstrings.btnNext);

                //   bNew.style.visibility = 'hidden';
                //   bNew.disabled = true;
                //   // bReset.style.opacity = 0.5;
                //   bReset.style.visibility = 'visible';
                //   bReset.disabled = true;
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
                bReset.style.visibility = 'visible';
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
    let gameState = false, ctrlboxCliked = true, 
        playerScore, activePlayer,
        ctrlPlayerOne, ctrlPlayerTwo, ctrlplayerSelection;
    // Event listener
    const setupEventListeners = () =>{
        //--- Modal Events----
        document.querySelector(DOM.modalImg).addEventListener('click', ctrlPlayerAnimal); // Animal Img click
        document.querySelector(DOM.btnModalStart).addEventListener('click', ctrlStart); //Btn-ModalStart click
        
        
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
        console.log('New Game');
        // 1. Select a random Player to plat first
        activePlayer = tictacCtrl.randomPlayer();
        // 2. Display the Modal        
        UICtrl.displayModal(activePlayer);  
    };   
    //Btn-Start click
    const ctrlStart = (e) => {
        console.log('Start the Game');
        // 1. Check if the active player selected an animal 
        if (activePlayer.animalClass === '') return alert('Please select an Animal');
        // 2. Refresh de index UI    
        UICtrl.displayIndex(true); // <<<<<<<<< NOTA: esta funcion capaz no sea necesaria, capaz se pueda fucionar 
        // 3. Close the modal UI                     con otra a que de momento solo controla los btn de New Game a Reset
        UICtrl.closeModal(activePlayer);
        // 4. Refresh de UI to show de curren player turn
        UICtrl.displayActPlayer(activePlayer);
        // 3. Activate de game state
        gameState = true;
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
        console.log('Reset');
        // 1. Reset UI and reset all variables
        controller.init();
    }; 
    //Btn-CloseModal click
    const ctrlModalClose = (e) => {
        // 1. Close the Modal
        UICtrl.closeModal();
        // 2. Reset the game
        controller.init();//
    };      

    return {        
        init: () => { 
            console.log('App has started');
            ctrlplayerSelection = '', gameState = false, ctrlboxCliked = true,  
            activePlayer = '', ctrlPlayerOne = '', ctrlPlayerTwo = '';
            tictacCtrl.resetTicTac(); 
            UICtrl.displayReset();
            setupEventListeners(); 



          
        }
    };

})(tictacControler,UIController);

controller.init();

// me falta controlar los botones de next round y de reset
// y los @media querys