import React from 'react';
//Importing the bootstrap library for easy styling. Had to load through npm first
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GameStart from './Components/GameStart';
import GamePlaying from './Components/GamePlaying';

//Set initial state that we don't need to save through the resets.
const initialState = {
  playing: false,
  numGuesses: 0,
  currentGuess: null,
  value: null,
  mode: "standard",
  highOrLow: "",
  newScore: ""
};
//Class to gather all the components and handle functions
class App extends React.Component {
  //keep highscore out of initial state because it shouldn't be reset
  state = {
    ...initialState,
    highscore: {
      standard: 0,
      expert: 0,
      impossible: 0
    }
  };
//calculate the numbers for the games
  generateValue = (mode = "standard") => {
    let value;
    //generate a value between 1-100
    if (mode === "expert") {
      value = (Math.floor(Math.random()*100)+1);
      //console.log(value)//for quick check of functionality
      //generate a value between 1-100
    }else if (mode === "impossible"){
      value = (Math.floor(Math.random()*1000)+1);
      //console.log(value)//for quick check of functionality
      //generate a value between 1-1000
    }else {
      value = (Math.floor(Math.random()*10)+1);
      //console.log(value)//for quick check of functionality
      //generate a value between 1-10
    }

    this.setState({ value, mode, playing: true });
  };


  submitGuess = currentGuess => {
    const { numGuesses, mode, value, highscore } = this.state;

    let guessAmount = numGuesses + 1;
    let setScore = "You Won!";

    // Check if they win
    if (currentGuess === value ) {
      //set initial highscore since nothing would be less than 0
      if(highscore[mode] === 0){
        highscore[mode] = guessAmount;
      }
      //see if they set a high score
      if (guessAmount < highscore[mode]) {
        highscore[mode] = guessAmount;
         setScore = "Congrats! You beat your High Score!"
      };
      //get value of highlow from the returns of handle wrong guess
      let highLow = this.handleWrongGuess();
      //set the changes from function in if they win
      this.setState({
        currentGuess,
        numGuesses: guessAmount,
        highscore: highscore,
        highOrLow: highLow,
        newScore: setScore
      });
    } else {
      let highLow = this.handleWrongGuess(currentGuess, value);
      //set the changes for if they don't win
      this.setState({
        currentGuess,
        numGuesses: guessAmount,
        highOrLow: highLow
      });
    }
  };
// if the user guesses wrong this sets what is returned. It is used in the function above with that set state.
  handleWrongGuess = (currentGuess, value) => {
    if (currentGuess < value) {
      return "Too low!";
    }
    else if (currentGuess > value) {
      return "Too high!";
    }
    else return "";
  }

//this is used to reset the initial state to restart the game
  resetGame = () => this.setState({ ...initialState });

  render() {
    //deconstructing the props from state we need to pass to the other comonents
    const { playing, numGuesses, highOrLow, mode, newScore, highscore } = this.state;

    return (
      //returning what we need to show up on the page and passing props
      <div className="app container text-center">
        <h1 className="mt-5 mainTitle">Lucky Numbers Guessing Game</h1>
          
        {playing && (
          <GamePlaying numGuesses={numGuesses} resetGame={this.resetGame} submitGuess={this.submitGuess} mode={mode} highOrLow={highOrLow} newScore={newScore} highscore={highscore}/>
        )}
        {!playing && <GameStart generateValue={this.generateValue} />}
      </div>
    );
  }
}

export default App;
