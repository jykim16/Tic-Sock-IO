import React from 'react';
import style from '../../styles/style.css'

let Board = (props) => {
  return (
      <table>
        <tbody>
          <tr className="">
            <td id='00' onClick={props.clickHandler} className={style.cell}>{props.gameState[0][0]}</td>
            <td id='01' onClick={props.clickHandler} className={style.cell}>{props.gameState[0][1]}</td>
            <td id='02' onClick={props.clickHandler} className={style.cell}>{props.gameState[0][2]}</td>
          </tr>
          <tr className="">
            <td id='10' onClick={props.clickHandler} className={style.cell}>{props.gameState[1][0]}</td>
            <td id='11' onClick={props.clickHandler} className={style.cell}>{props.gameState[1][1]}</td>
            <td id='12' onClick={props.clickHandler} className={style.cell}>{props.gameState[1][2]}</td>
          </tr>
          <tr className="">
            <td id='20' onClick={props.clickHandler} className={style.cell}>{props.gameState[2][0]}</td>
            <td id='21' onClick={props.clickHandler} className={style.cell}>{props.gameState[2][1]}</td>
            <td id='22' onClick={props.clickHandler} className={style.cell}>{props.gameState[2][2]}</td>
          </tr>
        </tbody>
      </table>
  );
}

export default Board;
