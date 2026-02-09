import React, { useState, useEffect, useCallback } from "react";
import { Menu, X as CloseIcon, Sun, Moon } from 'lucide-react';
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import Settings from "./components/Settings";
import History from "./components/History";

const WIN_LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameMode, setMode] = useState('ai');
  const [config, setConfig] = useState({ difficulty: 'Hard' });
  const [history, setHistory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const checkWinner = useCallback((squares) => {
    for (let [a, b, c] of WIN_LINES) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return squares.includes(null) ? null : { winner: 'Draw', line: [] };
  }, []);

  const minimax = useCallback((tempBoard, depth, isMaximizing) => {
    const res = checkWinner(tempBoard);
    if (res?.winner === 'O') return 10 - depth;
    if (res?.winner === 'X') return depth - 10;
    if (res?.winner === 'Draw') return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!tempBoard[i]) {
          tempBoard[i] = 'O';
          best = Math.max(best, minimax(tempBoard, depth + 1, false));
          tempBoard[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!tempBoard[i]) {
          tempBoard[i] = 'X';
          best = Math.min(best, minimax(tempBoard, depth + 1, true));
          tempBoard[i] = null;
        }
      }
      return best;
    }
  }, [checkWinner]);

  const handleMove = useCallback((index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setHistory(prev => [{ winner: result.winner, id: Date.now() }, ...prev]);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }, [board, winner, currentPlayer, checkWinner]);

  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'O' && !winner) {
      const timer = setTimeout(() => {
        let bestMove;
        if (config.difficulty === 'Easy') {
          const available = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
          bestMove = available[Math.floor(Math.random() * available.length)];
        } else {
          let bestScore = -Infinity;
          for (let i = 0; i < 9; i++) {
            if (!board[i]) {
              board[i] = 'O';
              let score = minimax(board, 0, false);
              board[i] = null;
              if (score > bestScore) {
                bestScore = score;
                bestMove = i;
              }
            }
          }
        }
        if (bestMove !== undefined) handleMove(bestMove);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, winner, board, config.difficulty, minimax, handleMove]);

  return (
    <div className={`h-screen flex flex-col overflow-hidden font-sans transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-slate-900'}`}>
      <header className={`w-full py-4 border-b flex justify-between items-center px-6 z-50 shrink-0 transition-colors ${isDarkMode ? 'bg-[#050505] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h1 className={`text-lg font-black tracking-[0.3em] ${isDarkMode ? 'opacity-80' : 'text-slate-800'}`}>TIC TAC TOE</h1>
        <button onClick={() => setIsMenuOpen(true)} className={`p-2 rounded-lg border transition-all ${isDarkMode ? 'hover:bg-white/5 border-white/5' : 'hover:bg-slate-50 border-slate-200'}`}>
          <Menu size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col items-center justify-start lg:justify-center space-y-6">
        <div className="w-full max-w-[400px] shrink-0">
          <ScoreBoard gameMode={gameMode} setMode={setMode} activePlayer={currentPlayer} />
        </div>

        <div className="w-full flex flex-col items-center gap-6 shrink-0">
          <Board squares={board} onClick={handleMove} winLine={winner?.line || []} />
          {winner && (
            <button onClick={() => { setBoard(Array(9).fill(null)); setWinner(null); setCurrentPlayer("X"); }} className={`w-full max-w-[400px] py-4 font-black rounded-xl text-xs tracking-[0.2em] uppercase active:scale-95 shadow-xl transition-all ${isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>
              YENİDƏN BAŞLAT
            </button>
          )}
        </div>
      </main>

      <aside className={`fixed inset-y-0 right-0 w-full sm:w-[350px] border-l z-[100] transform transition-transform duration-300 p-6 space-y-8 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6 shrink-0">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full transition-all ${isDarkMode ? 'text-yellow-400 hover:bg-white/10' : 'text-indigo-600 hover:bg-slate-100'}`}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsMenuOpen(false)} className={`p-2 rounded-full transition-all ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}>
            <CloseIcon size={24} />
          </button>
        </div>
        <div className="space-y-8">
          <Settings config={config} setConfig={setConfig} isDarkMode={isDarkMode} />
          <History history={history} onClear={() => setHistory([])} isDarkMode={isDarkMode} />
        </div>
      </aside>

      {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"></div>}
    </div>
  );
}

export default App;