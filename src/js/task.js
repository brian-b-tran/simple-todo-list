import { createElement, appendInOrder } from "./helpers/helpers.js";
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

const renderListItem = (task) => {
  const listItemContent = createElement("div", { class: "list-item-content" });
  const contentCheckBox = createElement("div", { class: "content-check-box" });
  const contentText = createElement("div", { class: "content-text" });
  contentText.textContent = task.getName();
  const contentDescription = createElement("div", {
    class: "content-description",
  });
  contentDescription.textContent = task.getDescription();
  appendInOrder(contentText, contentDescription);
  const contentMenu = createElement("div", { class: "content-menu" });
  const dot = createElement("div", { class: "dot" });

  appendInOrder(contentMenu, dot, dot.cloneNode(true), dot.cloneNode(true));
  appendInOrder(listItemContent, contentCheckBox, contentText, contentMenu);
  const listItem = createElement("div", { class: "list-item" });
  return appendInOrder(listItem, listItemContent);
};
export default { createTask, renderListItem };
