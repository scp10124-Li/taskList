'use client'

import { useState, useEffect, useMemo } from 'react'
import '../styles/button.css'

// ActivityCard 元件
function ActivityCard({ activity }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden ring-2 ring-cyan-400/30 transform transition-transform duration-500 hover:scale-105 hover:shadow-cyan-500/40">
      <div className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 p-5 flex justify-between items-center">
        <h3 className="text-2xl font-extrabold text-white tracking-wide leading-tight line-clamp-2 drop-shadow-lg">
          {activity.Title_Simplified}
        </h3>
        <span className="text-sm text-teal-100 mt-2 margin-auto-item tracking-wider ">
          {activity.School}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {activity.Type && (
          <div>
            <span className="inline-block bg-teal-400/30 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full ring-1 ring-teal-300/30 shadow-sm tracking-wide">
              {activity.Type}
            </span>
          </div>
        )}

        {activity.Location && (
          <p className="text-sm text-slate-200 tracking-normal">
            <span className="font-semibold text-white">地點:</span> {activity.Location}
          </p>
        )}

        {activity.Info && (
          <p className="text-sm text-slate-300 line-clamp-3 tracking-normal leading-relaxed">
            {activity.Info}
          </p>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-slate-700">
          <span className="text-xs text-slate-400 tracking-widest">
            {new Date(activity.Post_Date).toLocaleDateString('zh-TW')}
          </span>
          {activity.Link && (
            <a
              href={activity.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 hover:text-teal-200 text-sm font-semibold transition-colors underline underline-offset-4 tracking-wide"
            >
              查看詳情 →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-6 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 bg-slate-700/50 text-slate-200 rounded-full transition-all hover:bg-slate-600/70 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 text-lg font-bold"
        aria-label="上一頁"
      >
        ◀
      </button>

      <span className="px-4 py-2 text-base text-slate-300 font-semibold tracking-wide">
        第 {currentPage} 頁 / 共 {totalPages} 頁
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 bg-slate-700/50 text-slate-200 rounded-full transition-all hover:bg-slate-600/70 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 text-lg font-bold"
        aria-label="下一頁"
      >
        ▶
      </button>
    </div>
  );
}

export default function Home() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  
  // 載入活動資料
  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8000/api/events/')
        if (!response.ok) {
          throw new Error('無法載入活動資料')
        }
        const data = await response.json()
        setActivities(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  // 取得所有學校清單
  const schools = useMemo(() => {
    const uniqueSchools = [...new Set(activities.map(activity => activity.School))]
    return uniqueSchools.sort()
  }, [activities])

  // 取得所有類型清單
  const types = useMemo(() => {
    const uniqueTypes = [...new Set(activities.map(activity => activity.Type).filter(Boolean))]
    return uniqueTypes.sort()
  }, [activities])

  // 篩選活動
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = activity.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.Title_Simplified.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (activity.Info && activity.Info.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesSchool = selectedSchool === '' || activity.School === selectedSchool
      const matchesType = selectedType === '' || activity.Type === selectedType
      
      return matchesSearch && matchesSchool && matchesType
    })
  }, [activities, searchTerm, selectedSchool, selectedType])


 // 分頁計算
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage)

// 重置分頁當篩選條件改變時
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedSchool, selectedType])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入活動資料中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">錯誤: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            重新載入
          </button>
        </div>
      </div>
    )
  }

  

  return (
    <div className="min-h-screen text-slate-100 futuristic-bg">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-10 text-center tracking-wide">
          大學活動總覽
        </h1>

        {/* 搜尋和篩選區域 */}
        <div className="bg-gradient-to-br from-slate-900/60 via-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-10 ring-1 ring-cyan-400/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2 tracking-widest">
                🔍 搜尋活動
              </label>
              <input
                type="text"
                placeholder="輸入活動名稱或描述..."
                className="w-full px-4 py-2 border border-cyan-500/30 bg-slate-900/70 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition shadow-inner hover:shadow-cyan-500/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2 tracking-widest">
                🏫 選擇學校
              </label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full px-4 py-2 border border-cyan-500/30 bg-slate-900/70 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition shadow-inner hover:shadow-cyan-500/30"
              >
                <option value="">所有學校</option>
                {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2 tracking-widest">
                📂 活動類型
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-cyan-500/30 bg-slate-900/70 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition shadow-inner hover:shadow-cyan-500/30"
              >
                <option value="">所有類型</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-400">
            共找到 <span className="font-bold text-cyan-400">{filteredActivities.length}</span> 個活動
          </div>
        </div>

        {/* 活動列表 */}
        {paginatedActivities.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-lg">
            <p className="text-gray-600 text-xl">😥 沒有找到符合條件的活動</p>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-8 px-4 lg:px-12">
              {paginatedActivities.map((activity) => (
                <ActivityCard key={activity.ID} activity={activity} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
    // --- 主要修改區域 END ---
  )
}