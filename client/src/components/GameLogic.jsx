import React from 'react';
import Board from './Board.jsx';
import Scoreboard from './Scoreboard.jsx';
import style from '../../styles/style.css';
import { Col } from 'react-bootstrap';

class GameLogic extends React.Component {
  constructor(props){
    super(props);
    this.player1 =  "X";
    this.player2 = "O";
    this.state = {
      gameToken: '',
      currentTurnPlayer: "X",
      currentPlayer: '',
      players: [],
      scores: [],
      gameState: [['','',''],['','',''],['','','']],
      winner: false
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.props.socket.on('updateState', (data)=>{
      this.setState({
        gameToken: data.gameToken,
        currentTurnPlayer: data.turn ? "X" : "O",
        gameState: JSON.parse(data.gameState),
        players: JSON.parse(data.players),
        scores: JSON.parse(data.scores),
        currentPlayer: JSON.parse(data.players)[+data.turn],
        winner: data.winner
      })
    })

  }

  clickHandler(e){
    if(this.state.winner){return}
    if(!e.target.innerHTML && this.props.user === this.state.currentPlayer) {
      var newGameState = this.state.gameState.slice(0);
      newGameState[e.target.id[0]][e.target.id[1]] = this.state.currentTurnPlayer;
      var nextState = {
        gameState : newGameState,
        currentPlayer: this.state.currentTurnPlayer === "X" ? this.player2Name : this.player1Name,
        currentTurnPlayer : this.state.currentTurnPlayer === "X" ? this.player2 : this.player1,
        winner: this.hasWinner(e.target.id, this.state.currentTurnPlayer),
      }
      this.setState(nextState, ()=>{this.props.socket.emit('turnToDb', this.state)});
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.winner && prevState.currentPlayer !== undefined){
      alert(prevState.currentPlayer + ' won!');
    }
  }

  newGameCondition(e) {
    this.setState({
      winner: false,
      gameState: [['','',''],['','',''],['','','']]
    }, ()=>{this.props.socket.emit('turnToDb', this.state)});
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
        var newScores = this.state.scores;
        if(this.state.currentPlayer === this.state.players[0]) {
          newScores[0] += 1;
        } else {
          newScores[1] += 1;
        }
        this.setState({
          scores : newScores
        });
        return symbol;
      }
    return false;
  }

  render() {
    return (
      <div className={'row'}>
        <Col xs={12} sm={4} md={6} className={style.score}>
          <Scoreboard turn={this.state.currentPlayer} players={this.state.players} scores={this.state.scores} newGame={this.newGameCondition.bind(this)}/>
        </Col>
        <Col xs={12} sm={8} md={6} className={style.board}>
          <Board clickHandler={this.clickHandler} gameState={this.state.gameState}/>
        </Col>
      </div>
    );
  }
}

export default GameLogic;
