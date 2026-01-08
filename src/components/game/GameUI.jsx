import React from 'react';
import { Trophy, AlertTriangle, RefreshCw, Home, CheckCircle } from 'lucide-react';

export const Avatar = ({ name, size = 40, showInfo = false, score = 0, role = null, isReady = false }) => {
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  const hash = (name || '?').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = colors[hash % colors.length];
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const level = Math.floor(score / 100) + 1;

  return (
    <div className={`flex items-center gap-3 ${showInfo ? 'w-full' : ''}`}>
      <div className="relative shrink-0">
        <div 
          className="rounded-full flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-white/20 transition-transform hover:scale-105"
          style={{ width: size, height: size, background: `linear-gradient(135deg, ${color}, ${color}dd)`, fontSize: size * 0.45, boxShadow: `0 0 10px ${color}66` }}
        >
          {initial}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-800">
          {level}
        </div>
        {/* Chỉ hiện dấu tích xanh khi ở phòng chờ */}
        {isReady && (
            <div className="absolute -top-1 -right-1 bg-green-500 text-white p-0.5 rounded-full border border-slate-900 animate-bounce">
                <CheckCircle size={12} fill="white" className="text-green-600"/>
            </div>
        )}
      </div>
      {showInfo && (
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm truncate max-w-[100px]">{name}</span>
            {role && <span className={`text-xs font-black px-2 py-0.5 rounded ${role==='X'?'bg-blue-500/20 text-blue-500':'bg-red-500/20 text-red-500'}`}>{role}</span>}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Trophy size={10} className="text-yellow-500"/> <span>{score} pts</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const ResultToast = ({ result, onAction }) => (
  <div onClick={onAction} className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce cursor-pointer">
    <div className={`px-6 py-3 rounded-full border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-3 backdrop-blur-md
      ${result === 'DRAW' ? 'bg-slate-800/90 border-slate-500 text-white' : 
        result === 'WON' ? 'bg-green-900/90 border-green-500 text-green-200' : 'bg-red-900/90 border-red-500 text-red-200'}`}>
      <Trophy className={result === 'WON' ? 'text-yellow-400' : 'text-slate-400'} size={24} />
      <span className="font-bold text-lg">
        {result === 'DRAW' ? 'HÒA NHAU!' : result === 'WON' ? 'BẠN ĐÃ THẮNG!' : 'BẠN ĐÃ THUA!'}
      </span>
    </div>
    <div className="text-center text-xs text-white/80 mt-1 font-semibold shadow-black drop-shadow-md">(Click để xem kết quả)</div>
  </div>
);

export const MenuModal = ({ title, message, onNewGame, onExit }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-scaleIn">
    <div className="bg-slate-800 p-8 rounded-2xl border-2 border-slate-600 shadow-2xl max-w-sm w-full text-center">
      <h2 className={`text-3xl font-black mb-2 ${title.includes('THẮNG')?'text-green-400':title.includes('THUA')?'text-red-500':'text-white'}`}>{title}</h2>
      <p className="text-slate-400 mb-8">{message}</p>
      <div className="space-y-3">
        <button onClick={onNewGame} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
          <RefreshCw size={20}/> Chơi ván mới
        </button>
        <button onClick={onExit} className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
          <Home size={20}/> Về Sảnh Chính
        </button>
      </div>
    </div>
  </div>
);

export const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] animate-fadeIn">
    <div className="bg-slate-900 border border-slate-600 p-6 rounded-2xl shadow-2xl max-w-sm w-full">
      <div className="flex items-center gap-3 mb-4 text-amber-500">
        <AlertTriangle size={28}/>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-slate-300 mb-6">{message}</p>
      <div className="flex gap-3">
        <button onClick={onConfirm} className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold">Đồng ý</button>
        <button onClick={onCancel} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold">Từ chối</button>
      </div>
    </div>
  </div>
);