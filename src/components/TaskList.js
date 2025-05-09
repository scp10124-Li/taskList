'use client'
import Link from "next/link";

// 任務列表元件：接收任務陣列作為參數
export default function TaskList({tasks,onDelete}){
    return (
        // 使用 space-y-2 類別來設置列表項目之間的間距
        <ul className="space-y-2">
            {/* 使用 map 遍歷任務陣列，將每個任務轉換為列表項目 */}
            {tasks.map((task)=>(
                <li
                    key = {task.id} // 使用索引作為 key 值以識別每個項目
                    className="border p-2 rounded flex justify-between items-center" // 設置邊框和圓角樣式
                >

                    <Link 
                        href={`/task/${task.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        {task.title || 'Untitled Task'}
                    </Link>
                    <button 
                        className="text-white border border-red-500 rounded-full bg-red-500 px-4 py-1"
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}