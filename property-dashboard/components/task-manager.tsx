"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  type: "general" | "repair" | "renovation";
  status: "new" | "in-progress" | "completed";
};

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Schedule property viewing",
      completed: false,
      type: "general",
      status: "new",
    },
    {
      id: 2,
      title: "Follow up on maintenance request",
      completed: true,
      type: "repair",
      status: "completed",
    },
    {
      id: 3,
      title: "Prepare monthly financial report",
      completed: false,
      type: "general",
      status: "in-progress",
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newTaskType, setNewTaskType] = useState<
    "general" | "repair" | "renovation"
  >("general");

  useEffect(() => {
    // Here you would typically fetch tasks from your backend
    // This could include tasks created from messages
    // For example: fetchTasks().then(setTasks)
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false,
          type: newTaskType,
          status: "new",
        },
      ]);
      setNewTask("");
      setNewTaskType("general");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskStatus = (
    id: number,
    status: "new" | "in-progress" | "completed"
  ) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="space-y-4">
            <Select
              value={newTaskType}
              onValueChange={(value: "general" | "repair" | "renovation") =>
                setNewTaskType(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="renovation">Renovation</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Add Task</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`flex-grow ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </label>
                <Select
                  value={task.status}
                  onValueChange={(value: "new" | "in-progress" | "completed") =>
                    updateTaskStatus(task.id, value)
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
