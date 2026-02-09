import { History as Icon } from 'lucide-react';
const History = ({ history, onClear }) => (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 h-[250px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-[9px] text-slate-500 tracking-widest font-black flex items-center gap-2"><Icon size={12} /> History</h3>
            <button onClick={onClear} className="text-[9px] text-rose-500 font-bold">Clear</button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
            {history.map(item => (
                <div key={item.id} className="bg-white/5 p-2 rounded border border-white/5 text-[10px]">
                    RESULT: {item.winner === 'Draw' ? 'STALEMATE' : `VICTORY_${item.winner}`}
                </div>
            ))}
        </div>
    </div>
);
export default History;