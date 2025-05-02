// 任務列表元件：接收任務陣列作為參數
export default function TaskList({tasks}){
    return (
        // 使用 space-y-2 類別來設置列表項目之間的間距
        <ul className="space-y-2">
            {/* 使用 map 遍歷任務陣列，將每個任務轉換為列表項目 */}
            {tasks.map((task,index)=>(
                <li
                    key = {index} // 使用索引作為 key 值以識別每個項目
                    className="boredr p-2 rounded" // 設置邊框和圓角樣式
                >
                    {task} {/* 顯示任務內容 */}
                </li>
            ))}
        </ul>
    )
}