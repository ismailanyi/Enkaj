"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

type Task = {
  id: number
  title: string
  completed: boolean
}

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Schedule property viewing", completed: false },
    { id: 2, title: "Follow up on maintenance request", completed: true },
    { id: 3, title: "Prepare monthly financial report", completed: false },
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Task Manager</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Add Task</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center space-x-2">
                <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`flex-grow ${task.completed ? "line-through text-gray-500" : ""}`}
                >
                  {task.title}
                </label>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

