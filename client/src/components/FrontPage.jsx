import React from 'react';
import { Jumbotron, FormGroup, FormControl, Button } from 'react-bootstrap';
import style from '../../styles/frontpage.css';

let FrontPage = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Tic-Sock-IO!</h1>
        <p>This is an implementation of tic-tac-toe using socket.io. Get started by adding a username. Then create a new game and invite a friend!</p>
      </Jumbotron>
      <div className={style.joinOptions}>
        <div className={style.joinOption}>
          <div className={style.joinHeading}>Join game</div>
          <div className={style.joinBody}>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Enter code"
                onChange={e=>{props.handleChange('joinCode', e)}}
                value={props.joinCode}
                inputRef={()=>{}}
              />
              <Button
                bsStyle="warning"
                onClick={()=>{confirmGame(props.user, ()=> {
                  props.socket.emit('joinGame', {username: props.user, gameToken: props.joinCode});
                })}}
                >Join</Button>
            </FormGroup>
          </div>
        </div>
        <div className={style.joinOption}>
          <div className={style.joinHeading}>New game</div>
          <div className={style.joinBody}>
            <Button
              bsStyle="warning"
              onClick={()=>{confirmGame(props.user, ()=> {
                props.socket.emit('createGame', {username: props.user});
              })}}
              >+ Create</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

let confirmGame = (username, callback) => {
  if(username.length === 0) {
    alert('you must input a username')
  } else {
    callback();
  }
}

export default FrontPage;
