const createTask = (id, name, description = "", dateToComplete = "") => {
  const taskId = id;
  let taskName = name;
  let taskDescription = description;
  let taskDateToComplete = dateToComplete;
  let taskComplete = false;

  const getId = () => taskId;
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
  return {
    getId,
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
