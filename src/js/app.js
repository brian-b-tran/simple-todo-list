console.log("script is running..");
import "../css/app.css";
import createList from "./list.js";

const board = (name) => {
  let boardName = name;
  let boardLists = [];

  const addList = (listName) => {
    boardLists.push(createList(listName));
  };

  return { addList, boardLists, boardName };
};

const project1 = board("Project 1");
project1.addList("list1");
project1.boardLists[0].addTask("task1", "first task");
project1.boardLists[0].addTask("task2", "second task", "some date");
project1.boardLists[0].addTask("task3", "third task", "some date");
console.log(project1.boardLists[0].getName());
