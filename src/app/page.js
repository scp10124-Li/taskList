'use client'; // 這一定要是檔案最頂端，前面不能有註解！

import { useState, useMemo } from "react";
// 已移除 'lucide-react' 的 import

// --- 豐富化的假資料 ---
const allActivities = [
  { id: 1, title: "校園歌唱比賽", school: "臺灣大學", subject: "不分科系", type: "國立", date: "2025-10-20", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "程式設計馬拉松", school: "成功大學", subject: "資工", type: "國立", date: "2025-11-05", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, title: "AI 趨勢講座", school: "清華大學", subject: "電機", type: "國立", date: "2025-09-15", image: "https://images.unsplash.com/photo-1620712943543-2858200f745a?q=80&w=2069&auto=format&fit=crop" },
  { id: 4, title: "系學會迎新茶會", school: "交通大學", subject: "資工", type: "國立", date: "2025-09-10", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, title: "創業經驗分享", school: "政治大學", subject: "商管", type: "國立", date: "2025-11-22", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop" },
  { id: 6, title: "設計思考工作坊", school: "臺灣科技大學", subject: "設計", type: "國立", date: "2025-10-30", image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop" },
  { id: 7, title: "金融科技論壇", school: "輔仁大學", subject: "金融", type: "私立", date: "2025-12-01", image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2089&auto=format&fit=crop" },
  { id: 8, title: "文學之夜", school: "東吳大學", subject: "文史", type: "私立", date: "2025-11-18", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop" },
];
const ITEMS_PER_PAGE = 6;

function ActivityCard({ activity }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <img src={activity.image} alt={activity.title} className="w-full h-40 object-cover" />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
          {activity.type}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span role="img" aria-label="tag">🏷️</span>
          <p className="text-sm font-semibold text-indigo-600">{activity.subject}</p>
        </div>
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{activity.title}</h3>
        <div className="mt-3 space-y-2 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span role="img" aria-label="school">🏫</span>
            <span>{activity.school}</span>
          </div>
          <div className="flex items-center gap-2">
            <span role="img" aria-label="calendar">📅</span>
            <span>{activity.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <nav className="flex justify-center items-center gap-2 mt-8">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded-md bg-white text-gray-700 disabled:opacity-50 hover:bg-indigo-50">&lt;</button>
            {pageNumbers.map(number => (
                <button key={number} onClick={() => onPageChange(number)} className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-indigo-600 text-white font-bold' : 'bg-white text-gray-700 hover:bg-indigo-50'}`}>{number}</button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md bg-white text-gray-700 disabled:opacity-50 hover:bg-indigo-50">&gt;</button>
        </nav>
    );
}

export default function ActivityBoard() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ school: "", subject: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredActivities = useMemo(() => allActivities.filter(activity => activity.title.toLowerCase().includes(search.toLowerCase())).filter(activity => filters.school ? activity.school === filters.school : true).filter(activity => filters.subject ? activity.subject === filters.subject : true).filter(activity => filters.type ? activity.type === filters.type : true), [search, filters]);
  const paginatedActivities = useMemo(() => { const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; return filteredActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE); }, [filteredActivities, currentPage]);
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);

  const handleFilterChange = (e) => { const { name, value } = e.target; setFilters(prev => ({ ...prev, [name]: value })); setCurrentPage(1); };
  const clearFilters = () => { setSearch(""); setFilters({ school: "", subject: "", type: "" }); setCurrentPage(1); };

  const schoolOptions = useMemo(() => [...new Set(allActivities.map(a => a.school))], []);
  const subjectOptions = useMemo(() => [...new Set(allActivities.map(a => a.subject))], []);

  return (
    <main className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-gray-800">活動總覽</h1>
          <div className="relative w-full md:w-auto">
            <input className="border-2 border-gray-200 p-2 pl-10 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="搜尋活動標題..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">篩選條件</h2>
              <div className="flex flex-col gap-4">
                <select name="school" value={filters.school} onChange={handleFilterChange} className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"><option value="">所有學校</option>{schoolOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                <select name="subject" value={filters.subject} onChange={handleFilterChange} className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"><option value="">所有科系</option>{subjectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"><option value="">公/私立</option><option value="國立">國立</option><option value="私立">私立</option></select>
                <button onClick={clearFilters} className="mt-2 w-full text-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">清除篩選</button>
              </div>
            </div>
          </aside>
          <div className="w-full lg:w-3/4">
            {paginatedActivities.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{paginatedActivities.map((activity) => (<ActivityCard key={activity.id} activity={activity} />))}</div>) : (<div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm"><h3 className="text-2xl font-semibold text-gray-700">噢喔！</h3><p className="mt-2 text-gray-500">找不到符合條件的活動，試試看其他篩選條件吧！</p></div>)}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </main>
  );
}