const createTask = (id, name, description = "", dateToComplete = "") => {
  const taskId = id;
  let taskName = name || "New Task";
  let taskDescription = description;
  let taskDateToComplete = dateToComplete;
  let taskComplete = false;

  const getID = () => taskId;
  const getName = () => taskName;
  const getDescription = () => taskDescription;
  const getDateToComplete = () => taskDateToComplete;
  const setName = (name) => {
    name != "" ? (taskName = name) : (taskName = name);
  };
  const setDescription = (description) => {
    taskDescription = description;
  };
  const setDateToComplete = (dateToComplete) => {
    taskDateToComplete = dateToComplete;
  };
  const toggleComplete = () => {
    taskComplete = !taskComplete;
  };
  const updateName = (newName) => {
    taskName = newName;
  };
  return {
    getID,
    getName,
    getDateToComplete,
    getDescription,
    setName,
    setDescription,
    setDateToComplete,
    toggleComplete,
  };
};

export default createTask;
