import React, { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState("Human vs AI");
  const [playerDifficulty, setPlayerDifficulty] = useState(3);
  const [aiDifficulty, setAIDifficulty] = useState(3);

  // Winning conditions
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Minimax algorithm implementation
  const minimax = (board, depth, maximizingPlayer) => {
    const result = checkWinner(board);
    if (result !== null) {
      if (result === "X") {
        return -10 + depth;
      } else if (result === "O") {
        return 10 - depth;
      } else {
        return 0;
      }
    }

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let evalScore = minimax(board, depth + 1, false);
          board[i] = "";
          maxEval = Math.max(maxEval, evalScore);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          let evalScore = minimax(board, depth + 1, true);
          board[i] = "";
          minEval = Math.min(minEval, evalScore);
        }
      }
      return minEval;
    }
  };

  // Check for winner or draw
  const checkWinner = (board) => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== "")) {
      return "Draw";
    }
    return null;
  };

  // Handle cell click
  const handleClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
        return;
      }

      if (gameMode === "AI vs Human" && currentPlayer === "X") {
        // AI's turn
        let bestScore = -Infinity;
        let bestMove = null;
        for (let i = 0; i < newBoard.length; i++) {
          if (newBoard[i] === "") {
            newBoard[i] = "O";
            let score = minimax(newBoard, 0, false);
            newBoard[i] = "";
            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }
        newBoard[bestMove] = "O";
        setBoard(newBoard);
        setCurrentPlayer("X");

        const aiResult = checkWinner(newBoard);
        if (aiResult) {
          setWinner(aiResult);
        }
      }
    }
  };

  // Handle reset button click
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setCurrentPlayer("X");
  };

  // Handle game mode change
  const handleGameModeChange = (e) => {
    const selectedMode = e.target.value;
    setGameMode(selectedMode);
    resetGame();
  };

  // Handle player difficulty change
  const handlePlayerDifficultyChange = (e) => {
    const selectedDifficulty = parseInt(e.target.value);
    setPlayerDifficulty(selectedDifficulty);
    resetGame();
  };

  // Handle AI difficulty change
  const handleAIDifficultyChange = (e) => {
    const selectedDifficulty = parseInt(e.target.value);
    setAIDifficulty(selectedDifficulty);
    resetGame();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-12 h-12 border border-gray-400 flex items-center justify-center cursor-pointer text-2xl"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="text-2xl font-bold mt-4">
          {winner === "Draw" ? "It's a Draw!" : `${winner} wins!`}
        </div>
      )}
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
      <div className="mt-4 flex items-start justify-start gap-2 flex-wrap">
        <label
          htmlFor="gameMode"
          className="mr-2 text-sm text-[#212121]/70 text-left"
        >
          Game Mode:
        </label>
        <select
          id="gameMode"
          className="bg-white border border-gray-400 rounded px-2 py-1"
          value={gameMode}
          onChange={handleGameModeChange}
        >
          <option value="Human vs AI">Human vs AI</option>
          <option value="AI vs Human">AI vs Human</option>
        </select>
        {gameMode === "AI vs Human" && (
          <select
            id="aiDifficulty"
            className="bg-white border border-gray-400 rounded px-2 py-1 ml-2"
            value={aiDifficulty}
            onChange={handleAIDifficultyChange}
          >
            <option value="1">Easy</option>
            <option value="3">Medium</option>
            <option value="5">Hard</option>
          </select>
        )}
        {gameMode === "Human vs AI" && (
          <select
            id="playerDifficulty"
            className="bg-white border border-gray-400 rounded px-2 py-1 ml-2"
            value={playerDifficulty}
            onChange={handlePlayerDifficultyChange}
          >
            <option value="1">Easy</option>
            <option value="3">Medium</option>
            <option value="5">Hard</option>
          </select>
        )}
      </div>
      <div className="text-sm text-[#212121]/70 text-left mt-3">
        <p>Enjoy the game while listening to your favorite music...</p>
      </div>
    </div>
  );
};

export default TicTacToe;
