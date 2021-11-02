import React, { useState } from 'react'
import Board from './Board'
import {calculateWinner} from '../helper'

import './Game.css'


var huPlayer = 'X';
var aiPlayer = 'O';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function minimax(newBoard, player){

    //available spots
    var availSpots = emptyIndexies(newBoard);
  
    if (winning(newBoard, huPlayer)){
       return {score:-10};
    }
      else if (winning(newBoard, aiPlayer)){
      return {score:10};
      }
    else if (availSpots.length === 0){
        return {score:0};
    }
  
    var moves = [];
  
    for (var i = 0; i < availSpots.length; i++){
      var move = {};
        move.index = newBoard[availSpots[i]];
  
      newBoard[availSpots[i]] = player;
  
      if (player === aiPlayer){
        var result = winning(newBoard, huPlayer);
        move.score = result.score;
      }
      else{
         result = winning(newBoard, aiPlayer);
        move.score = result.score;
      }
  
      newBoard[availSpots[i]] = move.index;
  
      moves.push(move);
    }
  
    var bestMove;
    if(player === aiPlayer){
      var bestScore = -10000;
      for( i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{
  
       bestScore = 10000;
      for(i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
    return moves[bestMove];
}

function emptyIndexies(board){
  return  board.filter(s => s !== 'O' && s !== 'X')
}

function winning(board, player){
    if (
           (board[0] === player && board[1] === player && board[2] === player) ||
           (board[3] === player && board[4] === player && board[5] === player) ||
           (board[6] === player && board[7] === player && board[8] === player) ||
           (board[0] === player && board[3] === player && board[6] === player) ||
           (board[1] === player && board[4] === player && board[7] === player) ||
           (board[2] === player && board[5] === player && board[8] === player) ||
           (board[0] === player && board[4] === player && board[8] === player) ||
           (board[2] === player && board[4] === player && board[6] === player)
           ) {
           return true;
       } else {
           return false;
       }
}


const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const winner = calculateWinner(board)

    const handleClick = (index) => {
        const boardCopy = [...board]
        if (winner || boardCopy[index]) return
        boardCopy[index] = 'X'
        setBoard(boardCopy)
        setXIsNext(!xIsNext)
        ////////////////////////////////////////////////////////////////////
        for(var i = 0 ; i < 9; i++){
            if(boardCopy[i] === null){
                let a
                while(true){
                    a = getRandomInt(9)
                    if (boardCopy[a] === null)
                        break
                }
                boardCopy[a] = 'O'
                setBoard(boardCopy)
                setXIsNext(!xIsNext)
                break
            }
        }
        return 
        ///////////////////////////////////////////////////////////////////
        /*
        var bestSpot = minimax(boardCopy, aiPlayer);
        boardCopy[bestSpot.index] = 'O'
        setBoard(boardCopy)
        setXIsNext(!xIsNext)
        */
        ////////////////////////////////////////////////////////////////////
    }

    const startNewGame = () => {
        return (
            <button className="start__btn" onClick={() => setBoard(Array(9).fill(null))}> Очистить поле </button>
        )
    }


    return (
        <div className="wrapper">
            <Board squares={board} click={handleClick} />
            <p className="game__info">
                { winner ? 'Победитель ' + winner : '' }
            </p>
            <br />
            { startNewGame() }
        </div>
    )
}

export default Game
