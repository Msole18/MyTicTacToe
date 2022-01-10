// termine de acoplar el codigo del gringo con el del mexicano
// hasta el momento funciona el modal completo, falta actualizar el hover de la imagenes
// la vieja funciona completo, dice en consola cuando gana y es empate
// falta sumar puntos al ganardor
// y despues tooodo el dom pa qu se vea todo bonito
const tictacControler = ( () => {
    const winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [2, 5, 8], [1, 4, 7], [0, 3, 6]];
    const boxState = ["", "", "", "", "", "", "", "", ""];
    return{
        // Ramdon player go first
        ramdomPlayer: () => {
            let actPlayer = (Math.random() >= 0.5) 
            if (actPlayer >= 0.5) {
                actPlayer = 'Player 1';
                document.querySelector('.game-container').classList.remove('player-1');
                document.querySelector('.game-container').classList.remove('player-2');
                document.querySelector('.game-container').classList.add('player-1');
            } else {
                actPlayer = 'Player 2';
                document.querySelector('.game-container').classList.remove('player-1');
                document.querySelector('.game-container').classList.remove('player-2');
                document.querySelector('.game-container').classList.add('player-2');
            }
            console.log('ramdom es: ' + actPlayer);
            return actPlayer;
        },
        animalPlayer: (e, actPlayer) => {
            let imgScr;
            
            if (e.classList.contains('modal-monkey')) {
                // document.querySelector('.box').classList.add('monkey-class');
                actPlayer = 'monkey-class';
                imgScr = 'monkey.svg'; 

            } else {
                // document.querySelector('.box').classList.add('squirrel-class');
                actPlayer = 'squirrel-class';
                imgScr = 'squirrel.png'; 
            }
            console.log(`player select: ${actPlayer}`);
            return actPlayer;
        },
        gameClick: (clickedBox, actPlayer) => {
            // 1 .verifico y guardo la celda clickeada
            if (clickedBox.classList.contains('box')) {
                // 1. convierto lo index en un array el cual posiblemente es deberia pasar a Ctrl 
                const boxIndex = Array.from(clickedBox.parentNode.children).indexOf(clickedBox)
                if (boxState[boxIndex] !== '') return false
                boxState[boxIndex] = actPlayer;
                const elementoBox = clickedBox.classList.add(actPlayer)
                return  boxState[boxIndex];
            }     
        },
        checkWin:(actClass) => {
            console.log(`entro a checkWin`)
            const cellElements = document.querySelectorAll('.box');
            return winCombo.some(combination => {                
              return combination.every(index => {                
                return cellElements[index].classList.contains(actClass)
              })
            })
        },
        endGame: (draw) =>  {
            console.log(`entro a endGame`)
            if (draw) {
                console.log('Draw!')
                return false
            } else {
              console.log(`${draw ? "Player 1" : "Player 2"} Wins!`)
              return false
            }
        },
        isDraw: () =>  {
            console.log(`entro a isDraw`)
            const cellElements = document.querySelectorAll('.box');
            return [...cellElements].every(cell => {
              return cell.classList.contains('monkey-class') || cell.classList.contains('squirrel-class')
            })
        },
        nextPlayer: (actPlayer) => {
            actPlayer === 'monkey-class' ? actPlayer = 'squirrel-class' : actPlayer = 'monkey-class'
            return actPlayer;
        },
        cleanBoxState: () => {
            let i = boxState.length
            while (i--) {
                boxState[i] = '';
            }
        }
    }


    // gameResult: (gameActive) => {

    //     let roundWon = false;
    //     for (let i = 0; i < winState.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
    //       const winCondition = winState[i] // Guarda la combinación por ejemplo: [0, 1, 2]
    //       let position1 = boxState[winCondition[0]],
    //           position2 = boxState[winCondition[1]],
    //           position3 = boxState[winCondition[2]]; // Almacena el valor del estado actual del juego según las posiciones de winCondition
      
    //       if (position1 === '' || position2 === '' || position3 === '') continue; // Si hay algún valor vacio nadie ha ganado aún
    //       if (position1 === position2 && position2 === position3) {
    //         roundWon = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
    //         break
    //       }
    //     }
    //     if (roundWon) {
    //         console.log('You win');
    //         //  1. suma punto al jugador que gano

    //         //  2. Actulizar UI an display Winner Message

    //         //  3. De momento desactiva el juego desde aqui pero falta ver como sera display Winner Message
    //         // y donde ira el btn de Next round para activar todo de nuevo

    //         return gameActive = false;
    //     }
    //     // Check if the boxState array have an emty string "", si no tiene y no hubo un ganador es empate, nadie suma
    //     if (!boxState.includes("")) {
    //         console.log('Draw');
    //         return gameActive = false;
    //     }
    //     return gameActive;
    // },
    
 

    // nextPlayer: (type) => {
    //     let playerSelect;
    //     type.contains('modal-monkey') ?  playerSelect = 'monkey' : playerSelect = 'squirrel';
    //     console.log(`player select: ${playerSelect}`);
    //     // 1. Set de Active player
    //     // document.querySelector('.player-0').classList.toggle('player-monkey');
    //     // 2. Set de Active player
        
    //     document.querySelector('.player-1').classList.toggle('player-active');
    //     document.querySelector('.player-2').classList.toggle('player-active');
    //     return playerSelect;
    // }

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
            const pOne = document.querySelector(DOMstrings.playerOne),
                  pTwo = document.querySelector(DOMstrings.playerTwo),
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
        displayModal: (actPlayer) => {
            const moContainer = document.querySelector(DOMstrings.modalContainer),
                  modal = document.querySelector(DOMstrings.modal);
            //1. Open Modal windows
            moContainer.style.opacity = 1;
            moContainer.style.visibility = 'visible';
            modal.classList.toggle('modal-close');
            //2. Player Active message  
            document.querySelector(DOMstrings.modalFirst).innerText = `${actPlayer === 'Player 1' ? 'Player 1' : 'Player 2'}`
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
    let activePlayer, playerSelection, gameState = false;;    
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
        if (gameState === true) {
            // 1. controlo el box click
            // const boxCliked = tictacCtrl.gameClick(e.target, activePlayer);
            // 2. veo el siguiente jugador
            // activePlayer = tictacCtrl.nextPlayer(activePlayer);
            // // 3. Actulizo el boxUI
            // UICtrl.displayBoxCliked(e.target, activePlayer);
            // 4. Verificar el stado del juego, ganador empate o sigue
            // gameState = tictacCtrl.gameResult(gameState); 

            
            // 1. controlo el box click
            const boxCliked = tictacCtrl.gameClick(e.target, activePlayer);
            console.log( "antes de todo active es: " + activePlayer)
            
            // 3. Actulizo el boxUI
            
            UICtrl.displayBoxCliked(e.target, activePlayer);
            // 2. veo el siguiente jugador
            activePlayer = tictacCtrl.nextPlayer(activePlayer);
            // 4. Verificar el stado del juego, ganador empate o sigue 
            if (tictacCtrl.checkWin(activePlayer)) {
                console.log( "despues de todo active es: " + tictacCtrl.checkWin(activePlayer))
                // console.log(boxCliked)
                gameState = tictacCtrl.endGame(false)
                 console.log( "gameState es: " + gameState)
              } else if (tictacCtrl.isDraw()) {
                tictacCtrl.endGame(true)
              } else {
                tictacCtrl.nextPlayer(activePlayer);
            } 
            
        } 

        
    }

    //Btn-ModalStart cick
    const ctrlModalStart = (e) => {
        console.log('Start the Game');
        // 1. Update Game UI
        UICtrl.displayIndex(activePlayer)
        // 2.  Validate the player Roll selection and CLose the Modal
        if (playerSelection === '') {
            alert('Please select an Animal');
        } else {
            gameState = true;
            playerSelection === 'monkey-class' ? activePlayer = 'monkey-class' : activePlayer = 'squirrel-class';
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
        playerSelection = tictacCtrl.animalPlayer(e.target, activePlayer)
        // 2. Update modal UI
        UICtrl.updateModalAnimal(playerSelection);
    };
    //Start-Btn click
    const ctrlNewGame = (e) => {
        console.log('New Game');
        // 1. Select a ramdom Player to plat first
        activePlayer = tictacCtrl.ramdomPlayer();
        // 2. Display the Modal        
        UICtrl.displayModal(activePlayer);   
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
            
            tictacControler.cleanBoxState();         
            setupEventListeners(); 
         }
    };

})(tictacControler,UIController);

controller.init();