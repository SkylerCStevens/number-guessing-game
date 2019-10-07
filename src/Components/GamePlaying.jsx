import React from 'react';

class GamePlaying extends React.Component {
    state = {
      guess: "0"
    };
  
    handleChange = e => this.setState({ [e.target.name]: e.target.value });
  
    handleSubmit = e => {
      e.preventDefault();
  
      const { guess } = this.state;
      this.props.submitGuess(parseInt(guess));
    };
  
    render() {
      const { guess } = this.state;
  
      return (
        <div className="text-center">
          <h2 className="text">{this.props.mode.toUpperCase()}</h2>
          <h3 className="text">Number of Guesses: {this.props.numGuesses}</h3>
          <h3>High Score Standard: {this.props.highscore.standard}</h3>
          <h3>High Score Expert: {this.props.highscore.expert}</h3>
          <h3>High Score Impossible: {this.props.highscore.impossible}</h3>
          <form  onSubmit={this.handleSubmit} className="mt-4">
            <label htmlFor="FormInputName" className="text">
              Guess
            </label>
            <input
              type="number"
              className="form-control mb-2 mr-sm-2 numInput"
              placeholder="0"
              name="guess"
              onChange={this.handleChange}
              value={guess}
            />
  
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </form>
          <button onClick={() => this.props.resetGame()} type="button" className="btn btn-danger">
            Reset Game
          </button>
          <p className="text">{this.props.highOrLow}</p>
          <p className="text">{this.props.newScore}</p>
        </div>
      );
    }
  }

  export default GamePlaying;