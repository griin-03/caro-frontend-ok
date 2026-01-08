import React from "react";
import {
  Users,
  Trophy,
  Cpu,
  Search,
  Swords,
  PlayCircle,
} from "lucide-react";
import { Avatar } from "../../../components/game/GameUI";

const Lobby = ({ user, roomList = [], onJoinGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-900 text-white relative overflow-hidden">
      {/* Background Animation Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="z-10 text-center max-w-6xl w-full px-4 flex gap-6">
        {/* ===== LEFT COLUMN ===== */}
        <div className="w-1/3 flex flex-col gap-6">
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all text-left">
            <div className="flex items-center gap-4 mb-4">
              <Avatar name={user.fullName} size={64} score={user.score} />
              <div>
                <div className="text-xl font-bold">{user.fullName}</div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Trophy size={14} className="text-yellow-500" />
                  {user.score} Elo
                </div>
              </div>
            </div>

            <button
              onClick={() => onJoinGame("CREATE")}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Swords size={20} /> Tạo Phòng Mới
            </button>
          </div>

          <button className="group relative bg-slate-800 p-6 rounded-3xl border border-slate-700 hover:border-yellow-500 transition-all text-left flex items-center gap-4">
            <Trophy
              size={32}
              className="text-yellow-500 group-hover:scale-110 transition-transform"
            />
            <div>
              <h3 className="text-lg font-bold">Đấu Hạng</h3>
              <p className="text-slate-400 text-sm">
                Leo rank Thách Đấu.
              </p>
            </div>
          </button>

          <button className="group relative bg-slate-800 p-6 rounded-3xl border border-slate-700 hover:border-purple-500 transition-all text-left flex items-center gap-4">
            <Cpu
              size={32}
              className="text-purple-500 group-hover:scale-110 transition-transform"
            />
            <div>
              <h3 className="text-lg font-bold">Luyện tập AI</h3>
              <p className="text-slate-400 text-sm">
                Thử sức với máy.
              </p>
            </div>
          </button>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="flex-1 bg-slate-800/50 rounded-3xl border border-slate-700 p-6 flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Users /> SẢNH CHỜ ({roomList.length})
            </h3>
            <div className="bg-slate-900 rounded-full px-4 py-2 border border-slate-700 flex items-center">
              <Search size={16} className="text-slate-400" />
              <input
                placeholder="Tìm phòng..."
                className="bg-transparent outline-none ml-2 text-sm w-32"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {roomList.length === 0 ? (
              <div className="text-center text-slate-500 mt-20">
                Chưa có phòng nào. Hãy tạo mới!
              </div>
            ) : (
              roomList.map((room) => (
                <div
                  key={room.id}
                  className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center hover:bg-slate-750 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="bg-slate-900 px-2 py-1 rounded text-xs text-slate-400">
                      #{room.id}
                    </span>
                    <div>
                      <div className="font-bold">
                        {room.name || `Phòng ${room.id}`}
                      </div>
                      <div className="text-xs text-slate-400">
                        Chủ:{" "}
                        {room.hostName ||
                          room.host?.fullName ||
                          "Unknown"}{" "}
                        • Elo: {room.hostElo || 1000}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onJoinGame("JOIN", room.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold flex items-center gap-2"
                  >
                    <PlayCircle size={16} /> Vào Ngay
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;