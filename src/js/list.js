import createTask from "./task.js";

const createList = (id, name) => {
  let listName = name ? name : id !== 0 ? `New List (${id + 1})` : `New List`;
  let listId = id;
  let taskList = [];
  let tasklistIndex = 0;
  const addTask = (name, description, dateToComplete) => {
    taskList.push(createTask(tasklistIndex, name, description, dateToComplete));
    tasklistIndex++;
  };

  const removeTask = (id) => {
    taskList = taskList.filter((task) => {
      console.log(
        `removing task: ${taskList.findIndex((task) => {
          task.getID();
        })}`
      );
      task.getID() !== id;
    });
  };
  const getID = () => listId;
  const getName = () => listName;
  const getTaskList = () => taskList;
  const isEmpty = () => taskList.length === 0;
  const getNewestTask = () => taskList[tasklistIndex - 1];
  const updateName = (newName) => {
    listName = newName;
  };
  return {
    getID,
    addTask,
    removeTask,
    getName,
    getTaskList,
    isEmpty,
    getNewestTask,
    updateName,
  };
};

export default createList;
