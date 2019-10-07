import React from 'react';

const GameStart = props => (
    <div>
        <h2 className="mt-5 mb-4 text">Start Game</h2>
      <button
        type="button"
        className="btn btn-success mr-2"
        onClick={() => props.generateValue()}
      >
        Standard
      </button>
      <button
        type="button"
        className="btn btn-warning mr-2"
        onClick={() => props.generateValue("expert")}
      >
        Expert
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => props.generateValue("impossible")}
      >
        Impossible
      </button>
    </div>
  );

  export default GameStart;