# 大學活動總覽系統

一個使用 Next.js 和 React 建構的大學活動展示平台

## 🚀 快速開始

### 1. 安裝依賴項
```bash
npm install
```

### 2. 環境設定
創建 `.env.local` 檔案：
```env
NEXT_PUBLIC_API_URL=你的API SERVER提供的IP
```

### 3. 啟動開發服務器
```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看應用程式。

## 📋 功能特色

- 🔍 搜尋活動名稱或描述
- 🏫 按學校篩選活動
- 📂 按活動類型分類
- 📄 分頁顯示

## ⚙️ API 需求

需要 FastAPI 後端運行在 `http://localhost:8000`，提供以下端點：

- `GET /api/events/` - 取得所有活動資料

資料格式：
```json
[
  {
    "ID": 1,
    "Title": "活動標題",
    "Title_Simplified": "簡化標題", 
    "School": "學校名稱",
    "Type": "活動類型",
    "Location": "活動地點",
    "Info": "活動描述",
    "Post_Date": "2025-06-22",
    "Link": "https://example.com/activity/1"
  }
]
```

## 🛠️ 開發指令

```bash
npm run dev    # 開發模式
npm run build  # 建構生產版本
npm run start  # 啟動生產服務器
```

## 🔧 技術架構

- **Next.js 15** - React 框架
- **React 19** - 前端函式庫
- **Tailwind CSS v4** - 樣式框架
- **Turbopack** - 快速建構工具
