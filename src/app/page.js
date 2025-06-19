'use client'

import { useState, useEffect, useMemo } from 'react'

// ActivityCard 元件
function ActivityCard({ activity }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {activity.Title_Simplified}
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {activity.School}
        </span>
      </div>
      
      {activity.Type && (
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {activity.Type}
          </span>
        </div>
      )}
      
      {activity.Location && (
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">地點:</span> {activity.Location}
        </p>
      )}
      
      {activity.Info && (
        <p className="text-sm text-gray-600 mb-3">
          {activity.Info}
        </p>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {new Date(activity.Post_Date).toLocaleDateString('zh-TW')}
        </span>
        {activity.Link && (
          <a 
            href={activity.Link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            查看詳情 →
          </a>
        )}
      </div>
    </div>
  )
}

// Pagination 元件
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        上一頁
      </button>
      
      <span className="px-4 py-2 text-sm text-gray-700">
        第 {currentPage} 頁，共 {totalPages} 頁
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        下一頁
      </button>
    </div>
  )
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          大學活動總覽
        </h1>

        {/* 搜尋和篩選區域 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                搜尋活動
              </label>
              <input
                type="text"
                placeholder="搜尋活動名稱或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                選擇學校
              </label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">所有學校</option>
                {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                活動類型
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">所有類型</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            共找到 {filteredActivities.length} 個活動
          </div>
        </div>

        {/* 活動列表 */}
        {paginatedActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">沒有找到符合條件的活動</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  )
}