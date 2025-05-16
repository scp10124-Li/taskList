'use client';

import { useState, useEffect } from "react";

export default function TodosPage() {
  const [todos, setTodos] = useState([]); // 儲存待辦清單
  const [newTodo, setNewTodo] = useState(''); // 新增任務輸入
  const [loading, setLoading] = useState(true); // 載入狀態

  // 從 API 載入資料
  useEffect(() => {
    async function fetchTodos() {
      setLoading(true); // 開始載入
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');    
        if (!res.ok) throw new Error('Failed to fetch');

        // 模擬 3 秒延遲
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false); // 結束載入
      }
    }

    fetchTodos();
  }, []);

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="border p-2 rounded">
              <h2 className="font-semibold">
                {todo.title} {todo.completed ? '(Done)' : ''}
              </h2>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
