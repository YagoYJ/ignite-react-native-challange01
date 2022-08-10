import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { EditTaskProps, Task } from "./TasksList";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskProps) => void;
}

export function TaskItem({
  index,
  task,
  editTask,
  removeTask,
  toggleTaskDone,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleUpdated, setTitleUpdated] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTitleUpdated(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    if (!titleUpdated) {
      setTitleUpdated(task.title);
      setIsEditing(false);
    } else {
      editTask({ taskId: task.id, taskNewTitle: titleUpdated });
      setIsEditing(false);
    }
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            //TODO - use style prop
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={titleUpdated}
            onChangeText={setTitleUpdated}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity onPress={handleCancelEditing}>
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>

            <View style={styles.iconsDivider} />

            <TouchableOpacity onPress={handleSubmitEditing}>
              <Icon name="check" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleStartEditing}>
              <Image source={editIcon} />
            </TouchableOpacity>

            <View style={styles.iconsDivider} />

            <TouchableOpacity
              disabled={isEditing}
              onPress={() => removeTask(task.id)}
            >
              <Image
                source={trashIcon}
                style={{ opacity: isEditing ? 0.2 : 1 }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  taskButton: {
    flex: 1,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsDivider: {
    height: 24,
    width: 1,
    backgroundColor: "#C4C4C4",
    opacity: 0.24,
    marginHorizontal: 12,
  },
});
