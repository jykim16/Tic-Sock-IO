import React from 'react';

let Scoreboard = (props) => {
  var winners = [];
  for(var player in props.players){
    winners.push(<li key={player}>{props.players[player]+' : '}{props.scores[player]}</li>);
  }

  return (
    <div>
      <h1
        style={{
          textDecoration: 'underline',
          padding: '20px 20px 20px 40px'
        }}
      >Winner Record:</h1><h2>{props.turn || 'Opponent'}&#39;s Turn</h2>
    <button onClick={props.newGame}>New Game!</button>
      <ul style={{listStyleType: 'none'}}>
        {winners}
      </ul>
    </div>
  );
}

export default Scoreboard;
