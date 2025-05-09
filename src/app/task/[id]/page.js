'use client'

import { useRouter } from 'next/navigation';
import {useEffect,useState} from 'react'

export default function TaskDetail({params}){

    const router = useRouter();

    const[title,setTitle] = useState('')
    const [description, setDescription] = useState('');
    const[id] = params;

    const handleSave = () => {
        // 1. 從 localStorage 取得原本的任務資料（若沒有則為空陣列）
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        // 2. 更新對應 ID 的任務內容
        const updatedTasks = savedTasks.map((task) =>
            task.id === Number(id) ? { ...task, title, description } : task
        );
    
        // 3. 將更新後的資料存回 localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
        // 4. 使用 router 導回首頁
        router.push('/');
    };
    

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = savedTasks.find((t) => t.id === Number(id));
        if(task){
            setTitle(task.title);
            setDescription(task.description);
        }
    },[]);

    return(
        <main className="p-4 max-w-x1 mx-auto">
            <h1 className='text-2x1 font-bold mb-4'>
                Task Details
            </h1>
            <input
                className="border p-2 w-full mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                plaveholder="Title"
            />
            <textarea
                className="border p-2 w-full mb-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                plaveholder = "Description"
                rows={4}
            />
            <button
                className="bg-green-500 text-white px-4 py-2"
                onClick={handleSave}
            >
                Save
            </button>
        </main>
    )
}