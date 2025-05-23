'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import TaskList from "@/components/TaskList";

// 主要元件：待辦事項應用程式
export default function Home() {

  // 狀態管理：使用 useState 鉤子
  const[tasks,setTasks] = useState([]); // 儲存所有待辦事項的陣列
  const[newTask,setNewTask]= useState(''); // 儲存新任務的輸入值
  
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max,task) => Math.max(max,task.id),0);
    setNextId(maxId + 1);
  },[]);

  // 新增任務的功能
  const addTask = () =>{

    console.log("Before:" + tasks);
    console.log("newTask:" , newTask);

    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: '',
    };

    // 使用展開運算符創建新陣列，保持狀態不可變性
    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks); // 更新任務列表
    console.log("After:" , updatedTasks);
    setNewTask(''); // 清空輸入框

    setNewId(nextId + 1);
    localStorage.setItem('tasks',JSON.stringify(updatedTasks));
  };


  const handleDelete = (index) =>{
    const newTasks = tasks.filter((_,i) => i !==index);
    setTasks(newTasks);
    localStorage.setItem('tasks',JSON.stringify(newTasks))
  }

  // 渲染用戶界面
  return (
    <main className="p-4 max-w-md mx-auto">

      {/* 標題區塊 */}
      <h1 className="text-2xl font-bold">Task Board</h1>

      {/* 輸入區域：包含輸入框和新增按鈕 */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) =>setNewTask(e.target.value)} // 監聽輸入變化並更新狀態
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-full"
          onClick={addTask} // 點擊時觸發新增任務功能
        >
          add
        </button>
      </div>

      <TaskList tasks={tasks} onDelete={handleDelete}/>
    </main>
  );
}
