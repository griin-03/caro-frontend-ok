import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    ShoppingBag, Search, Sparkles, User, 
    LayoutTemplate, Gamepad2, Award, 
    ShieldCheck, Zap, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';

const ShopPage = () => {
  // --- STATE LOGIC (GIỮ NGUYÊN) ---
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL'); 
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { coins: 0 });
  
  // --- STATE UI MỚI (Xử lý đóng mở Menu) ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const categories = [
      { id: 'ALL', label: 'Tất cả', icon: ShoppingBag },
      { id: 'AVATAR', label: 'Nhân vật', icon: User },
      { id: 'FRAME', label: 'Khung viền', icon: LayoutTemplate },
      { id: 'CHESS_SKIN', label: 'Skin Cờ', icon: Gamepad2 },
      { id: 'TITLE', label: 'Danh hiệu', icon: Award },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/shop/items');
        setItems(res.data);
      } catch (err) {
        console.error("Lỗi tải shop:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = activeTab === 'ALL' 
      ? items 
      : items.filter(item => item.type === activeTab);

  const handleBuy = (item) => {
      alert(`[TEST MODE] Bạn đã nhận miễn phí: ${item.name}!\n(Tính năng trừ tiền thật đang bị Admin khóa để test)`);
  };

  return (
    <div className="flex h-full bg-slate-50 dark:bg-[#0f172a] overflow-hidden relative transition-all duration-500">
        
        {/* --- 1. SIDEBAR DANH MỤC (CÓ THỂ THU GỌN) --- */}
        <div 
            className={`
                relative bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-xl z-20
                transition-all duration-300 ease-in-out flex flex-col
                ${isSidebarOpen ? 'w-72 translate-x-0 opacity-100' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}
            `}
        >
            {/* Nội dung Sidebar (Chỉ hiện khi mở) */}
            <div className="w-72 p-4 flex flex-col h-full">
                <div className="mb-8 px-2">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2 tracking-tight">
                        <ShoppingBag className="text-blue-600" size={28} />
                        MALL STORE
                    </h2>
                    <div className="mt-3 text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-1 rounded-md w-fit flex items-center gap-1">
                        <ShieldCheck size={12} /> DEV MODE: FREE ALL
                    </div>
                </div>

                <nav className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 group
                                ${activeTab === cat.id 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-blue-400'
                                }
                            `}
                        >
                            <cat.icon size={20} className={activeTab === cat.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                            {cat.label}
                        </button>
                    ))}
                </nav>

                {/* Footer Sidebar */}
                <div className="mt-4 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Số dư khả dụng</p>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">$</div>
                        <span className="text-lg font-black text-slate-800 dark:text-white">{user.coins?.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-blue-500 italic opacity-80">*Admin bao trọn gói!</p>
                </div>
            </div>
        </div>

        {/* --- 2. NÚT TOGGLE (TAM GIÁC NHỎ) --- */}
        {/* Nút này luôn nằm đè lên layer, dính vào mép trái của vùng nội dung */}
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`
                absolute top-6 z-30 flex items-center justify-center w-8 h-12 
                bg-white dark:bg-slate-800 border-y border-r border-slate-200 dark:border-slate-700 
                shadow-md hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400
                rounded-r-xl transition-all duration-300 cursor-pointer
                ${isSidebarOpen ? 'left-72' : 'left-0'}
            `}
            title={isSidebarOpen ? "Thu gọn danh mục" : "Mở danh mục"}
        >
            {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>


        {/* --- 3. KHU VỰC HIỂN THỊ ITEM (TRÀN VIỀN KHI SIDEBAR ĐÓNG) --- */}
        <div className="flex-1 flex flex-col h-full relative overflow-hidden transition-all duration-300">
            
            {/* Header Lọc & Tìm kiếm */}
            <div className="h-20 px-8 flex items-center justify-between bg-white/50 dark:bg-slate-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 transition-all">
                {/* Khi đóng menu thì hiện tiêu đề Mall Store ở đây để user biết đang ở đâu */}
                <div className={`flex items-center gap-4 transition-opacity duration-300 ${!isSidebarOpen ? 'opacity-100 ml-8' : 'opacity-100'}`}>
                    {!isSidebarOpen && <ShoppingBag className="text-blue-600" />}
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Đang xem</h3>
                        <div className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                            {categories.find(c => c.id === activeTab)?.label}
                            <span className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                                {filteredItems.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Thanh tìm kiếm */}
                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 pl-4 pr-1 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all w-64 md:w-80">
                    <Search size={18} className="text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm skin, nhân vật..." 
                        className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 dark:text-white flex-1 placeholder:text-slate-400"
                    />
                    <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-blue-500 transition-colors">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            {/* Grid Items */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-[#0f172a]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-current"></div>
                        <p className="font-medium text-sm">Đang vận chuyển hàng về kho...</p>
                    </div>
                ) : (
                    <div className={`grid gap-6 pb-20 transition-all duration-300
                        ${isSidebarOpen 
                            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' // Grid khi CÓ menu
                            : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7' // Grid khi KHÔNG CÓ menu (Rộng hơn)
                        }
                    `}>
                        {filteredItems.map((item) => (
                            <div key={item.id} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative overflow-hidden cursor-pointer">
                                
                                {/* Badge FREE */}
                                <div className="absolute top-0 right-0 bg-gradient-to-bl from-emerald-500 to-green-600 text-white text-[9px] font-black px-2.5 py-1 rounded-bl-xl shadow-lg z-10 uppercase tracking-wider">
                                    Free
                                </div>

                                {/* Hình ảnh Item */}
                                <div className="aspect-square bg-slate-100 dark:bg-slate-700/30 m-2 rounded-xl flex items-center justify-center overflow-hidden relative group-hover:bg-blue-50 dark:group-hover:bg-slate-700/50 transition-colors">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.name} className="w-2/3 h-2/3 object-contain drop-shadow-md group-hover:scale-115 group-hover:rotate-3 transition-all duration-500" />
                                    ) : (
                                        <div className="text-slate-300"><Sparkles size={32} /></div>
                                    )}
                                    
                                    {/* Nút xem nhanh khi hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                        <button 
                                            onClick={() => handleBuy(item)}
                                            className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                                        >
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Thông tin */}
                                <div className="px-3 pb-3 flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-800 dark:text-white truncate text-sm mb-1" title={item.name}>
                                        {item.name}
                                    </h3>
                                    
                                    {/* Nút Mua & Giá */}
                                    <div className="mt-auto flex items-end justify-between">
                                        <div className="flex flex-col leading-none">
                                            <span className="text-[10px] text-slate-400 line-through decoration-slate-400/50">{item.price}$</span>
                                            <span className="text-base font-black text-emerald-500 flex items-center gap-0.5">
                                                0 <Zap size={12} fill="currentColor" />
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleBuy(item)}
                                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all active:scale-90"
                                            title="Mua nhanh"
                                        >
                                            <ShoppingBag size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ShopPage;