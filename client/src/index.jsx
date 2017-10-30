import React from 'react';
import ReactDOM from 'react-dom';
import GameLogic from './components/GameLogic.jsx';
import FrontPage from './components/FrontPage.jsx';
import Nav from './components/Nav.jsx';
import style from '../styles/style.css';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user: "",
      joinCode: "",
      enterGameBoard: false
    };
    this.socket = io();
    this.handleChange = this.handleChange.bind(this);

    this.socket.on('toggleGameBoard', ()=> {
      this.setState({
        enterGameBoard: !this.state.enterGameBoard
      })
    });
    this.socket.on('joinCode', (code)=> {
      this.setState({
        joinCode: code
      })
    });
    this.socket.on('alert', (alertMsg)=>{
      window.alert(alertMsg.msg)
    })

  }

  handleChange(state, e) {
    var obj = {}
    obj[state] = e.target.value;
    this.setState(obj)
  }

  joinGame() {
    this.setState({
      enterGameBoard: !this.state.enterGameBoard
    })
  }

  render() {
    var mainPage;
    if (this.state.enterGameBoard) {
      mainPage = (
        <GameLogic
          user={this.state.user}
          joinCode={this.state.joinCode}
          socket={this.socket}
        />);
    } else {
      mainPage = (
        <FrontPage
          user={this.state.user}
          joinCode={this.state.joinCode}
          handleChange={this.handleChange}
          joinGame={this.joinGame}
          socket={this.socket}
        />);
    }

    return (
      <div>
        <Nav
          enterGameBoard={this.state.enterGameBoard}
          user={this.state.user}
          joinCode={this.state.joinCode}
          handleChange={this.handleChange}
        />
        {mainPage}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
