import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyAdded = tasks.find((task) => task.title === newTaskTitle);

    if (taskAlreadyAdded)
      return Alert.alert("Aviso!", "Você já adicionou essa task");

    setTasks((oldTasks) => [
      ...oldTasks,
      {
        id: new Date().getTime(),
        done: false,
        title: newTaskTitle,
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const currentTask = tasks.find((task) => task.id === id);

    if (!currentTask) return;

    currentTask.done = !currentTask.done;

    const newTasksArray = tasks.map((task) => {
      if (task.id === id) {
        return currentTask;
      } else {
        return task;
      }
    });

    setTasks(newTasksArray);
  }

  function handleRemoveTask(id: number) {
    const newTasksArray = tasks.filter((task) => task.id !== id);

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
