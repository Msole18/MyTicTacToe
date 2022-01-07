const tictacControler = ( () => {
    
    const winState = [[0, 1, 2], 
                      [3, 4, 5], 
                      [6, 7, 8], 
                      [0, 4, 8], 
                      [6, 4, 2], 
                      [2, 5, 8], 
                      [1, 4, 7], 
                      [0, 3, 6]];


    return{
        // Ramdon player go first
        ramdomPlayer: () => {
            let activePlayer = (Math.random() >= 0.5) 
            if (activePlayer >= 0.5) {
                activePlayer = 'Player 1';
                document.querySelector('.player-1').classList.add('player-active');
                document.querySelector('.player-2').classList.remove('player-active');
            } else {
                activePlayer = 'Player 2';
                document.querySelector('.player-1').classList.remove('player-active');
                document.querySelector('.player-2').classList.add('player-active');
            }
            console.log('ramdom es: ' + activePlayer);
            return activePlayer;
        },
        animalPlayer: (e) => {
            let imgScr;
            e.contains('modal-monkey') ?  imgScr = 'monkey.svg' : imgScr = 'squirrel.png';
            console.log(`player select: ${imgScr}`);
            return imgScr;
        },
        gameControl: (clickedBox, animal, player) => {
            console.log("gameControl: ")
            if (clickedBox.classList.contains('box')) {
                // 1. convierto lo index en un array el cual posiblemente es deberia pasar a Ctrl 
                const clickedBoxIndex = Array.from(clickedBox.parentNode.children).indexOf(clickedBox)
                console.log('Index ' + clickedBoxIndex); 
                if (clickedBoxIndex >= 0) {
                    console.log("entro al if TWO")
                    clickedBox.innerText = animal
                
                
                }   
            }
        },
        gameStatus: (clickedBox, animal, player) => {
            console.log("gameControl: ")
            if (clickedBox.classList.contains('box')) {
                // 1. convierto lo index en un array el cual posiblemente es deberia pasar a Ctrl 
                const clickedBoxIndex = Array.from(clickedBox.parentNode.children).indexOf(clickedBox)
                console.log('Index ' + clickedBoxIndex); 
                if (clickedBoxIndex >= 0) {
                    console.log("entro al if TWO")
                    clickedBox.innerText = animal
                
                
                }   
            }
        },

        nextPlayer: (type) => {
            let playerSelect;
            type.contains('modal-monkey') ?  playerSelect = 'monkey' : playerSelect = 'squirrel';
            console.log(`player select: ${playerSelect}`);
            // 1. Set de Active player
            // document.querySelector('.player-0').classList.toggle('player-monkey');
            // 2. Set de Active player
            document.querySelector('.player-1').classList.toggle('player-active');
            document.querySelector('.player-2').classList.toggle('player-active');
            return playerSelect;
        }
    }

})();

const UIController = ( () => {
    // let contador = 0
    const DOMstrings = {
        gameContainer: '.game-container',
        modalContainer: '.modal-container',
        btnModalClose: '.close',
        btnModalStart: '.btn-modal',
        btnNewGame: '.btn-new-game',
        btnNext: '.btn-next',
        btnReset: '.btn-reset',
        playerOne:'.player-1',
        playerTwo: '.player-2',
        playerActive: '.player-active',
        modal: '.modal',
        modalMsg: '.modal-msg',
        modalFirstPlayer: '.first-player',
        modalImg: '.modal-img',
        modalMonkey: '.modal-monkey',
        modalSquirrel: '.modal-squirrel',
        box: '.box',
        boxImage: '.image',
       
    }

    return {
        displayBoxCliked: (clickedBox,playerRoll) => {
            
            if (clickedBox.classList.contains('box')) {
                console.log('Click tiene la clase'); 
                
                if (clickedBox) {
                    clickedBox.innerText = playerRoll;
                    
                    // document.querySelector('.box-img').src = `${playerRoll}`;
                    // const newHTML = `<div class="card"><div class="front"></div><div class="back"><img src="${playerRoll}" alt=""></div></div>`;
                    // document.querySelector('.box').insertAdjacentHTML('beforeend',newHTML);
                    // document.querySelector('.card').style.transform = "rotateY(180deg)";
                    // document.querySelector('.card').style.transform = "rotateY(180deg)";
                    // const newHTML = `<img class "box-img" src="${playerRoll}" alt="">`;
                    // document.querySelector('.back').insertAdjacentHTML('beforeend',newHTML);  
                    // document.querySelector('.card').style.transform = "rotateY(180deg)";               
                }   
            } else {
                console.log("no tiene clases ")
                clickedBox.innerText = playerRoll;
            }

            // if (clickedBox) {
            //     // clickedBox.innerText = playerRoll;
            //     document.querySelector('.box-img').src = playerRoll;
              
            //     // document.querySelector('.card').style.transform = "rotateY(180deg)";
            //     // document.querySelector('.card').style.src = `"${playerRoll}"`;
            // //    selector === 'monkey' ?  playerRoll = 'monkey.svg' : playerRoll = 'squirrel.png';
            
                
                
            //     // const newHTML = `<div class="card"><div class="front"></div><div class="back">
            //     //                  <img src="${playerRoll}" alt=""></div></div>`;
            //     // document.querySelector('.box').insertAdjacentHTML('beforeend',newHTML);
                
                
            // }   
            
            // console.log('Probando insertar imagen: ' + boxClick);
            // if (boxClick.contains('card')) {
            //     const boxIndex = Array.from(boxClick.parentNode.children).indexOf(clickedBox)
            //     console.log('Index ' + clickedBoxIndex); 
            //     if (boxIndex === 0 ) {
                   
            //         document.querySelector('.card').style.transform = "rotateY(180deg)";
            //         const newHTML = '<img src="squirrel.png" alt="">';
    
            //         document.querySelector('.back').insertAdjacentHTML('beforeend',newHTML); 
            //     }   
            // }

            // const clickedBox = e.target;
            // if (boxClick.contains('card')) {
            //     const clickedBoxIndex = Array.from(boxClick.parentNode).indexOf(clickedBox)
            //     console.log('Index ' + boxClick); 
            //     // if (clickedBoxIndex === 0) {
                
            //     //     document.querySelector('.card').style.transform = "rotateY(180deg)";
            //     //     const newHTML = '<img src="squirrel.png" alt="">';
            //     //     document.querySelector('.back').insertAdjacentHTML('beforeend',newHTML);
            //     // }
            // }   
        
                   
        },
        displayIndex: (actPlayer, playerRoll, gameActive, boxCliked) => {
            const pOne = document.querySelector(DOMstrings.playerOne),
                  pTwo = document.querySelector(DOMstrings.playerTwo),
                  bNew = document.querySelector(DOMstrings.btnNewGame),
                  bNext = document.querySelector(DOMstrings.btnNext);
            // 1. Set Active player UI
            if (actPlayer === 'Player 1') {
                pOne.classList.add(DOMstrings.playerActive);
                pTwo.classList.remove(DOMstrings.playerActive);
            } else {
                pOne.classList.remove(DOMstrings.playerActive);
                pTwo.classList.add(DOMstrings.playerActive);
            }
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
        displayModal: (first) => {
            const moContainer = document.querySelector(DOMstrings.modalContainer),
                  modal = document.querySelector(DOMstrings.modal);
            //1. Open Modal windows
            moContainer.style.opacity = 1;
            moContainer.style.visibility = 'visible';
            modal.classList.toggle('modal-close');
            
            //2. Player Active message         
            if (document.querySelector(DOMstrings.modalFirstPlayer)) {
                // console.log('existe')
                const p = document.querySelector(DOMstrings.modalMsg);
                const c = document.querySelector(DOMstrings.modalFirstPlayer);
                p.parentNode.removeChild(c);
            }
            const newHTML = `<p class="first-player"><span>${first}</span><br>you go first, so tell us...</p>`;
            document.querySelector(DOMstrings.modalMsg).insertAdjacentHTML('beforebegin',newHTML);

            //3. Clean animal selection
            document.querySelector(DOMstrings.modalMonkey).style.border = ''
            document.querySelector(DOMstrings.modalSquirrel).style.border = '' 
        },
        updateModalAnimal: (sel) => {
            const domMonkeyMoldal = document.querySelector(DOMstrings.modalMonkey),
                  domSquirrelMoldal = document.querySelector(DOMstrings.modalSquirrel);
            if(sel === 'monkey.svg') {
                domSquirrelMoldal.style.border = ''
                domMonkeyMoldal.style.border = '2px solid lime';             
            } 
            else if(sel === 'squirrel.png') {
                domMonkeyMoldal.style.border = ''
                domSquirrelMoldal.style.border = '2px solid lime';
            } 
        },
        closeModal: (e) => {
            // console.log('Entre a closeModal');
            document.querySelector(DOMstrings.modal).classList.toggle('modal-close');
            setTimeout(() => { // We set a timer to wait the transition effect
                document.querySelector(DOMstrings.modalContainer).style.opacity = 0;
                document.querySelector(DOMstrings.modalContainer).style.visibility = 'hidden';
            },900);
        },
        // ------- DOM Strings
        getDOMstrings:() => { // Here we make "public" or make accessible the DOMstrings object for the other App Modules
            return DOMstrings;
        }
    };
    
})();

const controller = ((tictacCtrl, UICtrl) => {
    const DOM = UICtrl.getDOMstrings();
    let playFirst, playerSelection, gameActive = false;;    
    // Event listener
    const setupEventListeners = () =>{
        // --- Boxes click Events----
        for (let boxes of document.querySelectorAll(DOM.gameContainer)) {
            boxes.addEventListener('click', ctrlGameClick);
            // boxes.addEventListener('click', ctrlGameClick,  {once: true}); //Game Contaner click
        }
        //--- Btn Game Events----
        document.querySelector(DOM.btnNewGame).addEventListener('click', ctrlNewGame); //Start-Btn click
        document.querySelector(DOM.btnReset).addEventListener('click', ctrlResetGame); //Reset-Btn click
        //--- Modal Events----
        for (let boxes of document.querySelectorAll(DOM.modalImg)) {
            boxes.addEventListener('click', ctrlPlayerAnimal);
        }
        document.querySelector(DOM.btnModalStart).addEventListener('click', ctrlModalStart); //Btn-ModalStart
        document.querySelector(DOM.btnModalClose).addEventListener('click', ctrlModalClose); //Btn-ModalClose click
    }
    //Game Contaner click
    const ctrlGameClick = (e) => { 
        if (gameActive === true) {
           // tictacCtrl.gameControl(e.target, playerSelection);
            UICtrl.displayBoxCliked(e.target, playerSelection);
        } 
        // 1. Ver el jugador activo y el animal activo
        // 2. guardar el click box en el array
        // 3. verificar el status del juego
    //    

    //    const clickedBox = elem.target;
    //     console.log("ctrlGameClick: " + clickedBox)
    //     if (clickedBox.classList.contains('box')) {
    //         // 1. convierto lo index en un array el cual posiblemente es deberia pasar a Ctrl 
    //         const clickedBoxIndex = Array.from(clickedBox.parentNode.children).indexOf(clickedBox) 

            
    //         console.log('Index ' + clickedBoxIndex); 
    //          if (clickedBoxIndex >= 0) {
    //             console.log("entro al if TWO")
    //             clickedBox.innerText = animal
    //             // document.querySelector('.card').style.transform = "rotateY(180deg)";
    //             // selector === 'monkey' ?  playerSel = 'monkey.svg' : playerSel = 'squirrel.png';
    //             // const newHTML = `<img src="${playerSel}" alt="">`;
    //             // document.querySelector('.back').insertAdjacentHTML('beforeend',newHTML); 
                
                
    //             // const newHTML = `<div class="card"><div class="front"></div><div class="back">
    //             //                  <img src="monkey.svg" alt=""></div></div>`;
    //             // document.querySelector('.box').insertAdjacentHTML('beforeend',newHTML);
                
                
    //         }   
    //     }
    }

    //Btn-ModalStart cick
    const ctrlModalStart = (e) => {
        console.log('Start the Game');
        // 1. Update Game UI
        UICtrl.displayIndex(playFirst)
        // 2.  Validate the player Roll selection and CLose the Modal
        if (playerSelection === '') {
            alert('Please select an Animal');
        } else {
            gameActive = true;
            UICtrl.closeModal();
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
        playerSelection = tictacCtrl.animalPlayer(e.target.classList)
        // 2. Update modal UI
        UICtrl.updateModalAnimal(playerSelection);
    };
    //Start-Btn click
    const ctrlNewGame = (e) => {
        console.log('New Game');
        // 1. Select a ramdom Player to plat first
        playFirst = tictacCtrl.ramdomPlayer();
        // 2. Display the Modal        
        UICtrl.displayModal(playFirst);   
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
            playFirst = '', playerSelection = '', gameActive = false;
            // for (let boxes of boxesImage) {
            //     boxes.style.display = 'block';
            //     boxes.src = 'monkey.svg';
            // }            
            setupEventListeners(); 
            // ctrlStartGame();
            

        }
    };

})(tictacControler,UIController);

controller.init();