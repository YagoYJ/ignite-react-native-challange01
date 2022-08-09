import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks((oldTasks) => [
      ...oldTasks,
      {
        id: Math.random() * 10,
        done: false,
        title: newTaskTitle,
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasksArray = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      } else {
        return task;
      }
    });

    setTasks(newTasksArray);
  }

  function handleRemoveTask(id: number) {
    let newTasksArray: Task[] = [];

    tasks.map((task) => {
      if (task.id !== id) {
        newTasksArray.push(task);
      }
    });

    setTasks(newTasksArray);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
