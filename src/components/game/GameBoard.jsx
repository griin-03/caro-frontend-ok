import React, { useEffect, useRef, useState } from "react";

const BOARD_SIZE = 20;
const CELL_SIZE = 34;

const ProfessionalBoard = ({
  board,
  onCellClick,
  winLine,
  lastMove,
  isDark = true, // Mặc định Dark Mode
  disabled = false,
  selectingCell = null, // ✅ THÊM: Ô đang được chọn {row, col}
  previewPiece = null,  // ✅ THÊM: Quân cờ preview ('X' hoặc 'O')
}) => {
  const canvasRef = useRef(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [isSelectingMode, setIsSelectingMode] = useState(false); // ✅ THÊM: Trạng thái đang chọn ô

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = BOARD_SIZE * CELL_SIZE;
    const height = BOARD_SIZE * CELL_SIZE;

    // ===== 1. CLEAR CANVAS =====
    ctx.clearRect(0, 0, width, height);

    // ===== 2. DRAW BACKGROUND =====
    const bg = ctx.createLinearGradient(0, 0, width, height);
    if (isDark) {
      bg.addColorStop(0, "#0f172a"); // slate-900
      bg.addColorStop(1, "#1e293b"); // slate-800
    } else {
      bg.addColorStop(0, "#f1f5f9");
      bg.addColorStop(1, "#e2e8f0");
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // ===== 3. DRAW GRID =====
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? "#334155" : "#cbd5e1"; // slate-700 : slate-300
    ctx.beginPath();
    for (let i = 0; i <= BOARD_SIZE; i++) {
      const p = i * CELL_SIZE;
      // Dọc
      ctx.moveTo(p, 0);
      ctx.lineTo(p, height);
      // Ngang
      ctx.moveTo(0, p);
      ctx.lineTo(width, p);
    }
    ctx.stroke();

    // ===== 4. DRAW HOVER EFFECT =====
    if (hoveredCell && !disabled) {
      const { row, col } = hoveredCell;
      if (
        row >= 0 && col >= 0 &&
        row < BOARD_SIZE && col < BOARD_SIZE &&
        !board[row][col] // Chỉ hover ô trống
      ) {
        // ✅ THÊM: Hiệu ứng hover khác nhau tùy trạng thái
        if (selectingCell && selectingCell.row === row && selectingCell.col === col) {
          // Ô đang được chọn - hiệu ứng mạnh hơn
          ctx.fillStyle = isDark
            ? "rgba(59,130,246,0.4)" // Blue đậm hơn
            : "rgba(59,130,246,0.5)";
        } else {
          // Ô bình thường
          ctx.fillStyle = isDark
            ? "rgba(59,130,246,0.25)" // Blue transparent
            : "rgba(59,130,246,0.35)";
        }
        
        ctx.fillRect(
          col * CELL_SIZE,
          row * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    // ===== 5. DRAW SELECTING CELL HIGHLIGHT =====
    // ✅ THÊM: Vẽ hiệu ứng bao quanh ô đang được chọn (nhấp nháy)
    if (selectingCell && !board[selectingCell.row][selectingCell.col]) {
      const { row, col } = selectingCell;
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE;
      
      // Vẽ vòng tròn nhấp nháy tại 4 góc
      const time = Date.now() / 500; // Tạo hiệu ứng nhấp nháy dựa trên thời gian
      const pulseAlpha = 0.5 + 0.3 * Math.sin(time);
      
      ctx.save();
      ctx.strokeStyle = `rgba(59, 130, 246, ${pulseAlpha})`; // Blue với alpha thay đổi
      ctx.lineWidth = 3;
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 10;
      
      // Vẽ vòng tròn tại 4 góc
      const cornerSize = 8;
      [0, 1, 2, 3].forEach(i => {
        const cornerX = i % 2 === 0 ? x + cornerSize : x + CELL_SIZE - cornerSize;
        const cornerY = i < 2 ? y + cornerSize : y + CELL_SIZE - cornerSize;
        
        ctx.beginPath();
        ctx.arc(cornerX, cornerY, cornerSize, 0, Math.PI * 2);
        ctx.stroke();
      });
      
      // Vẽ đường viền bao quanh (mờ)
      ctx.strokeStyle = `rgba(59, 130, 246, ${pulseAlpha * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      ctx.stroke();
      ctx.restore();
      
      // ✅ Vẽ preview quân cờ mờ nếu có
      if (previewPiece) {
        const cx = col * CELL_SIZE + CELL_SIZE / 2;
        const cy = row * CELL_SIZE + CELL_SIZE / 2;
        const radius = CELL_SIZE / 2 - 6;
        
        ctx.save();
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.4; // Mờ 40%
        ctx.shadowBlur = 5;
        
        if (previewPiece === "X" || previewPiece === 'X') {
          // Vẽ X mờ (Màu Xanh)
          ctx.strokeStyle = "#3b82f6"; // blue-500
          ctx.shadowColor = "#3b82f6";
          ctx.beginPath();
          const offset = radius * 0.7; 
          ctx.moveTo(cx - offset, cy - offset);
          ctx.lineTo(cx + offset, cy + offset);
          ctx.moveTo(cx + offset, cy - offset);
          ctx.lineTo(cx - offset, cy + offset);
          ctx.stroke();
        } else {
          // Vẽ O mờ (Màu Đỏ)
          ctx.strokeStyle = "#ef4444"; // red-500
          ctx.shadowColor = "#ef4444";
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // ===== 6. DRAW PIECES (X/O) =====
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (!cell) return;

        // Tính tâm ô cờ
        const cx = c * CELL_SIZE + CELL_SIZE / 2;
        const cy = r * CELL_SIZE + CELL_SIZE / 2;
        const radius = CELL_SIZE / 2 - 6;

        ctx.save();
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 1.0; // Quân cờ thật có opacity 100%

        if (cell === "X" || cell === 'X') {
          // Vẽ X (Màu Xanh)
          ctx.strokeStyle = "#3b82f6"; // blue-500
          ctx.shadowColor = "#3b82f6";
          ctx.beginPath();
          const offset = radius * 0.7; 
          ctx.moveTo(cx - offset, cy - offset);
          ctx.lineTo(cx + offset, cy + offset);
          ctx.moveTo(cx + offset, cy - offset);
          ctx.lineTo(cx - offset, cy + offset);
          ctx.stroke();
        } else {
          // Vẽ O (Màu Đỏ)
          ctx.strokeStyle = "#ef4444"; // red-500
          ctx.shadowColor = "#ef4444";
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      });
    });

    // ===== 7. DRAW LAST MOVE HIGHLIGHT =====
    if (lastMove) {
      const cx = lastMove.y * CELL_SIZE + CELL_SIZE / 2;
      const cy = lastMove.x * CELL_SIZE + CELL_SIZE / 2;
      ctx.save();
      ctx.strokeStyle = "#fbbf24"; // amber-400
      ctx.lineWidth = 2;
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 5;
      ctx.beginPath();
      // Vẽ vòng tròn sáng bao quanh quân vừa đánh
      ctx.arc(cx, cy, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // ===== 8. DRAW WINNING LINE =====
    if (winLine && winLine.length >= 5) { 
      const start = winLine[0];
      const end = winLine[winLine.length - 1];
      ctx.save();
      ctx.strokeStyle = "#10b981"; // emerald-500
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 20;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      // start.y là cột (tọa độ x trên canvas), start.x là hàng (tọa độ y trên canvas)
      ctx.moveTo(
        start.y * CELL_SIZE + CELL_SIZE / 2,
        start.x * CELL_SIZE + CELL_SIZE / 2
      );
      ctx.lineTo(
        end.y * CELL_SIZE + CELL_SIZE / 2,
        end.x * CELL_SIZE + CELL_SIZE / 2
      );
      ctx.stroke();
      ctx.restore();
    }
  }, [board, hoveredCell, winLine, lastMove, isDark, disabled, selectingCell, previewPiece]);

  // Xử lý sự kiện click chuẩn xác
  const handleClick = (e) => {
    if (disabled) return;

    const rect = canvasRef.current.getBoundingClientRect();
    // Tính toán tọa độ chuột so với Canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Chuyển đổi sang chỉ số Hàng/Cột
    const row = Math.floor(y / CELL_SIZE);
    const col = Math.floor(x / CELL_SIZE);

    // Kiểm tra biên an toàn
    if (row >= 0 && col >= 0 && row < BOARD_SIZE && col < BOARD_SIZE) {
      onCellClick(row, col);
    }
  };

  const handleMouseMove = (e) => {
    if (disabled) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setHoveredCell({
      row: Math.floor(y / CELL_SIZE),
      col: Math.floor(x / CELL_SIZE),
    });
  };

  return (
    <div
      className={`rounded-lg shadow-2xl overflow-hidden border-4 transition-colors duration-300 relative ${
        isDark ? "border-slate-700" : "border-slate-300"
      }`}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      {/* ✅ THÊM: Tooltip hiển thị khi đang chọn ô */}
      {selectingCell && !disabled && (
        <div className="absolute top-2 right-2 z-10">
          <div className={`
            px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1
            ${isDark ? 'bg-blue-900/80 text-blue-300' : 'bg-blue-100 text-blue-800'}
          `}>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Đã chọn ô: {selectingCell.row + 1},{selectingCell.col + 1}
          </div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        width={BOARD_SIZE * CELL_SIZE}
        height={BOARD_SIZE * CELL_SIZE}
        className={`block touch-none ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCell(null)}
      />
    </div>
  );
};

export default ProfessionalBoard;