import task from "task.js";

export const list = (name) => {
  listName = name;
  taskList = [];

  const addTask = (id, name, description, dateToComplete) => {
    taskList.push(task(id, name, description, dateToComplete));
  };

  const removeTask = (id) => {
    taskList = taskList.filter((task) => {
      task.getId() !== id;
    });
  };
  const getTaskList = () => taskList;
  const isEmpty = () => taskList.length === 0;

  return { addTask, removeTask, getTaskList, isEmpty };
};
