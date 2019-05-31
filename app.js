/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
-A player looses his ENTIRE score when he rolls two 6s in a row. After that is the next players turn
*/
var scores, activePlayer, roundScore;//I cant put them directly to function init because of the local-global scope
var gamePlaying = true;
var rolls = 0//new rule for 2 sixes in a row
var diceHistory = []//new rule for 2 sixes in a row
init();
function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
}



document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying){
        //1.Random number
        var dice = Math.floor(Math.random()*6) + 1;
        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';//so for example if the dice is 3, diceDOM.src will be dice-3.png which is ALSO our image name for dice3
        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1){
            //add score
            roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            //check for 2 sixes in a row
                rolls =rolls + 1;
                diceHistory.push(dice);
                if(diceHistory[rolls-1]===6 && diceHistory[rolls-2]===6){
                    document.querySelector('#score-' + activePlayer).textContent = 0;
                    alert('You got two 6 in a row.Your score is 0')
                    diceHistory = [];
                    rolls = 0;
                    nextPlayer();
                }
            //end of check for the 2 sixes  
        }else{
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add current score to global score
        scores[activePlayer] = scores[activePlayer] + roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        //undefined,0,null or '' are coerced to false
        //anything else is coerced to true
        //check if input is a valid score else it is default to 100
        if(input){
            winningScore = input;
        }else {
            winningScore = 100;
        }


        //Check if the player won the game
        if(scores[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0;
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');//instead of add/remove we put toggle so that if it had the active class then it will remove it,and if it didnt it will add it

    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active')

    document.querySelector('.dice').style.display = 'none' // when we roll 1 the dice image disapear
}

document.querySelector('.btn-new').addEventListener('click', init);//Without the () because we dont call this function.The click does


