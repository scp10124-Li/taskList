'use client'

import { useState, useEffect, useMemo } from 'react'
import '../styles/button.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// const mockActivities = [
//   {
//     ID: 1,
//     Title: '校園音樂會',
//     Title_Simplified: '校園音樂會',
//     School: '雲林科技大學',
//     Type: '音樂',
//     Location: '操場',
//     Info: '全校師生歡迎參加的音樂會',
//     Post_Date: '2025-06-21',
//     Link: 'https://example.com/activity/1',
//   },
//   {
//     ID: 2,
//     Title: '就業博覽會',
//     Title_Simplified: '就業博覽會',
//     School: '台灣大學',
//     Type: '就業',
//     Location: '體育館',
//     Info: '眾多企業參加的就業活動',
//     Post_Date: '2025-06-22',
//     Link: 'https://example.com/activity/2',
//   },
//   {
//     ID: 3,
//     Title: '校園馬拉松',
//     Title_Simplified: '校園馬拉松',
//     School: '成功大學',
//     Type: '運動',
//     Location: '校園各地',
//     Info: '全校性馬拉松比賽',
//     Post_Date: '2025-06-23',
//     Link: 'https://example.com/activity/3',
//   },
//   {
//     ID: 4,
//     Title: '程式設計競賽',
//     Title_Simplified: '程式設計競賽',
//     School: '台北科技大學',
//     Type: '競賽',
//     Location: '資訊館',
//     Info: '跨校程式設計比賽',
//     Post_Date: '2025-06-24',
//     Link: 'https://example.com/activity/4',
//   },
//   {
//     ID: 5,
//     Title: '藝術展覽',
//     Title_Simplified: '藝術展覽',
//     School: '高雄大學',
//     Type: '展覽',
//     Location: '藝術中心',
//     Info: '當代藝術家聯展',
//     Post_Date: '2025-06-25',
//     Link: 'https://example.com/activity/5',
//   },
//   {
//     ID: 6,
//     Title: '校園歌唱比賽',
//     Title_Simplified: '校園歌唱比賽',
//     School: '淡江大學',
//     Type: '比賽',
//     Location: '大禮堂',
//     Info: '展現歌喉的舞台',
//     Post_Date: '2025-06-26',
//     Link: 'https://example.com/activity/6',
//   },
//   {
//     ID: 7,
//     Title: '日文會話工作坊',
//     Title_Simplified: '日文會話工作坊',
//     School: '中山大學',
//     Type: '語言',
//     Location: '外語系館',
//     Info: '免費日文會話練習課程',
//     Post_Date: '2025-06-27',
//     Link: 'https://example.com/activity/7',
//   },
//   {
//     ID: 8,
//     Title: '職涯講座',
//     Title_Simplified: '職涯講座',
//     School: '中央大學',
//     Type: '講座',
//     Location: '商學院演講廳',
//     Info: '邀請企業高管分享職涯經驗',
//     Post_Date: '2025-06-28',
//     Link: 'https://example.com/activity/8',
//   },
//   {
//     ID: 9,
//     Title: '校園市集',
//     Title_Simplified: '校園市集',
//     School: '中正大學',
//     Type: '市集',
//     Location: '校園中庭',
//     Info: '各式美食與手作商品',
//     Post_Date: '2025-06-29',
//     Link: 'https://example.com/activity/9',
//   },
//   {
//     ID: 10,
//     Title: '校友返校日',
//     Title_Simplified: '校友返校日',
//     School: '交通大學',
//     Type: '校慶',
//     Location: '校友會館',
//     Info: '與畢業校友的交流活動',
//     Post_Date: '2025-06-30',
//     Link: 'https://example.com/activity/10',
//   },
//   {
//     ID: 11,
//     Title: '羽球錦標賽',
//     Title_Simplified: '羽球錦標賽',
//     School: '清華大學',
//     Type: '運動',
//     Location: '體育館',
//     Info: '校內羽球競技賽事',
//     Post_Date: '2025-07-01',
//     Link: 'https://example.com/activity/11',
//   },
//   {
//     ID: 12,
//     Title: '校園電影夜',
//     Title_Simplified: '校園電影夜',
//     School: '政治大學',
//     Type: '電影',
//     Location: '草地廣場',
//     Info: '戶外放映經典電影',
//     Post_Date: '2025-07-02',
//     Link: 'https://example.com/activity/12',
//   },
//   {
//     ID: 13,
//     Title: '創業交流會',
//     Title_Simplified: '創業交流會',
//     School: '東華大學',
//     Type: '交流',
//     Location: '創客空間',
//     Info: '分享創業經驗與合作機會',
//     Post_Date: '2025-07-03',
//     Link: 'https://example.com/activity/13',
//   },
//   {
//     ID: 14,
//     Title: '書法比賽',
//     Title_Simplified: '書法比賽',
//     School: '中興大學',
//     Type: '比賽',
//     Location: '文學院大廳',
//     Info: '校內書法愛好者競賽',
//     Post_Date: '2025-07-04',
//     Link: 'https://example.com/activity/14',
//   },
//   {
//     ID: 15,
//     Title: '程式馬拉松',
//     Title_Simplified: '程式馬拉松',
//     School: '台灣科技大學',
//     Type: '競賽',
//     Location: '資工館',
//     Info: '24 小時無間斷的程式挑戰',
//     Post_Date: '2025-07-05',
//     Link: 'https://example.com/activity/15',
//   },
//   {
//     ID: 16,
//     Title: '烘焙工作坊',
//     Title_Simplified: '烘焙工作坊',
//     School: '輔仁大學',
//     Type: '課程',
//     Location: '家政教室',
//     Info: '學習各式甜點製作',
//     Post_Date: '2025-07-06',
//     Link: 'https://example.com/activity/16',
//   },
//   {
//     ID: 17,
//     Title: '校園園遊會',
//     Title_Simplified: '校園園遊會',
//     School: '逢甲大學',
//     Type: '市集',
//     Location: '操場',
//     Info: '多元攤位與舞台表演',
//     Post_Date: '2025-07-07',
//     Link: 'https://example.com/activity/17',
//   },
//   {
//     ID: 18,
//     Title: '手作皮革體驗',
//     Title_Simplified: '手作皮革體驗',
//     School: '中原大學',
//     Type: '工作坊',
//     Location: '工藝教室',
//     Info: '親手製作專屬皮件',
//     Post_Date: '2025-07-08',
//     Link: 'https://example.com/activity/18',
//   },
//   {
//     ID: 19,
//     Title: '志工服務日',
//     Title_Simplified: '志工服務日',
//     School: '亞洲大學',
//     Type: '志工',
//     Location: '社區中心',
//     Info: '校園志工服務社區活動',
//     Post_Date: '2025-07-09',
//     Link: 'https://example.com/activity/19',
//   },
//   {
//     ID: 20,
//     Title: '校園攝影展',
//     Title_Simplified: '校園攝影展',
//     School: '台南大學',
//     Type: '展覽',
//     Location: '圖書館一樓',
//     Info: '學生攝影作品展示',
//     Post_Date: '2025-07-10',
//     Link: 'https://example.com/activity/20',
//   },
// ]

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
        const response = await fetch(`${API_URL}/api/events/`)
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

  // useEffect(() => {
  //     setActivities(mockActivities)
  // }, [])

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