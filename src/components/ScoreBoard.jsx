import { Users, Bot } from 'lucide-react';

function ScoreBoard({ gameMode, setMode, activePlayer }) {
    return (
        <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-2 md:p-3 space-y-2 md:space-y-3 w-full max-w-[300px] md:max-w-[350px] mx-auto">
            <div className="flex bg-black p-1 rounded-lg border border-white/5">
                <button onClick={() => setMode('p2p')} className={`flex-1 flex gap-2 items-center justify-center py-1.5 md:py-2 rounded-md text-[8px] md:text-[10px] font-bold tracking-widest transition-all ${gameMode === 'p2p' ? 'bg-white text-black' : 'text-white/20'}`} >
                    <Users size={12} /> VS
                </button>
                <button onClick={() => setMode('ai')} className={`flex-1 flex gap-2 items-center justify-center py-1.5 md:py-2 rounded-md text-[8px] md:text-[10px] font-bold tracking-widest transition-all ${gameMode === 'ai' ? 'bg-white text-black' : 'text-white/20'}`}>
                    <Bot size={12} /> AI
                </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className={`py-3 px-2 rounded-lg border text-center transition-all ${activePlayer === 'X' ? 'border-blue-500/30 bg-blue-500/5' : 'border-transparent opacity-20'}`}>
                    <p className="text-[20px] text-blue-500 font-black">X</p>
                    <p className="text-[8px] text-white/40 font-bold uppercase">Sıra Səndə</p>
                </div>
                <div className={`py-3 px-2 rounded-lg border text-center transition-all ${activePlayer === 'O' ? 'border-rose-500/30 bg-rose-500/5' : 'border-transparent opacity-20'}`}>
                    <p className="text-[20px] text-rose-500 font-black">O</p>
                    <p className="text-[8px] text-white/40 font-bold uppercase">Sıra Rəqibdə</p>
                </div>
            </div>
        </div>
    )
};
export default ScoreBoard;