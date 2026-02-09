const Settings = ({ config, setConfig }) => (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
        <h3 className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-bold">Ayarlar</h3>
        <div className="space-y-2 sm:space-y-3">
            <p className="text-[8px] sm:text-[9px] text-white/20 tracking-widest">AI_ÇƏTİNLİYİ</p>
            <div className="flex gap-2">
                {['Easy', 'Hard'].map(lvl => (
                    <button
                        key={lvl}
                        onClick={() => setConfig({ ...config, difficulty: lvl })}
                        className={`flex-1 py-2 sm:py-3 text-[9px] sm:text-[10px] font-bold rounded-lg border transition-all 
              ${config.difficulty === lvl
                                ? 'bg-white text-black border-white'
                                : 'border-white/5 text-white/30 hover:border-white/20'}`}
                    >
                        {lvl.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default Settings;