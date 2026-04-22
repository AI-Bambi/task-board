import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const addTask = () => {
    const text = input.trim()
    if (!text) return
    setTasks([...tasks, { id: Date.now(), text, done: false }])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="container">
      <h1 className="title">タスクボード</h1>

      <div className="input-row">
        <input
          className="task-input"
          type="text"
          placeholder="新しいタスクを入力..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addTask}>追加</button>
      </div>

      <div className="summary">
        {tasks.length === 0
          ? 'タスクがありません'
          : `${tasks.filter(t => t.done).length} / ${tasks.length} 完了`}
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
            <input
              type="checkbox"
              className="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label="削除"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
