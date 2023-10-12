import createTask from "./task.js";

const createList = (name) => {
  let listName = name;
  let taskList = [];

  const addTask = (id, name, description, dateToComplete) => {
    taskList.push(createTask(id, name, description, dateToComplete));
    console.log(taskList);
  };

  const removeTask = (id) => {
    taskList = taskList.filter((task) => {
      console.log(
        `removing task: ${taskList.findIndex((task) => {
          task.getId();
        })}`
      );
      task.getId() !== id;
    });
  };
  const getName = () => listName;
  const getTaskList = () => taskList;
  const isEmpty = () => taskList.length === 0;

  return { addTask, removeTask, getName, getTaskList, isEmpty };
};

export default createList;
