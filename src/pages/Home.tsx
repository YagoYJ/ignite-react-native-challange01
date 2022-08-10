import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { EditTaskProps, Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyAdded = tasks.find((task) => task.title === newTaskTitle);

    if (taskAlreadyAdded)
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

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
    Alert.alert("Remover item", "Tem certeza que deseja remover esse item?", [
      {
        text: "Não",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Sim",
        onPress: () => {
          const newTasksArray = tasks.filter((task) => task.id !== id);

          setTasks(newTasksArray);
        },
      },
    ]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {
    const currentTask = tasks.find((task) => task.id === taskId);

    if (!currentTask) return;

    currentTask.title = taskNewTitle;

    const newTasksArray = tasks.map((task) => {
      if (task.id === taskId) {
        return currentTask;
      } else {
        return task;
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
        editTask={handleEditTask}
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
