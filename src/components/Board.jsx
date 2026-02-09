function Board({ squares, onClick, winLine }) {
    return (
        <div className="grid grid-cols-3 gap-3 w-full max-w-[300px] md:max-w-[350px] aspect-square mx-auto transition-all duration-300">
            {squares.map((square, i) => (
                <button key={i} onClick={() => onClick(i)} className={`relative flex items-center justify-center rounded-xl border transition-all duration-200 aspect-square ${winLine.includes(i) ? 'bg-white border-white shadow-xl z-10' : 'bg-[#0f0f0f] border-white/5 hover:border-white/10 active:bg-white/5'}`}>
                    <span className={` text-4xl md:text-5xl font-black ${winLine.includes(i) ? 'text-black' : square === 'X' ? 'text-blue-500' : 'text-rose-500'}`}>
                        {square}
                    </span>
                </button>
            ))}
        </div>
    )
};
export default Board;