import React from 'react';
import { Navbar, FormGroup, FormControl } from 'react-bootstrap';

let Nav = (props) => {
  var username, leftItem;
  if(props.enterGameBoard) {
    username = (
      <Navbar.Text pullRight>
        <span style={{color: "white", fontSize: "18px", padding: "7px"}}>Username: {props.user}</span>
      </Navbar.Text>);
    leftItem = (
      <Navbar.Text>
          <span style={{color: "white", fontSize: "18px", padding: "7px"}}>Game Code: <u> {props.joinCode} </u></span>
      </Navbar.Text>);
  } else {
    username = (
      <Navbar.Form pullRight>
        <span style={{color: "white", fontSize: "18px", padding: "7px"}}>Username:</span>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Enter Your Username"
            onChange={e=>{props.handleChange('user', e)}}
            value={props.user}
            inputRef={()=>{}}
          />
        </FormGroup>
      </Navbar.Form>);
    leftItem = (
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Tic-Sock-IO</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>);

  }
  return (
    <Navbar inverse>
      {leftItem}
      {username}
    </Navbar>
  );
}

export default Nav;
