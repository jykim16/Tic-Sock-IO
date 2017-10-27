import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';
import Scoreboard from './components/Scoreboard.jsx';
import style from '../styles/style.css';

class App extends React.Component {
  constructor(){
    super();
    this.player1Name = prompt('what is your name, player X?');
    this.player2Name = prompt('what is your name, player O?');
    this.player1 =  "X";
    this.player2 = "O";
    this.state = {
      currentTurnPlayer: "X",
      currentPlayer: this.player1Name,
      players: {[this.player1Name]: 0, [this.player2Name]: 0},
      gameState: [['','',''],['','',''],['','','']],
      winner: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e){
    if(this.state.winner){return}
    if(!e.target.innerHTML) {
      var newGameState = this.state.gameState.slice(0);
      newGameState[e.target.id[0]][e.target.id[1]] = this.state.currentTurnPlayer;
      this.setState({
        gameState : newGameState,
        currentPlayer: this.state.currentTurnPlayer === "X" ? this.player2Name : this.player1Name,
        currentTurnPlayer : this.state.currentTurnPlayer === "X" ? this.player2 : this.player1,
        winner: this.hasWinner(e.target.id, this.state.currentTurnPlayer),
      });
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.winner){
      alert(prevState.currentPlayer + ' won!');
    }
  }

  newGameCondition(e) {
    this.setState({
      winner: false,
      gameState: [['','',''],['','',''],['','','']]
    });
  }

  hasWinner(id, symbol){
    var horizontal = 0;
    var vertical = 0;
    var diagonalTopLeft = 0;
    var diagonalTopRight = 0;
    var lengthOfBoard = this.state.gameState.length;
    for(var i = 0; i < this.state.gameState.length; i++){
      if(symbol === this.state.gameState[id[0]][i]) {
        vertical++;
      }
      if(symbol === this.state.gameState[i][id[1]]) {
        horizontal++;
      }
      if(this.state.gameState[i][i] === symbol) {
        diagonalTopLeft++;
      }
      if(this.state.gameState[lengthOfBoard - 1 - i][i] === symbol) {
        diagonalTopRight++;
      }
    }
    if(horizontal === lengthOfBoard ||
      vertical === lengthOfBoard ||
      diagonalTopLeft === lengthOfBoard ||
      diagonalTopRight === lengthOfBoard) {
        console.log('yo')
        this.setState({
          players : Object.assign(this.state.players, {[this.state.currentPlayer]: this.state.players[this.state.currentPlayer] + 1})
        });
        return symbol;
      }

    return false;
  }

  render() {
    return (
      <div className={'row'}>
        <div className={style.board}>
          <Board clickHandler={this.clickHandler} gameState={this.state.gameState}/>
        </div>
        <div className={style.score}>
          <Scoreboard turn={this.state.currentTurnPlayer} winners={this.state.players} newGame={this.newGameCondition.bind(this)}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
